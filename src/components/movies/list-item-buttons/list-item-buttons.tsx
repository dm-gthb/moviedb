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
    <>
      <button onClick={() => navigate(appRoute.login)}>add to favorites</button>
      <button onClick={() => navigate(appRoute.login)}>add to watchlist</button>
    </>
  );
}

function AuthorizedUserButtons({ movie }: { movie: ListItemMovie }) {
  const { data } = useListItems();
  const favoriteItem = data?.favorites.find((item) => item.movieId === movie.id);
  const watchlistItem = data?.watchlist.find((item) => item.movieId === movie.id);

  const addFavoriteMutation = useAddFavoriteMutation();
  const deleteFavoriteMutation = useDeleteFavoriteMutation();

  const addToWatchlistMutation = useAddToWatchlistMutation();
  const deleteFromWatchlistMutation = useDeleteFromWatchlistMutation();

  return (
    <div>
      {favoriteItem ? (
        <button
          onClick={() => deleteFavoriteMutation.mutate({ listItemId: favoriteItem.id })}
          disabled={deleteFavoriteMutation.isPending}
        >
          remove from favorites
        </button>
      ) : (
        <button
          onClick={() => addFavoriteMutation.mutate({ movie })}
          disabled={addFavoriteMutation.isPending}
        >
          add to favorites
        </button>
      )}
      {watchlistItem ? (
        <button
          onClick={() =>
            deleteFromWatchlistMutation.mutate({ listItemId: watchlistItem.id })
          }
          disabled={deleteFromWatchlistMutation.isPending}
        >
          remove from watchlist
        </button>
      ) : (
        <button
          onClick={() => addToWatchlistMutation.mutate({ movie })}
          disabled={addToWatchlistMutation.isPending}
        >
          add to watchlist
        </button>
      )}
    </div>
  );
}
