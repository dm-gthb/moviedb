import { Link, useLocation } from 'react-router';
import { MovieItem } from '../../../services/movies/movies.types.service';
import { useSearchParamsWithMoviesFilterDefaults } from '../../../services/movies/movies-filter.service';
import { ListItemButtons } from '../list-item-buttons/list-item-buttons';

export function MoviesGridCard({ movie }: { movie: MovieItem }) {
  const searchParams = useSearchParamsWithMoviesFilterDefaults();
  const { pathname } = useLocation();
  const { id, title } = movie;

  return (
    <div>
      <Link
        to={`/movie/${id}`}
        state={{ searchParams: searchParams.toString(), pathname }}
      >
        <p>{title}</p>
      </Link>
      <ListItemButtons movie={movie} />
    </div>
  );
}
