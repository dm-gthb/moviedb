import { useParams } from 'react-router';
import { useMovieDetails } from '../../queries/movies.queries';
import { ListItemButtons } from '../../components/movies/list-item-buttons/list-item-buttons';
import { RatingButtons } from '../../components/movies/rating-buttons/rating-buttons';

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
        <ListItemButtons movie={movie.data} />
        <RatingButtons movie={movie.data} />
      </>
    );
  }
}
