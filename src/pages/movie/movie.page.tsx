import { useParams } from 'react-router';
import { useMovieDetails } from '../../queries/movies.queries';

export function MoviePage() {
  const { id: paramsId } = useParams();
  const queries = useMovieDetails({ movieId: paramsId ?? '' });

  const [movie] = queries;
  const isMoviePlaceholderData = movie.isPlaceholderData;
  console.log({ isMoviePlaceholderData });

  if (movie.isPending) {
    return <span>...loading</span>;
  }

  if (movie.isSuccess) {
    return (
      <>
        <h1>Movie Page</h1>
        <h2>{movie.data.title}</h2>
        <p>{isMoviePlaceholderData && <span>...moviePlaceholderData</span>}</p>
      </>
    );
  }
}
