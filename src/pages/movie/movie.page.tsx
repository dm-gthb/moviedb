import { useParams } from 'react-router';
import { useMovieDetails } from '../../queries/movies.queries';
import { ListItemButtons } from '../../components/movies/list-item-buttons/list-item-buttons';
import { RatingButtons } from '../../components/movies/rating-buttons/rating-buttons';

export function MoviePage() {
  const { id: paramsId } = useParams();
  const queries = useMovieDetails({ movieId: paramsId ?? '' });

  const [movie, credits, recommendations] = queries;
  const isMoviePlaceholderData = movie.isPlaceholderData;
  console.log({ isMoviePlaceholderData });

  if (movie.isPending) {
    return <span>...loading</span>;
  }

  if (movie.isSuccess) {
    return (
      <>
        <h1>{movie.data.title}</h1>
        <p>{isMoviePlaceholderData && <span>...moviePlaceholderData</span>}</p>
        <p>{movie.data.voteAverage.toFixed(1)}</p>
        <p>{movie.data.overview}</p>
        <p>{movie.data.releaseDate}</p>
        <p>{movie.data.runtime}</p>
        <p>{movie.data.genres?.map(({ name }) => name).join(', ')}</p>
        <img src={movie.data.posterPath} alt="movie poster" />
        <p>
          {credits.isSuccess &&
            credits.data.cast
              .slice(0, 5)
              .map(({ name }) => name)
              .join(', ')}
        </p>
        <>
          {recommendations.isSuccess && (
            <>
              <h2>Recommendations</h2>
              <ul>
                {recommendations.data?.results
                  .map(({ id, title }) => <li key={id}>{title}</li>)
                  .slice(0, 5)}
              </ul>
            </>
          )}
        </>
        <ListItemButtons movie={movie.data} />
        <RatingButtons movie={movie.data} />
      </>
    );
  }
}
