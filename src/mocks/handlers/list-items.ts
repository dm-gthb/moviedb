import { delay, http, HttpResponse } from 'msw';
import * as listItemService from '../data-services/list-items.ts';
import {
  CreateListItemRequestBody,
  DeleteListItemResponseBody,
  GetListItemsResponseBody,
  CreateListItemResponseBody,
  DeleteListItemParams,
} from './types.ts';
import { getUser } from './utils.ts';

const DELAY_MS = import.meta.env.MODE === 'test' ? 0 : 1000;
const url = 'https://firestore.googleapis.com/*';

export const listItems = [
  http.get<{ userId: string }, never, GetListItemsResponseBody>(
    url,
    async ({ request }) => {
      const user = await getUser(request);
      const listItems = await listItemService.readByOwner(user.localId);
      await delay(DELAY_MS);
      return HttpResponse.json({ documents: listItems });
    },
  ),
  http.post<never, CreateListItemRequestBody, CreateListItemResponseBody>(
    url,
    async ({ request }) => {
      await getUser(request);
      const reqListItemData = await request.json();
      const listItem = await listItemService.create(reqListItemData);
      await delay(DELAY_MS);
      return HttpResponse.json(listItem);
    },
  ),

  http.delete<DeleteListItemParams, never, DeleteListItemResponseBody>(
    url,
    async ({ request }) => {
      const listItemId = request.url.split('/').at(-1);
      const userId = request.url.split('/').at(-3);
      await listItemService.authorize(userId!, listItemId!);
      await listItemService.remove(listItemId!);
      await delay(DELAY_MS);
      return HttpResponse.json({ succuss: true });
    },
  ),
];
