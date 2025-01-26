import { useEffect } from 'react';
import { MoviesFilter } from '../../components/movies/movies-filter/movies-filter';
import { MoviesGrid } from '../../components/movies/movies-grid/movies-grid';
import { useFilteredMovies } from '../../queries/movies.queries';
import { useIntersectionObserver } from '../../services/use-intersection-observer.service';
import { Spinner } from '../../components/shared/spinner/spinner';

export function DiscoverPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useFilteredMovies();
  const movies = data?.pages.map(({ results }) => results).flat() ?? [];
  const [ref, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      if (!isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [entry?.isIntersecting, hasNextPage]);

  return (
    <div className="max-w-7xl mx-auto px-8 pt-4 pb-10">
      <h1 className="font-bold text-4xl md:text-5xl mb-5">Discover Movies</h1>
      <p className="text-xl max-w-2xl mb-6">
        Explore a vast collection of films, from the latest releases to timeless classics,
        with data powered by{' '}
        <a
          className="underline"
          href="https://developer.themoviedb.org/docs/getting-started"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Movie Database
        </a>
        .
      </p>

      <div className="mb-10">
        <MoviesFilter />
      </div>

      <div className="mb-10">
        <MoviesGrid movies={movies} isPending={isPending} />
        {!isPending && !movies.length && <span>No such movies found</span>}
      </div>

      {isFetchingNextPage ? (
        <div className="text-center">
          <Spinner
            width={24}
            height={24}
            className="inline w-8 h-8 text-gray-300 fill-gray-900 animate-spin dark:text-gray-600 dark:fill-gray-50"
          />
        </div>
      ) : (
        <div ref={ref} />
      )}
    </div>
  );
}
