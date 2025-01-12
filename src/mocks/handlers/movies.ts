import { delay, http, HttpResponse, StrictResponse } from 'msw';
import * as movieService from '../data-services/movies.ts';
import * as creditService from '../data-services/credits.ts';
import * as recommendationService from '../data-services/recommendations.ts';
import { genresMap } from '../../services/movies/movies.constants.service.ts';
import { endpoints } from '../../services/endpoints.service.ts';
import { MovieDetails, MovieItem } from '../types/movie.ts';
import {
  GetMovieCreditsResponseBody,
  GetMovieDetailsResponseBody,
  GetMovieItemsResponseBody,
  GetRecommendationsResponseBody,
} from './types.ts';

const ITEMS_PER_PAGE = 20;
const DELAY_MS = 1000;

export const movies = [
  http.get<never, never, GetMovieItemsResponseBody>(
    endpoints.searchMovies(),
    async ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get('query') ?? '';
      const page = url.searchParams.get('page') ?? '1';
      const matchingMovies = await movieService.query(query);
      const slice = getSlice(matchingMovies, +page);

      await delay(DELAY_MS);
      return HttpResponse.json({
        page: +page,
        results: slice,
        total_pages: Math.ceil(matchingMovies.length / ITEMS_PER_PAGE),
        total_results: matchingMovies.length,
      });
    },
  ),

  http.get<never, never, GetMovieItemsResponseBody>(
    endpoints.getMovies(),
    async ({ request }) => {
      const url = new URL(request.url);
      const page = url.searchParams.get('page') ?? '1';
      const sortBy = url.searchParams.get('sort_by') ?? '';
      const genre = url.searchParams.get('with_genres') ?? '';
      const year = url.searchParams.get('year') ?? undefined;
      const releaseDateGte =
        url.searchParams.get('primary_release_date.gte') ?? undefined;
      const releaseDateLte =
        url.searchParams.get('primary_release_date.lte') ?? undefined;
      const sortedMovies = await movieService.readMany({
        sortBy,
        genre,
        year,
        releaseDateGte,
        releaseDateLte,
      });
      const slice = getSlice(sortedMovies, +page);

      await delay(DELAY_MS);
      return HttpResponse.json({
        page: +page,
        results: slice,
        total_pages: Math.ceil(sortedMovies.length / ITEMS_PER_PAGE),
        total_results: sortedMovies.length,
      });
    },
  ),

  http.get<{ movieId: string }>(
    endpoints.getMovie(':movieId'),
    async ({
      params,
    }): Promise<HttpResponse | StrictResponse<GetMovieDetailsResponseBody>> => {
      const { movieId } = params;
      const movie = await movieService.read(+movieId);
      if (!movie) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'movie not found',
        });
      }
      await delay(3000);
      return HttpResponse.json(generateMockDetails(movie));
    },
  ),

  http.get<{ movieId: string }>(
    endpoints.getMovieCredits(':movieId'),
    async ({
      params,
    }): Promise<HttpResponse | StrictResponse<GetMovieCreditsResponseBody>> => {
      const { movieId } = params;
      const credits = await creditService.read();
      if (!credits) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'credits not found',
        });
      }
      await delay(DELAY_MS);
      return HttpResponse.json({
        id: +movieId,
        ...credits,
      });
    },
  ),

  http.get<{ movieId: string }>(
    endpoints.getMovieRecommendations(':movieId'),
    async ({
      params,
    }): Promise<HttpResponse | StrictResponse<GetRecommendationsResponseBody>> => {
      const { movieId } = params;
      const recommendedMovies = await recommendationService.read();
      if (!recommendedMovies) {
        return new HttpResponse(null, {
          status: 404,
          statusText: `recommendations for ${movieId} not found`,
        });
      }
      await delay(DELAY_MS);
      return HttpResponse.json({ results: recommendedMovies });
    },
  ),
];

function generateMockDetails(movie: MovieItem): MovieDetails {
  return {
    ...movie,
    genres: movie.genre_ids.map((id) => ({ id, name: genresMap[id] })),
    runtime: 130,
    homepage: 'https://developer.themoviedb.org/',
    budget: 120000000,
    status: 'Released',
  };
}

function getSlice<T>(array: T[], page: number) {
  return array.slice(
    (page - 1) * ITEMS_PER_PAGE,
    (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );
}
