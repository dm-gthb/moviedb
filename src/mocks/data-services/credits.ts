import { credits } from '../data/credits';
import { MovieCredits } from '../types/movie';

export async function read(): Promise<MovieCredits> {
  return credits;
}
