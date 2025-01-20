import { imageUrl, PosterSize } from '../../../services/movies/movies.constants.service';

export function MoviePoster({
  posterPath,
  movieTitle,
}: {
  posterPath?: string | null;
  movieTitle?: string;
}) {
  return (
    <div className="aspect-[2/3] bg-gray-100 dark:bg-gray-700 shadow-md">
      {posterPath ? (
        <img
          src={`${imageUrl}/${PosterSize.w500}/${posterPath}`}
          alt={`${movieTitle} movie poster`}
          className="block w-full h-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-5 overflow-hidden text-center">
          {movieTitle && (
            <h3 className="text-md text-gray-900 dark:text-gray-50">{movieTitle}</h3>
          )}
        </div>
      )}
    </div>
  );
}
