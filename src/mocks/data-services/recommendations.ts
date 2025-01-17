import { defaultMockRecommendations, recommendationsData } from '../data/recommendations';
import { MovieItem } from '../types/movie';

let recommendations = { ...recommendationsData };

export async function read(movieId: number) {
  return recommendations[movieId] ?? defaultMockRecommendations;
}

export async function create(movieId: number, movieRecommendations: MovieItem[]) {
  recommendations[movieId] = movieRecommendations;
  return recommendations;
}

export async function reset() {
  recommendations = {};
}
