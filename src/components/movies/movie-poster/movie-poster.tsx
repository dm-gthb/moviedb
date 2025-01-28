import { imageUrl, PosterSize } from '../../../services/movies/movies.constants.service';

export function MoviePoster({
  posterPath,
  movieTitle,
}: {
  posterPath?: string | null;
  movieTitle?: string;
}) {
  return (
    <div className="aspect-[2/3] bg-gray-100 shadow-md dark:bg-gray-700">
      {posterPath ? (
        <img
          src={`${imageUrl}/${PosterSize.w500}/${posterPath}`}
          alt={`${movieTitle} movie poster`}
          className="block h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center overflow-hidden p-5 text-center">
          {movieTitle && (
            <h3 className="text-md text-gray-900 dark:text-gray-50">{movieTitle}</h3>
          )}
        </div>
      )}
    </div>
  );
}
