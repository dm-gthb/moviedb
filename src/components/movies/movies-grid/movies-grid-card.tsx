import { MovieItem } from '../../../services/movies/movies.types.service';

export function MoviesGridCard({ movie }: { movie: MovieItem }) {
  return <span>{movie.title}</span>;
}
