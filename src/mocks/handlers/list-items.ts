import { delay, http, HttpResponse } from 'msw';
import * as listItemService from '../data-services/list-items.ts';
import * as ratingService from '../data-services/rating.ts';
import {
  CreateListItemRequestBody,
  DeleteListItemResponseBody,
  GetListItemsResponseBody,
  CreateListItemResponseBody,
  DeleteListItemParams,
} from './types.ts';
import { getUser } from './utils.ts';
import { endpoints } from '../../services/endpoints.service.ts';

const DELAY_MS = import.meta.env.MODE === 'test' ? 0 : 1000;

export const listItems = [
  http.get<never, never, GetListItemsResponseBody>(
    `${endpoints.getListItems()}`,
    async ({ request }) => {
      const user = await getUser(request);
      const listItems = await listItemService.readByOwner(user.id);
      const ratedItems = await ratingService.readByOwner(user.id);
      const favorites = [];
      const watchlist = [];

      for (const listItem of listItems) {
        if (listItem.type === 'favorite') {
          favorites.push(listItem);
        } else if (listItem.type === 'watchlist') {
          watchlist.push(listItem);
        }
      }

      await delay(DELAY_MS);
      return HttpResponse.json({ favorites, watchlist, rated: ratedItems });
    },
  ),
  http.post<never, CreateListItemRequestBody, CreateListItemResponseBody>(
    `${endpoints.addFavorite()}`,
    async ({ request }) => {
      const user = await getUser(request);
      const { movie } = await request.json();
      const listItem = await listItemService.create({
        type: 'favorite',
        ownerId: user.id,
        movie,
      });
      await delay(DELAY_MS);
      return HttpResponse.json({ listItem });
    },
  ),

  http.delete<DeleteListItemParams, never, DeleteListItemResponseBody>(
    `${endpoints.deleteFavorite(':listItemId')}`,
    async ({ params, request }) => {
      const user = await getUser(request);
      const { listItemId } = params;
      await listItemService.authorize(user.id, listItemId);
      await listItemService.remove(listItemId);
      await delay(DELAY_MS);
      return HttpResponse.json({ succuss: true });
    },
  ),

  http.post<never, CreateListItemRequestBody, CreateListItemResponseBody>(
    `${endpoints.addToWatchlist()}`,
    async ({ request }) => {
      const user = await getUser(request);
      const { movie } = await request.json();
      const listItem = await listItemService.create({
        type: 'watchlist',
        ownerId: user.id,
        movie,
      });
      await delay(DELAY_MS);
      return HttpResponse.json({ listItem });
    },
  ),

  http.delete<DeleteListItemParams, never, DeleteListItemResponseBody>(
    `${endpoints.deleteFromWatchlist(':listItemId')}`,
    async ({ params, request }) => {
      const user = await getUser(request);
      const { listItemId } = params;
      await listItemService.authorize(user.id, listItemId);
      await listItemService.remove(listItemId);
      await delay(DELAY_MS);
      return HttpResponse.json({ succuss: true });
    },
  ),
];
