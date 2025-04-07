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
} from '../services/api/list-items.api.service';
import {
  MovieListItems,
  MovieListItemType,
} from '../services/list-items/list-items.types.service';
import { useAuth } from '../services/auth/auth-context.service';
import {
  AddMovieToListBaseParams,
  DeleteMovieFromListParams,
} from '../services/api/list-items.api.types.service';

export const movieListItemOptions = (token = '', userId = '') =>
  queryOptions({
    queryKey: ['movieListItems'],
    queryFn: () => getMovieListItems({ token, userId }),
  });

export function useMovieListItems() {
  const { user } = useAuth();
  return useQuery(movieListItemOptions(user?.idToken, user?.localId));
}

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddMovieToListBaseParams) => addMovieToFavorites(params),
    ...invalidateQueriesOptions(queryClient),
    ...onErrorDefaultOptions(),
  });
}

export function useAddToWatchlistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddMovieToListBaseParams) => addMovieToWatchList(params),
    ...invalidateQueriesOptions(queryClient),
    ...onErrorDefaultOptions(),
  });
}

export function useDeleteFromFavoritesMutation() {
  return useDeleteListItemMutation({ type: 'favorites' });
}

export function useDeleteFromWatchlistMutation() {
  return useDeleteListItemMutation({ type: 'watchlist' });
}

function onErrorDefaultOptions() {
  return {
    onError: () => {
      alert('There was an error. Please try again.');
    },
  };
}

function invalidateQueriesOptions(queryClient: QueryClient) {
  return {
    onSuccess: () => {
      return queryClient.invalidateQueries(movieListItemOptions());
    },
  };
}

function useDeleteListItemMutation({ type }: { type: MovieListItemType }) {
  return useListItemOptimisticMutation({
    mutationFn: (params: DeleteMovieFromListParams) => deleteMovieFromList(params),
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

function useListItemOptimisticMutation<TData = unknown, TVariables = void>({
  mutationFn,
  updater,
}: OptimisticProps<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (...args) => {
      const queryKey = movieListItemOptions().queryKey;
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
      return queryClient.invalidateQueries(movieListItemOptions());
    },
  });
}
