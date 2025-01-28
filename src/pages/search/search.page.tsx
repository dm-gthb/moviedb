import { useParams } from 'react-router';
import { useMoviesSearch } from '../../queries/movies.queries';
import { MoviesGrid } from '../../components/movies/movies-grid/movies-grid';

export function SearchPage() {
  const { searchTerm } = useParams();
  const { data, isPending, isSuccess } = useMoviesSearch({ searchTerm });

  return (
    <div className="mx-auto max-w-7xl px-8 pb-10 pt-4">
      <h1 className="sr-only">Search Results</h1>
      <p className={`mb-6 max-w-2xl text-xl ${isPending && 'animate-pulse'}`}>
        {isPending && (
          <>
            Searching for: <SearchTerm term={searchTerm} />
          </>
        )}
        {!isPending && !data?.results?.length && (
          <>
            No movies found for <SearchTerm term={searchTerm} />
          </>
        )}
        {isSuccess && data?.results?.length > 0 && (
          <>
            Search results for <SearchTerm term={searchTerm} />
          </>
        )}
      </p>

      <div className="mb-10">
        <MoviesGrid movies={data?.results} isPending={isPending} />
      </div>
    </div>
  );
}

function SearchTerm({ term = '' }: { term?: string }) {
  return <span className="font-semibold capitalize">"{term}"</span>;
}
