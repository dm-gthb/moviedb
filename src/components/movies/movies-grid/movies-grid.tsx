import { MovieListItemData } from '../../../services/list-items/list-items.types.service';
import { MovieItem } from '../../../services/movies/movies.types.service';
import { MovieCard, PlaceholderMovieCard } from './movies-grid-card';

export function MoviesGrid({
  isPending,
  movies,
}: {
  isPending?: boolean;
  movies?: MovieItem[] | MovieListItemData[];
}) {
  return (
    <div
      {...(isPending && { 'aria-label': 'loading' })}
      className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 xl:gap-10"
    >
      {isPending
        ? new Array(20).fill('').map((_el, i) => <PlaceholderMovieCard key={i} />)
        : movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}
