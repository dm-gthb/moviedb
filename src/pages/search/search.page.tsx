import { useParams } from 'react-router';
import { useMoviesSearch } from '../../queries/movies.queries';
import { MoviesGrid } from '../../components/movies/movies-grid/movies-grid';

export function SearchPage() {
  const { searchTerm } = useParams();
  const { data, isPending } = useMoviesSearch({ searchTerm });

  return (
    <div className="max-w-7xl mx-auto px-8 pt-4 pb-10">
      <h1 className="font-bold text-4xl md:text-5xl mb-5">Search Results</h1>
      <p className="text-xl max-w-2xl mb-6">
        Searching for: <span className='italic capitalize font-semibold'>"{searchTerm}"</span>
      </p>

      <div className="mb-10">
        <MoviesGrid movies={data?.results} isPending={isPending} />
        {!isPending && !data?.results.length && <span>{`No movies found for term ${searchTerm}.`}</span>}
      </div>
    </div>
  );
}
