import { useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { appRoute } from '../../../services/router.service';
import { MovieDetails, MovieItem } from '../../../services/movies/movies.types.service';
import { getListItemMovie } from '../../../services/movies/movies.utils.service';
import { MovieListItemButton, MovieListItemButtonProps } from './movie-list-item-button';
import { MovieListItemData } from '../../../services/list-items/list-items.types.service';
import { User } from '../../../services/auth/auth.types.service';
import { useMovieListItemActions } from './use-movie-list-item-actions';

export function MovieListItemButtons({
  movie,
  variant = 'compact',
}: {
  movie: MovieItem | MovieDetails | MovieListItemData;
  variant?: MovieListItemButtonProps['variant'];
}) {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <AuthorizedUserButtons
          movie={getListItemMovie(movie)}
          variant={variant}
          user={user}
        />
      ) : (
        <UnauthorizedUserButtons variant={variant} />
      )}
    </div>
  );
}

function UnauthorizedUserButtons({
  variant,
}: {
  variant: MovieListItemButtonProps['variant'];
}) {
  const navigate = useNavigate();

  return (
    <>
      <MovieListItemButton
        type="favorites"
        variant={variant}
        onClick={() => navigate(appRoute.auth)}
      />
      <MovieListItemButton
        type="watchlist"
        variant={variant}
        onClick={() => navigate(appRoute.auth)}
      />
    </>
  );
}

function AuthorizedUserButtons({
  movie,
  user,
  variant,
}: {
  movie: MovieListItemData;
  user: User;
  variant: MovieListItemButtonProps['variant'];
}) {
  const {
    isInFavorites,
    isInWatchlist,
    toggleFavorites,
    toggleWatchlist,
    isAddingToFavorites,
    isRemovingFromFavorites,
    isAddingToWatchlist,
    isRemovingFromWatchlist,
  } = useMovieListItemActions(movie, user);

  return (
    <>
      <MovieListItemButton
        type="favorites"
        onClick={toggleFavorites}
        disabled={isAddingToFavorites || isRemovingFromFavorites}
        variant={variant}
        isActive={isInFavorites}
      />
      <MovieListItemButton
        type="watchlist"
        onClick={toggleWatchlist}
        disabled={isAddingToWatchlist || isRemovingFromWatchlist}
        variant={variant}
        isActive={isInWatchlist}
      />
    </>
  );
}
