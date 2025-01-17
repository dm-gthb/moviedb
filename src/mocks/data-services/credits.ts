import { creditsData, defaultMockCredits } from '../data/credits';
import { MovieCredits } from '../types/movie';

let credits = { ...creditsData };

export async function read(movieId: number): Promise<MovieCredits> {
  return credits[movieId] ?? defaultMockCredits;
}

export async function create(movieId: number, movieCredits: MovieCredits) {
  credits[movieId] = movieCredits;
  return movieCredits;
}

export async function reset() {
  credits = {};
}
