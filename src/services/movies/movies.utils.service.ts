import { ListItemMovie, MovieDetails, MovieItem } from './movies.types.service';

export const getListItemMovie = (
  movie: MovieItem | MovieDetails | ListItemMovie,
): ListItemMovie => ({
  backdropPath: movie.backdropPath,
  id: movie.id,
  overview: movie.overview,
  posterPath: movie.posterPath,
  releaseDate: movie.releaseDate,
  title: movie.title,
  genreIds:
    'genreIds' in movie
      ? movie.genreIds
      : (movie?.genres?.map((genre) => genre.id) ?? []),
});

export function getFormattedDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
