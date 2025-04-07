import { faker } from '@faker-js/faker';
import { genresMap } from '../services/movies/movies.constants.service';
import {
  AdditionalMovieData,
  MovieCredits,
  MovieDetails,
  MovieItem,
} from './types/movie';

export function buildUserAuthData() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function buildMovieItem(): MovieItem {
  return {
    adult: faker.datatype.boolean(),
    backdrop_path: '/' + faker.system.commonFileName('jpg'),
    genre_ids: [faker.helpers.objectKey(genresMap)],
    id: faker.number.int(),
    original_language: faker.location.language().alpha2,
    original_title: faker.lorem.word() + faker.number.int(),
    overview: faker.lorem.paragraph(),
    popularity: faker.number.float({ fractionDigits: 2 }),
    poster_path: '/' + faker.system.commonFileName('jpg'),
    release_date: faker.date.recent().toISOString().split('T')[0],
    title: faker.lorem.word() + faker.number.int(),
    video: faker.datatype.boolean(),
    vote_average: faker.number.float({ fractionDigits: 3 }),
    vote_count: faker.number.int(),
  };
}

export function buildMovieItemWithDetails(
  overrides?: Partial<MovieItem> & Partial<MovieDetails>,
): MovieItem & MovieDetails {
  const movie = buildMovieItem();
  return {
    ...movie,
    ...generateMockDetails(movie),
    ...overrides,
  };
}

export function generateMockDetails(movie: MovieItem): AdditionalMovieData {
  return {
    genres: movie.genre_ids.map((id) => ({ id, name: genresMap[id] })),
    runtime: faker.number.int({ min: 20, max: 130 }),
    budget: faker.number.int({ min: 1000, max: 120000000 }),
    homepage: 'https://developer.themoviedb.org/',
    status: 'Released',
    origin_country: ['US'],
  };
}

export function buildMovieCredits(): MovieCredits {
  return {
    cast: new Array(3).fill('').map(() => ({
      adult: faker.datatype.boolean(),
      gender: faker.number.int(),
      id: faker.number.int(),
      known_for_department: faker.commerce.department(),
      name: faker.person.fullName(),
      original_name: faker.person.fullName(),
      popularity: faker.number.float({ fractionDigits: 3 }),
      profile_path: '/' + faker.system.commonFileName('jpg'),
      cast_id: faker.number.int(),
      character: faker.person.fullName(),
      credit_id: faker.string.uuid(),
      order: faker.number.int(),
    })),
    crew: new Array(3).fill('').map((_, i) => ({
      adult: faker.datatype.boolean(),
      gender: faker.number.int(),
      id: faker.number.int(),
      known_for_department: faker.commerce.department(),
      name: faker.person.fullName(),
      original_name: faker.person.fullName(),
      popularity: faker.number.float({ fractionDigits: 3 }),
      profile_path: '/' + faker.system.commonFileName('jpg'),
      credit_id: faker.string.uuid(),
      department: faker.commerce.department(),
      job: i === 0 ? 'Director' : i === 1 ? 'Writer' : 'Screenplay',
    })),
  };
}

export function buildMovieRecommendations(): MovieItem[] {
  return new Array(5).fill('').map(buildMovieItem);
}
