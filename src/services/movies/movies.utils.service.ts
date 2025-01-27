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
  genreIds: movie.genreIds,
});

export function getYear(date: Date) {
  return date.toISOString().split('T')[0];
}

export function getNamesWithOverflow(
  list?: Array<{ name: string }>,
  maxCount = 10,
): [string, boolean] {
  return list
    ? [
        list
          .slice(0, maxCount)
          .map(({ name }) => name)
          .join(', '),
        list.length > 1,
      ]
    : ['', false];
}

export function formatDuration(minDuration: number) {
  const hours = Math.floor(minDuration / 60);
  const min = minDuration % 60;
  return `${hours ? `${hours}h ` : ''}${min ? `${min}m` : ''}`;
}

export function formatLanguage(language: string) {
  return new Intl.DisplayNames(['en'], { type: 'language' }).of(language);
}

export function formatCountry(countryCode: string) {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
}

export function formatCountryList(countryCodes?: string[]) {
  return (
    countryCodes
      ?.filter((code) => Boolean(code))
      ?.map((code) => formatCountry(code))
      .join(', ') ?? ''
  );
}

export function formatBudget(budget: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(budget);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(date));
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
