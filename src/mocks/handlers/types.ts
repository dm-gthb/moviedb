import { FirestoreMovieListItem } from '../types/list-item';
import { MovieCredits, MovieDetails, MovieItem } from '../types/movie';
import { AuthData, AuthenticatedUser } from '../types/user';

export type GetMovieItemsResponseBody = {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
};

export type GetMovieDetailsResponseBody = MovieDetails;

export type GetMovieCreditsResponseBody = MovieCredits & {
  id: number;
};

export type GetRecommendationsResponseBody = {
  results: MovieItem[];
};

export type GetListItemsResponseBody = {
  documents: FirestoreMovieListItem[];
};

export type CreateListItemRequestBody = FirestoreMovieListItem;

export type CreateListItemResponseBody = FirestoreMovieListItem;

export type DeleteListItemParams = {
  userId: string;
  listItemId: string;
};

export type DeleteListItemResponseBody = {
  succuss: boolean;
};

export type AuthRequestBody = AuthData;

export type AuthResponseBody = AuthenticatedUser;
