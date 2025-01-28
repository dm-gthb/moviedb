import { Link, useLocation } from 'react-router';
import { ListItemMovie } from '../../../services/movies/movies.types.service';
import { ListItemButtons } from '../list-item-buttons/list-item-buttons';

export function MoviesListItem({ movie }: { movie: ListItemMovie }) {
  const { pathname } = useLocation();
  return (
    <div>
      <Link to={`/movie/${movie.id}`} state={{ pathname }}>
        <p>{movie.title}</p>
      </Link>
      <ListItemButtons movie={movie} />
    </div>
  );
}
