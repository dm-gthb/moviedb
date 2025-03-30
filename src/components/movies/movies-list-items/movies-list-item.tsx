import { Link, useLocation } from 'react-router';
import { ListItemButtons } from '../list-item-buttons/list-item-buttons';
import { MovieListItemData } from '../../../services/list-items/list-items.types';

export function MoviesListItem({ movie }: { movie: MovieListItemData }) {
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
