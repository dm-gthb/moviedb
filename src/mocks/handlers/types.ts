import { ListItem } from '../types/list-item';
import { MovieCredits, MovieDetails, MovieItem } from '../types/movie';
import { Rating } from '../types/rating';
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
  favorites: ListItem[];
  watchlist: ListItem[];
  rated: Rating[];
};

export type CreateListItemRequestBody = {
  movie: MovieItem;
};

export type CreateListItemResponseBody = {
  listItem: ListItem;
};

export type DeleteListItemParams = {
  listItemId: string;
};

export type DeleteListItemResponseBody = {
  succuss: boolean;
};

export type CreateRatingRequestBody = {
  movie: MovieItem;
  rating: number;
};

export type CreateRatingResponseBody = {
  rating: Rating;
};

export type UpdateRatingParams = {
  ratedItemId: string;
};

export type UpdateRatingRequestBody = {
  updates: Partial<Rating>;
};

export type UpdateRatingResponseBody = {
  rating: Rating;
};

export type DeleteRatingParams = {
  ratedItemId: string;
};

export type DeleteRatingResponseBody = {
  succuss: boolean;
};

export type AuthRequestBody = AuthData;

export type AuthResponseBody = {
  user: AuthenticatedUser;
};
