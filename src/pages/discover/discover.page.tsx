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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, hasNextPage]);

  return (
    <div className="mx-auto max-w-7xl px-8 pb-10 pt-4">
      <h1 className="mb-5 text-4xl font-bold md:text-5xl">Discover Movies</h1>
      <p className="mb-6 max-w-2xl text-xl">
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
            className="inline h-8 w-8 animate-spin fill-gray-900 text-gray-300 dark:fill-gray-50 dark:text-gray-600"
          />
        </div>
      ) : (
        <div ref={ref} />
      )}
    </div>
  );
}
