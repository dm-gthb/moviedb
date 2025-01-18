import { useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { appRoute } from '../../../services/router.service';
import {
  useAddFavoriteMutation,
  useAddToWatchlistMutation,
  useDeleteFavoriteMutation,
  useDeleteFromWatchlistMutation,
  useListItems,
} from '../../../queries/list-items.queries';
import {
  ListItemMovie,
  MovieDetails,
  MovieItem,
} from '../../../services/movies/movies.types.service';
import { getListItemMovie } from '../../../services/movies/movies.utils.service';
import { ListItemButton as Button } from './list-item-button';

export function ListItemButtons({
  movie,
}: {
  movie: MovieItem | MovieDetails | ListItemMovie;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return user ? (
    <AuthorizedUserButtons movie={getListItemMovie(movie)} />
  ) : (
    <div className="flex items-center gap-3">
      <Button type="favorites" onClick={() => navigate(appRoute.login)} />
      <Button type="watchlist" onClick={() => navigate(appRoute.login)} />
    </div>
  );
}

function AuthorizedUserButtons({ movie }: { movie: ListItemMovie }) {
  const { data } = useListItems();
  const favoriteItem = data?.favorites.find((item) => item.movieId === movie.id);
  const watchlistItem = data?.watchlist.find((item) => item.movieId === movie.id);
  const addToFavorites = useAddFavoriteMutation();
  const deleteFromFavorites = useDeleteFavoriteMutation();
  const addToWatchlist = useAddToWatchlistMutation();
  const deleteFromWatchlist = useDeleteFromWatchlistMutation();

  return (
    <div className="flex align-middle gap-3">
      {favoriteItem ? (
        <Button
          type="favorites"
          onClick={() => deleteFromFavorites.mutate({ listItemId: favoriteItem.id })}
          disabled={deleteFromFavorites.isPending}
          isActive
        />
      ) : (
        <Button
          type="favorites"
          onClick={() => addToFavorites.mutate({ movie })}
          disabled={addToFavorites.isPending}
        />
      )}
      {watchlistItem ? (
        <Button
          type="watchlist"
          onClick={() => deleteFromWatchlist.mutate({ listItemId: watchlistItem.id })}
          disabled={deleteFromWatchlist.isPending}
          isActive
        />
      ) : (
        <Button
          type="watchlist"
          onClick={() => addToWatchlist.mutate({ movie })}
          disabled={addToWatchlist.isPending}
        />
      )}
    </div>
  );
}
