import { Link, useLocation } from 'react-router';
import { MovieItem } from '../../../services/movies/movies.types.service';
import { MovieListItemData } from '../../../services/list-items/list-items.types';
import { useSearchParamsWithMoviesFilterDefaults } from '../../../services/movies/movies-filter.service';
import { ListItemButtons } from '../list-item-buttons/list-item-buttons';
import { genresMap } from '../../../services/movies/movies.constants.service';
import { MoviePoster } from '../movie-poster/movie-poster';
import { movieQueries } from '../../../queries/movies.queries';
import { prefetchBackdropImage } from '../../../services/image/image.service';
import { useQueryClient } from '@tanstack/react-query';

export function MovieCard({ movie }: { movie: MovieItem | MovieListItemData }) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParamsWithMoviesFilterDefaults();
  const { pathname } = useLocation();
  const { id, title, posterPath, releaseDate, genreIds, backdropPath } = movie;

  const prefetchMovie = () => {
    queryClient.prefetchQuery(movieQueries.details(id.toString()));
    queryClient.prefetchQuery(movieQueries.credits(id.toString()));
    prefetchBackdropImage(backdropPath);
  };

  return (
    <article>
      <Link
        to={`/movie/${id}`}
        state={{ searchParams: searchParams.toString(), pathname }}
        className="group block overflow-hidden rounded shadow-md transition focus-within:scale-110 hover:scale-110"
        onMouseEnter={prefetchMovie}
        onFocus={prefetchMovie}
      >
        <h2 className="sr-only">{title}</h2>
        <div className="relative">
          <MoviePoster posterPath={posterPath} movieTitle={title} />
          <div className="absolute bottom-0 left-0 w-full rounded-b bg-gray-700 px-2 py-3 text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 dark:bg-gray-800 dark:text-gray-200">
            <div className="mb-2 flex h-full items-center gap-2 text-sm">
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
