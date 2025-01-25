import { Link, useLocation } from 'react-router';
import { ListItemMovie, MovieItem } from '../../../services/movies/movies.types.service';
import { useSearchParamsWithMoviesFilterDefaults } from '../../../services/movies/movies-filter.service';
import { ListItemButtons } from '../list-item-buttons/list-item-buttons';
import { genresMap } from '../../../services/movies/movies.constants.service';
import { MoviePoster } from '../movie-poster/movie-poster';

export function MovieCard({ movie }: { movie: MovieItem | ListItemMovie }) {
  const searchParams = useSearchParamsWithMoviesFilterDefaults();
  const { pathname } = useLocation();
  const { id, title, posterPath, releaseDate, genreIds } = movie;

  return (
    <article>
      <Link
        to={`/movie/${id}`}
        state={{ searchParams: searchParams.toString(), pathname }}
        className="group"
      >
        <h2 className="sr-only">{title}</h2>
        <div className="relative group-hover:scale-110 group-focus-within:scale-110 transition rounded overflow-hidden shadow-md">
          <MoviePoster posterPath={posterPath} movieTitle={title} />
          <div className="absolute bottom-0 left-0 w-full px-2 py-3 text-white dark:text-gray-200 bg-gray-700 dark:bg-gray-800 rounded-b opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            <div className="flex h-full items-center gap-2 text-sm mb-2">
              <span>{releaseDate?.slice(0, 4)}</span>
              <span className="overflow-ellipsis">{getFirstGenreName(genreIds)}</span>
            </div>
            <ListItemButtons movie={movie} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function PlaceholderMovieCard() {
  return (
    <div className="animate-pulse">
      <MoviePoster />
    </div>
  );
}

function getFirstGenreName(genreIds: number[]) {
  const genreNames = genreIds?.map((id) => genresMap[id]);
  return genreNames?.[0];
}
