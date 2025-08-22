import { PersonBase } from './person';

export type BaseMovieData = {
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

export type MovieItem = BaseMovieData & {
  genre_ids: number[];
};

export type AdditionalMovieData = {
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

export type MovieDetails = BaseMovieData & AdditionalMovieData;

export type MovieCredits = {
  cast: Array<
    PersonBase & {
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }
  >;
  crew: Array<
    PersonBase & {
      credit_id: string;
      department: string;
      job: string;
    }
  >;
};

export type PersonMovieCredit = MovieItem & {
  department?: string;
  character?: string;
  job?: string;
};
