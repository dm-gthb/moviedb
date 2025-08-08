import { User } from '../../../services/auth/auth.types.service';
import { MovieListItemData } from '../../../services/list-items/list-items.types.service';
import {
  useAddFavoriteMutation,
  useAddToWatchlistMutation,
  useDeleteFromFavoritesMutation,
  useDeleteFromWatchlistMutation,
  useMovieListItems,
} from '../../../queries/list-items.queries';

export function useMovieListItemActions(movie: MovieListItemData, user: User) {
  const { data } = useMovieListItems();
  const addToFavorites = useAddFavoriteMutation();
  const addToWatchlist = useAddToWatchlistMutation();
  const deleteFromFavorites = useDeleteFromFavoritesMutation();
  const deleteFromWatchlist = useDeleteFromWatchlistMutation();
  const userData = { token: user.idToken, userId: user.localId };

  const favoriteItem = data?.favorites.find((item) => item.movieId === movie.id);
  const watchlistItem = data?.watchlist.find((item) => item.movieId === movie.id);

  const isInFavorites = Boolean(favoriteItem);
  const isInWatchlist = Boolean(watchlistItem);

  const isAddingToFavorites = addToFavorites.isPending;
  const isRemovingFromFavorites = deleteFromFavorites.isPending;
  const isAddingToWatchlist = addToWatchlist.isPending;
  const isRemovingFromWatchlist = deleteFromWatchlist.isPending;

  const isLoading =
    isAddingToFavorites ||
    isRemovingFromFavorites ||
    isAddingToWatchlist ||
    isRemovingFromWatchlist;

  const handleAddToFavorites = () => {
    addToFavorites.mutate({ ...userData, movie });
  };

  const handleRemoveFromFavorites = () => {
    if (favoriteItem) {
      deleteFromFavorites.mutate({
        ...userData,
        listItemId: favoriteItem.id,
      });
    }
  };

  const handleAddToWatchlist = () => {
    addToWatchlist.mutate({ ...userData, movie });
  };

  const handleRemoveFromWatchlist = () => {
    if (watchlistItem) {
      deleteFromWatchlist.mutate({
        ...userData,
        listItemId: watchlistItem.id,
      });
    }
  };

  const handleToggleFavorites = () => {
    if (isInFavorites) {
      handleRemoveFromFavorites();
    } else {
      handleAddToFavorites();
    }
  };

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      handleRemoveFromWatchlist();
    } else {
      handleAddToWatchlist();
    }
  };

  return {
    isInFavorites,
    isInWatchlist,
    isLoading,

    toggleFavorites: handleToggleFavorites,
    toggleWatchlist: handleToggleWatchlist,
    addToFavorites: handleAddToFavorites,
    removeFromFavorites: handleRemoveFromFavorites,
    addToWatchlist: handleAddToWatchlist,
    removeFromWatchlist: handleRemoveFromWatchlist,

    isAddingToFavorites,
    isRemovingFromFavorites,
    isAddingToWatchlist,
    isRemovingFromWatchlist,
  };
}
