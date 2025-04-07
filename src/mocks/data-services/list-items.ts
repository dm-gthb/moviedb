import { FirestoreMovieListItem } from '../types/list-item';
import { StatusError } from '../utils';

const listItemsKey = '__moviedb_list_items__';
let listItems: Record<string, { id: string } & FirestoreMovieListItem> = {};

const storeListItems = () => {
  window.localStorage.setItem(listItemsKey, JSON.stringify(listItems));
};

const load = () => {
  Object.assign(listItems, JSON.parse(window.localStorage.getItem(listItemsKey) ?? ''));
};

try {
  load();
} catch {
  storeListItems();
}

function validateListItem(id: string) {
  load();
  if (!listItems[id]) {
    const error = new StatusError(`No list item with the id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function authorize(userId: string, listItemId: string) {
  const listItem = await read(listItemId);
  if (listItem.fields.ownerId.stringValue !== userId) {
    const error = new StatusError('User is not authorized to view list');
    error.status = 403;
    throw error;
  }
}

export async function create(listItemData: FirestoreMovieListItem) {
  const { type, movieId, ownerId } = listItemData.fields;
  const id = `${type.stringValue}-${movieId.integerValue}-${ownerId.stringValue}`;

  if (listItems[id]) {
    const error = new StatusError(
      `List item with type "${type}" already exists for movie ${movieId}`,
    );
    error.status = 400;
    throw error;
  }
  const currentTime = new Date().toISOString();
  listItems[id] = {
    id,
    ...listItemData,
    name: `listItem/${id}`,
    createTime: currentTime,
    updateTime: currentTime,
  };
  storeListItems();
  return read(id);
}

export async function read(id: string) {
  validateListItem(id);
  return listItems[id];
}

export async function remove(id: string) {
  validateListItem(id);
  delete listItems[id];
  storeListItems();
}

export async function readByOwner(userId: string) {
  return Object.values(listItems).filter(
    (li) => li.fields.ownerId.stringValue === userId,
  );
}

export async function reset() {
  listItems = {};
  storeListItems();
}
