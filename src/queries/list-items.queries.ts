import {
  MutationFunction,
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addMovieToFavorites,
  addMovieToWatchList,
  deleteMovieFromList,
  getMovieListItems,
} from '../services/list-items/list-items.service';
import {
  MovieListItemData,
  MovieListItems,
} from '../services/list-items/list-items.types';

export const movieListItemsOptions = () =>
  queryOptions({
    queryKey: ['movieListItems'],
    queryFn: () => getMovieListItems(),
  });

const onErrorDefaultOptions = () => ({
  onError: () => {
    alert('There was an error. Please try again.');
  },
});

const invalidateQueriesOptions = (queryClient: QueryClient) => ({
  onSuccess: () => {
    return queryClient.invalidateQueries(movieListItemsOptions());
  },
});

export function useMovieListItems() {
  return useQuery(movieListItemsOptions());
}

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ movie }: { movie: MovieListItemData }) => {
      return addMovieToFavorites({ movie });
    },
    ...invalidateQueriesOptions(queryClient),
    ...onErrorDefaultOptions(),
  });
}

export function useAddToWatchlistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ movie }: { movie: MovieListItemData }) => {
      return addMovieToWatchList({ movie });
    },
    ...invalidateQueriesOptions(queryClient),
    ...onErrorDefaultOptions(),
  });
}

export function useDeleteFavoriteMutation() {
  return useDeleteListItemMutation({ type: 'favorites' });
}

export function useDeleteFromWatchlistMutation() {
  return useDeleteListItemMutation({ type: 'watchlist' });
}

function useDeleteListItemMutation({ type }: { type: 'watchlist' | 'favorites' }) {
  return useListItemOptimisticMutation({
    mutationFn: ({ listItemId }: { listItemId: string }) =>
      deleteMovieFromList(listItemId),
    updater: (
      prevItems: MovieListItems | undefined,
      itemToDelete: { listItemId: string },
    ): MovieListItems => {
      if (prevItems === undefined) {
        return { favorites: [], watchlist: [] };
      }

      const list = prevItems[type];
      const updatedList = list.filter((item) => item.id !== itemToDelete.listItemId);
      const result = {
        ...prevItems,
        [type]: updatedList,
      };
      return result;
    },
  });
}

type OptimisticProps<
  TData = unknown,
  TVariables = void,
  TQueryFnData = MovieListItems,
> = {
  mutationFn: MutationFunction<TData, TVariables>;
  updater: (input: TQueryFnData | undefined, onMutateArgs: TVariables) => TQueryFnData;
};

export const useListItemOptimisticMutation = <TData = unknown, TVariables = void>({
  mutationFn,
  updater,
}: OptimisticProps<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (...args) => {
      const queryKey = movieListItemsOptions().queryKey;
      await queryClient.cancelQueries({ queryKey });
      const snapshot = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => updater(old, ...args));

      return () => {
        queryClient.setQueryData(queryKey, snapshot);
      };
    },
    onError: (_err, _variables, rollback) => {
      rollback?.();
      alert('There was an error. Please try again.');
    },
    onSettled: () => {
      return queryClient.invalidateQueries(movieListItemsOptions());
    },
  });
};
