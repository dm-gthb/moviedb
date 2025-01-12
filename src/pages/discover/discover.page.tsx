import { MoviesFilter } from '../../components/movies/movies-filter/movies-filter';
import { MoviesGrid } from '../../components/movies/movies-grid/movies-grid';
import { useFilteredMovies } from '../../queries/movies.queries';

export function DiscoverPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useFilteredMovies();
  const movies = data?.pages.map(({ results }) => results).flat() ?? [];

  if (isPending) {
    return (
      <>
        <h1>DiscoverPage</h1>
        <span>...loading</span>
      </>
    );
  }

  return (
    <>
      <h1>DiscoverPage</h1>
      <MoviesFilter />

      {movies.length > 0 ? (
        <MoviesGrid movies={movies} />
      ) : (
        <span>no such movies found</span>
      )}

      {hasNextPage && (
        <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          load more
        </button>
      )}
    </>
  );
}
