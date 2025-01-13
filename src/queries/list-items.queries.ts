import {
  MutationFunction,
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import api from '../services/api/api.service';
import { useAuth } from '../services/auth/auth-context.service';
import { ListItemMovie } from '../services/movies/movies.types.service';
import { GetListItemsResponse, ListType } from '../services/api/api.types.service';

export const listItemsOptions = (token?: string) =>
  queryOptions({
    queryKey: ['listItems'],
    queryFn: () => api.getListItems({ token }),
  });

const onErrorDefaultOptions = () => ({
  onError: () => {
    alert('There was an error. Please try again.');
  },
});

const invalidateQueriesOptions = (queryClient: QueryClient) => ({
  onSuccess: () => {
    return queryClient.invalidateQueries(listItemsOptions());
  },
});

export function useListItems() {
  const { user } = useAuth();
  return useQuery(listItemsOptions(user?.token));
}

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: ({ movie }: { movie: ListItemMovie }) => {
      return api.addFavorite({ token: user?.token, movie });
    },
    ...invalidateQueriesOptions(queryClient),
    ...onErrorDefaultOptions(),
  });
}

export function useAddToWatchlistMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: ({ movie }: { movie: ListItemMovie }) => {
      return api.addToWatchList({ token: user?.token, movie });
    },
    ...invalidateQueriesOptions(queryClient),
    ...onErrorDefaultOptions(),
  });
}

export function useAddRatingMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: ({ movie, rating }: { movie: ListItemMovie; rating: number }) => {
      return api.addRating({ token: user?.token, movie, rating });
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

export function useDeleteRatingMutation() {
  return useDeleteListItemMutation({ type: 'rated' });
}

export function useUpdateRatingMutation() {
  const { user } = useAuth();
  return useListItemOptimisticMutation({
    mutationFn: ({ rating, listItemId }: { rating: number; listItemId: string }) => {
      return api.updateRating({ token: user?.token, listItemId, rating });
    },
    updater: (
      prevItems: GetListItemsResponse | undefined,
      updatedItemData: { listItemId: string; rating: number },
    ): GetListItemsResponse => {
      if (prevItems === undefined) {
        return { rated: [], favorites: [], watchlist: [] };
      }
      const { rated } = prevItems;
      const updatedRated = rated?.map((prevItem) =>
        prevItem.id === updatedItemData.listItemId
          ? { ...prevItem, rating: updatedItemData.rating }
          : prevItem,
      );
      return {
        ...prevItems,
        rated: updatedRated,
      };
    },
  });
}

function useDeleteListItemMutation({ type }: { type: ListType }) {
  const { user } = useAuth();
  const token = user?.token;
  return useListItemOptimisticMutation({
    mutationFn: ({ listItemId }: { listItemId: string }) => {
      if (type === 'favorites') {
        return api.deleteFavorite({ token, listItemId });
      }

      if (type === 'watchlist') {
        return api.deleteFromWatchlist({ token, listItemId });
      }

      return api.deleteRating({ token, listItemId });
    },
    updater: (
      prevItems: GetListItemsResponse | undefined,
      itemToDelete: { listItemId: string },
    ): GetListItemsResponse => {
      if (prevItems === undefined) {
        return { rated: [], favorites: [], watchlist: [] };
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
  TQueryFnData = GetListItemsResponse,
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
      const queryKey = listItemsOptions().queryKey;
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
      return queryClient.invalidateQueries(listItemsOptions());
    },
  });
};
