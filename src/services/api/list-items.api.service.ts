import { logout } from '../auth/auth.service';
import { getCategorizedListItems } from '../list-items/list-items.categorize.service';
import { fetchDataWithConfig } from './api.utils.service';
import { endpoints } from './endpoints.api.service';
import {
  transformListItemToClient,
  transformListItemToServer,
} from './list-items.api.adapter.service';
import {
  AddMovieToListBaseParams,
  AddMovieToListParams,
  DeleteMovieFromListParams,
} from './list-items.api.types.service';

export function addMovieToFavorites(data: AddMovieToListBaseParams) {
  return addMovieToList({ ...data, type: 'favorites' });
}

export function addMovieToWatchList(data: AddMovieToListBaseParams) {
  return addMovieToList({ ...data, type: 'watchlist' });
}

export async function deleteMovieFromList({
  listItemId,
  token,
  userId,
}: DeleteMovieFromListParams) {
  const result = await fetchData(endpoints.deleteMovieFromList({ userId, listItemId }), {
    method: 'DELETE',
    token,
  });
  return result;
}

async function addMovieToList({ movie, type, token, userId }: AddMovieToListParams) {
  const res = await fetchData(endpoints.addMovieToList(userId), {
    token,
    method: 'POST',
    body: JSON.stringify(transformListItemToServer({ movie, type, userId })),
  });
  return res;
}

export async function getMovieListItems({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  const { documents } = await fetchData(endpoints.getMovieListItems(userId), { token });
  return getCategorizedListItems(documents.map(transformListItemToClient));
}

async function fetchData(url: string, config = {}) {
  return fetchDataWithConfig({ url, config, onUnauthorized: logout });
}
