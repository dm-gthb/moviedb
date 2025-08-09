import { Link } from 'react-router';
import { genresMap } from '../../../services/movies/movies.constants.service';
import { appRoute } from '../../../services/router.service';
import { MovieDetails } from '../../../services/movies/movies.types.service';

export function MovieInfoHeader({
  movie,
  isLink,
}: {
  movie: MovieDetails;
  isLink?: boolean;
}) {
  const { title, releaseDate, genreIds } = movie;
  return (
    <div className="text-gray-50">
      <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        {isLink ? <Link to={`${appRoute.movie}/${movie.id}`}>{title}</Link> : title}
      </h1>
      <div>
        <span>{releaseDate && `${releaseDate?.slice(0, 4)}`}</span>
        {releaseDate && genreIds?.length > 0 && ' • '}
        {genreIds?.length > 0 && (
          <span>{genreIds.map((id) => genresMap[id]).join(', ')}</span>
        )}
      </div>
    </div>
  );
}
