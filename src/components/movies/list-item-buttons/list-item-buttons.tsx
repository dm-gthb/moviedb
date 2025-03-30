import { useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { appRoute } from '../../../services/router.service';
import {
  useAddFavoriteMutation,
  useAddToWatchlistMutation,
  useDeleteFavoriteMutation,
  useDeleteFromWatchlistMutation,
  useMovieListItems,
} from '../../../queries/list-items.queries';
import { MovieDetails, MovieItem } from '../../../services/movies/movies.types.service';
import { getListItemMovie } from '../../../services/movies/movies.utils.service';
import { ListItemButton, ListItemButtonProps } from './list-item-button';
import { MovieListItemData } from '../../../services/list-items/list-items.types';

export function ListItemButtons({
  movie,
  size,
}: {
  movie: MovieItem | MovieDetails | MovieListItemData;
  size?: ListItemButtonProps['size'];
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  return user ? (
    <AuthorizedUserButtons movie={getListItemMovie(movie)} size={size} />
  ) : (
    <div className="flex items-center gap-3">
      <ListItemButton
        type="favorites"
        size={size}
        onClick={() => navigate(appRoute.auth)}
      />
      <ListItemButton
        type="watchlist"
        size={size}
        onClick={() => navigate(appRoute.auth)}
      />
    </div>
  );
}

function AuthorizedUserButtons({
  movie,
  size,
}: {
  movie: MovieListItemData;
  size?: ListItemButtonProps['size'];
}) {
  const { data } = useMovieListItems();
  const favoriteItem = data?.favorites.find((item) => item.movieId === movie.id);
  const watchlistItem = data?.watchlist.find((item) => item.movieId === movie.id);
  const addToFavorites = useAddFavoriteMutation();
  const deleteFromFavorites = useDeleteFavoriteMutation();
  const addToWatchlist = useAddToWatchlistMutation();
  const deleteFromWatchlist = useDeleteFromWatchlistMutation();

  return (
    <div className="flex items-center gap-3">
      {favoriteItem ? (
        <ListItemButton
          type="favorites"
          onClick={() => deleteFromFavorites.mutate({ listItemId: favoriteItem.id })}
          disabled={deleteFromFavorites.isPending}
          size={size}
          isActive
        />
      ) : (
        <ListItemButton
          type="favorites"
          onClick={() => addToFavorites.mutate({ movie })}
          disabled={addToFavorites.isPending}
          size={size}
        />
      )}
      {watchlistItem ? (
        <ListItemButton
          type="watchlist"
          onClick={() => deleteFromWatchlist.mutate({ listItemId: watchlistItem.id })}
          disabled={deleteFromWatchlist.isPending}
          size={size}
          isActive
        />
      ) : (
        <ListItemButton
          type="watchlist"
          onClick={() => addToWatchlist.mutate({ movie })}
          disabled={addToWatchlist.isPending}
          size={size}
        />
      )}
    </div>
  );
}
