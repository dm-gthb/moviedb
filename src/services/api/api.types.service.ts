import {
  MovieCredits,
  MovieDetails,
  MovieItem,
  PersonDetails,
} from '../movies/movies.types.service';

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

export type GetMovieImagesResponse = {
  backdrops: { filePath: string }[];
  logos: { filePath: string }[];
  posters: { filePath: string }[];
};

export type GetPersonDetailsResponse = PersonDetails;

export type GetPersonMovieCreditsResponse = { cast: MovieItem[]; crew: MovieItem[] };

export type ServerPerson = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: null | string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

export type ServerMovieItem = ServerBaseMovieData & {
  genre_ids: number[];
};

export type ServerMovieDetails = ServerBaseMovieData & ServerAdditionalMovieData;

export type ServerMovieCredits = {
  cast: ServerCast[];
  crew: ServerCrew[];
};

type ServerBaseMovieData = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type ServerAdditionalMovieData = {
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  runtime: number;
  status: string;
  origin_country: string[];
};

type ServerCast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type ServerCrew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};
