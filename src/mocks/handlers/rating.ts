import { delay, http, HttpResponse } from 'msw';
import * as ratingService from '../data-services/rating.ts';
import { getUser } from './utils.ts';
import {
  CreateRatingRequestBody,
  CreateRatingResponseBody,
  DeleteRatingParams,
  DeleteRatingResponseBody,
  UpdateRatingParams,
  UpdateRatingRequestBody,
  UpdateRatingResponseBody,
} from './types.ts';
import { endpoints } from '../constants.ts';

const DELAY_MS = 1000;

export const rating = [
  http.post<never, CreateRatingRequestBody, CreateRatingResponseBody>(
    `${endpoints.addRating()}`,
    async ({ request }) => {
      const user = await getUser(request);
      const { movie, rating } = await request.json();
      const ratedItem = await ratingService.create({
        ownerId: user.id,
        rating,
        movie,
      });
      await delay(DELAY_MS);
      return HttpResponse.json({ rating: { ...ratedItem, movie } });
    },
  ),

  http.put<UpdateRatingParams, UpdateRatingRequestBody, UpdateRatingResponseBody>(
    `${endpoints.updateRating(':ratedItemId')}`,
    async ({ params, request }) => {
      const user = await getUser(request);
      const { ratedItemId } = params;
      const { updates } = await request.json();
      await ratingService.authorize(user.id, ratedItemId);
      const updatedItem = await ratingService.update(ratedItemId, updates);
      await delay(DELAY_MS);
      return HttpResponse.json({ rating: updatedItem });
    },
  ),

  http.delete<DeleteRatingParams, never, DeleteRatingResponseBody>(
    `${endpoints.deleteRating(':ratedItemId')}`,
    async ({ params, request }) => {
      const user = await getUser(request);
      const { ratedItemId } = params;
      await ratingService.authorize(user.id, ratedItemId);
      await ratingService.remove(ratedItemId);
      await delay(DELAY_MS);
      return HttpResponse.json({ succuss: true });
    },
  ),
];
