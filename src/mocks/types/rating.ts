import { MovieItem } from './movie';

export type Rating = {
  id: string;
  movieId: number;
  ownerId: string;
  rating: number;
  movie: MovieItem;
};
