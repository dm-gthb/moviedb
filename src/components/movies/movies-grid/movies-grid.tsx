import { MovieItem } from '../../../services/movies/movies.types.service';
import { MoviesGridCard } from './movies-grid-card';

export function MoviesGrid({ movies }: { movies: MovieItem[] }) {
  return (
    <ol>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MoviesGridCard movie={movie} />
        </li>
      ))}
    </ol>
  );
}
