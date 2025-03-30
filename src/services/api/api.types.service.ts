import { MovieCredits, MovieDetails, MovieItem } from '../movies/movies.types.service';
import { PersonDetails } from '../person/person.types';

export type GetMoviesResponse = {
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

export type GetMovieImagesResponse = {
  backdrops: { filePath: string }[];
  logos: { filePath: string }[];
  posters: { filePath: string }[];
};

export type GetPersonDetailsResponse = PersonDetails;

export type GetPersonMovieCreditsResponse = { cast: MovieItem[]; crew: MovieItem[] };
