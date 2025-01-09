import { User } from '../auth/auth.types.service';
import {
  ListItem,
  ListItemMovie,
  MovieCredits,
  MovieDetails,
  MovieItem,
  Rating,
} from '../movies/movies.types.service';

export type AuthResponse = {
  user: User;
};

export type AddRatingParams = {
  movie: ListItemMovie;
  rating: number;
  token?: string;
};

export type UpdateRatingParams = {
  listItemId: string;
  rating: number;
  token?: string;
};

export type DeleteRatingParams = {
  listItemId: string;
  token?: string;
};

export type GetListItemsParams = {
  token?: string;
};

export type AddListItemParams = {
  movie: ListItemMovie;
  token?: string;
};

export type DeleteListItemParams = {
  listItemId: string;
  token?: string;
};

export type GetMeParams = {
  token?: string;
};

export type GetMovieListResponse = {
  page: number;
  results: MovieItem[];
  totalPages: number;
  totalResults: number;
};

export type GetMovieDetailsResponse = MovieDetails;
export type GetMovieCreditsResponse = MovieCredits & {
  id: number;
};

export type GetMovieRecommendationsResponse = {
  results: MovieItem[];
};

export type GetListItemsResponse = {
  favorites: ListItem[];
  watchlist: ListItem[];
  rated: Rating[];
};

export type ListType = keyof GetListItemsResponse;

export type CreateListItemResponse = {
  listItem: ListItem;
};

export type DeleteListItemResponse = {
  succuss: boolean;
};

export type CreateRatingResponse = {
  rating: Rating;
};

export type UpdateRatingResponse = {
  rating: Rating;
};

export type DeleteRatingResponse = {
  succuss: boolean;
};
