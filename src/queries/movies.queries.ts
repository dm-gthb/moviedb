import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import api from '../services/api/api.service';
import { useSearchParamsWithMoviesFilterDefaults } from '../services/movies/movies-filter.service';

const moviesQueryConfig = {
  cacheTime: 1000 * 60 * 60,
  staleTime: 1000 * 60 * 60,
};

const movieQueries = {
  filter: (searchParams?: URLSearchParams | string) =>
    infiniteQueryOptions({
      queryKey: ['filter', searchParams?.toString()],
      queryFn: ({ pageParam }) => {
        const apiParams = new URLSearchParams(searchParams);
        apiParams.set('page', String(pageParam));
        return api.getMovies(apiParams);
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
};

export const useFilteredMovies = () => {
  const searchParams = useSearchParamsWithMoviesFilterDefaults();
  return useInfiniteQuery(movieQueries.filter(searchParams));
};
