import { Link, useLocation } from 'react-router';
import { MovieItem } from '../../../services/movies/movies.types.service';
import { useSearchParamsWithMoviesFilterDefaults } from '../../../services/movies/movies-filter.service';

export function MoviesGridCard({ movie }: { movie: MovieItem }) {
  const searchParams = useSearchParamsWithMoviesFilterDefaults();
  const { pathname } = useLocation();

  return (
    <Link
      to={`/movie/${movie.id}`}
      state={{ searchParams: searchParams.toString(), pathname }}
    >
      {movie.title}
    </Link>
  );
}
