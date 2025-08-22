import { delay, http, HttpResponse, StrictResponse } from 'msw';
import * as personService from '../data-services/person.ts';
import { endpoints } from '../../services/api/endpoints.api.service.ts';
import {
  GetPersonDetailsResponseBody,
  GetPersonMovieCreditsResponseBody,
} from './types.ts';

const DELAY_MS = import.meta.env.MODE === 'test' ? 0 : 1000;

export const person = [
  http.get<{ id: string }>(
    endpoints.getPerson(':id'),
    async ({
      params,
    }): Promise<HttpResponse | StrictResponse<GetPersonDetailsResponseBody>> => {
      const { id } = params;
      const person = await personService.read(+id);
      if (!person) {
        return new HttpResponse(null, { status: 404, statusText: 'person not found' });
      }
      await delay(DELAY_MS);
      return HttpResponse.json(person);
    },
  ),

  http.get<{ id: string }>(
    endpoints.getPersonMovieCredits(':id'),
    async ({
      params,
    }): Promise<HttpResponse | StrictResponse<GetPersonMovieCreditsResponseBody>> => {
      const { id } = params;
      const credits = await personService.readCredits(+id);
      if (!credits) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'person credits not found',
        });
      }
      await delay(DELAY_MS);
      return HttpResponse.json(credits);
    },
  ),
];
