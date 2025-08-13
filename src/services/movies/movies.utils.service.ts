import { MovieListItemData } from '../list-items/list-items.types.service';
import { MovieDetails, MovieItem } from './movies.types.service';
import { PersonBase } from '../person/person.types.service';

export const getListItemMovie = (
  movie: MovieItem | MovieDetails | MovieListItemData,
): MovieListItemData => ({
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

export function getPersonsWithOverflow(
  list?: Array<PersonBase>,
  maxCount = 10,
): [persons: Array<PersonBase>, isMultiple: boolean] {
  return [list?.slice(0, maxCount) ?? [], list ? list.length > 1 : false];
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
