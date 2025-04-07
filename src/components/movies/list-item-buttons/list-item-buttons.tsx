import { useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { appRoute } from '../../../services/router.service';
import {
  useAddFavoriteMutation,
  useAddToWatchlistMutation,
  useDeleteFromFavoritesMutation,
  useDeleteFromWatchlistMutation,
  useMovieListItems,
} from '../../../queries/list-items.queries';
import { MovieDetails, MovieItem } from '../../../services/movies/movies.types.service';
import { getListItemMovie } from '../../../services/movies/movies.utils.service';
import { ListItemButton, ListItemButtonProps } from './list-item-button';
import { MovieListItemData } from '../../../services/list-items/list-items.types.service';
import { User } from '../../../services/auth/auth.types.service';

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
    <AuthorizedUserButtons movie={getListItemMovie(movie)} size={size} user={user} />
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
  user,
  size,
}: {
  movie: MovieListItemData;
  user: User;
  size?: ListItemButtonProps['size'];
}) {
  const { data } = useMovieListItems();
  const favoriteItem = data?.favorites.find((item) => item.movieId === movie.id);
  const watchlistItem = data?.watchlist.find((item) => item.movieId === movie.id);
  const addToFavorites = useAddFavoriteMutation();
  const addToWatchlist = useAddToWatchlistMutation();
  const deleteFromFavorites = useDeleteFromFavoritesMutation();
  const deleteFromWatchlist = useDeleteFromWatchlistMutation();
  const userData = { token: user.idToken, userId: user.localId };

  return (
    <div className="flex items-center gap-3">
      {favoriteItem ? (
        <ListItemButton
          type="favorites"
          onClick={() =>
            deleteFromFavorites.mutate({
              ...userData,
              listItemId: favoriteItem.id,
            })
          }
          disabled={deleteFromFavorites.isPending}
          size={size}
          isActive
        />
      ) : (
        <ListItemButton
          type="favorites"
          onClick={() => addToFavorites.mutate({ ...userData, movie })}
          disabled={addToFavorites.isPending}
          size={size}
        />
      )}
      {watchlistItem ? (
        <ListItemButton
          type="watchlist"
          onClick={() =>
            deleteFromWatchlist.mutate({
              ...userData,
              listItemId: watchlistItem.id,
            })
          }
          disabled={deleteFromWatchlist.isPending}
          size={size}
          isActive
        />
      ) : (
        <ListItemButton
          type="watchlist"
          onClick={() => addToWatchlist.mutate({ ...userData, movie })}
          disabled={addToWatchlist.isPending}
          size={size}
        />
      )}
    </div>
  );
}
