import { useParams } from 'react-router';
import { useMoviesSearch } from '../../queries/movies.queries';
import { MoviesGrid } from '../../components/movies/movies-grid/movies-grid';

export function SearchPage() {
  const { searchTerm } = useParams();
  const { data, isPending } = useMoviesSearch({ searchTerm });

  if (isPending) {
    return <span>...loading</span>;
  }

  if (!data?.results.length) {
    return <span>no results for {searchTerm}</span>;
  }

  return (
    <div>
      <h1>Results page</h1>
      <p>search term: {searchTerm}</p>
      <p>results:</p>
      <div>
        <MoviesGrid movies={data.results} />
      </div>
    </div>
  );
}
