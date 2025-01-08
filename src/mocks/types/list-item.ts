import { MovieItem } from './movie';

export type ListItem = {
  id: string;
  type: 'favorite' | 'watchlist';
  movieId: number;
  ownerId: string;
  movie: MovieItem;
};
