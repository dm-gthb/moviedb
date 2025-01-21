import { useParams } from 'react-router';
import { useMoviesSearch } from '../../queries/movies.queries';
import { MoviesGrid } from '../../components/movies/movies-grid/movies-grid';

export function SearchPage() {
  const { searchTerm } = useParams();
  const { data, isPending, isSuccess } = useMoviesSearch({ searchTerm });

  return (
    <div className="max-w-7xl mx-auto px-8 pt-4 pb-10">
      <h1 className="sr-only">Search Results</h1>
      <p className={`text-xl max-w-2xl mb-6 ${isPending && 'animate-pulse'}`}>
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
            Search results for <SearchTerm term={searchTerm} />:
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
  return <span className="capitalize font-semibold">"{term}"</span>;
}
