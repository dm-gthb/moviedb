import { MoviesFilter } from '../../components/movies/movies-filter/movies-filter';
import { MoviesGrid } from '../../components/movies/movies-grid/movies-grid';
import { useFilteredMovies } from '../../queries/movies.queries';

export function DiscoverPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useFilteredMovies();
  const movies = data?.pages.map(({ results }) => results).flat() ?? [];

  return (
    <div className="max-w-7xl mx-auto px-8 pt-4 pb-10">
      <h1 className="font-bold text-4xl md:text-5xl mb-5">Discover Movies</h1>
      <p className="text-xl max-w-2xl mb-6">
        Explore a vast collection of films, from the latest releases to timeless classics,
        with data powered by The Movie Database (TMDB).
      </p>

      <div className="mb-10">
        <MoviesFilter />
      </div>

      <div className="mb-10">
        <MoviesGrid movies={movies} isPending={isPending} />
        {!isPending && !movies.length && <span>No such movies found</span>}
      </div>

      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="w-full p-4 text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-800 disabled:text-gray-400 transition-colors rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}
