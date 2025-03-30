import { useLocation } from 'react-router';
import {
  InfiniteData,
  infiniteQueryOptions,
  QueryClient,
  QueryKey,
  queryOptions,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSearchParamsWithMoviesFilterDefaults } from '../services/movies/movies-filter.service';
import { appRoute } from '../services/router.service';
import { movieListItemsOptions } from './list-items.queries';
import { GetMoviesResponse } from '../services/api/api.types.service';
import {
  getMovie,
  getMovieCredits,
  getMovieImages,
  getMovies,
  searchMovies,
} from '../services/api/api.service';

const moviesQueryConfig = {
  cacheTime: 1000 * 60 * 60,
  staleTime: 1000 * 60 * 60,
};

export const movieQueries = {
  search: (searchTerm: string) =>
    queryOptions({
      queryKey: ['moviesSearch', searchTerm],
      queryFn: () => searchMovies({ query: searchTerm }),
      ...moviesQueryConfig,
    }),
  filter: (searchParams?: URLSearchParams | string) =>
    infiniteQueryOptions({
      queryKey: ['moviesFilter', searchParams?.toString()],
      queryFn: ({ pageParam }) => {
        const apiParams = new URLSearchParams(searchParams);
        apiParams.set('page', String(pageParam));
        return getMovies(apiParams);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.totalPages === 0 || lastPage.page === lastPage.totalPages) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      ...moviesQueryConfig,
    }),
  details: (movieId: string) =>
    queryOptions({
      queryKey: ['movieDetails', { movieId }],
      queryFn: () => getMovie({ movieId }),
      ...moviesQueryConfig,
    }),
  credits: (movieId: string) =>
    queryOptions({
      queryKey: ['movieCredits', { movieId }],
      queryFn: () => getMovieCredits({ movieId }),
      ...moviesQueryConfig,
    }),
  images: (movieId: string) =>
    queryOptions({
      queryKey: ['movieImages', { movieId }],
      queryFn: () => getMovieImages({ movieId }),
      ...moviesQueryConfig,
    }),
};

export const useMoviesSearch = ({ searchTerm = '' }) =>
  useQuery(movieQueries.search(searchTerm));

export const useFilteredMovies = () => {
  const searchParams = useSearchParamsWithMoviesFilterDefaults();
  return useInfiniteQuery(movieQueries.filter(searchParams));
};

export const useMovieDetails = ({ movieId }: { movieId: string }) => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useQueries({
    queries: [
      {
        ...movieQueries.details(movieId),
        placeholderData: () =>
          getCacheByPrevLocation({
            state,
            queryClient,
            movieId: +movieId,
          }),
      },
      movieQueries.credits(movieId),
    ],
  });
};

export const useMovieImages = ({ movieId }: { movieId: string }) =>
  useQuery(movieQueries.images(movieId));

function getCacheByPrevLocation({
  state,
  movieId,
  queryClient,
}: {
  state: { pathname?: string; searchParams?: string };
  movieId: number;
  queryClient: QueryClient;
}) {
  const { pathname, searchParams } = state ?? {};

  if (pathname?.includes(appRoute.search)) {
    const searchTerm = pathname.split('/')[2];
    const cache = queryClient.getQueryData(movieQueries.search(searchTerm).queryKey);
    return cache?.results?.find((movie) => movie.id === movieId);
  }

  if (pathname?.includes(appRoute.lists)) {
    const cache = queryClient.getQueryData(movieListItemsOptions().queryKey);
    const listItem =
      cache &&
      Object.values(cache)
        .flat()
        .find((item) => item.movieId === movieId);
    return listItem?.movie;
  }

  if (searchParams) {
    const [, data] = queryClient
      .getQueriesData(movieQueries.filter(searchParams))
      .flat() as [QueryKey, InfiniteData<GetMoviesResponse> | undefined];
    const movies = data?.pages?.map(({ results }) => results).flat() ?? [];
    const movie = movies?.find((movie) => movie.id === +movieId);
    return movie;
  }

  return undefined;
}
