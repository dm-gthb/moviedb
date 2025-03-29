import { PersonBase } from '../person/person.types';

export type MovieItem = {
  backdropPath: string | null;
  id: number;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  genreIds: number[];
  originalLanguage?: string;
  originalTitle?: string;
  popularity?: number;
  voteAverage?: number;
  voteCount?: number;
};

export type MovieDetails = MovieItem & {
  budget?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  runtime?: number;
  status?: string;
  originCountry?: string[];
};

export type Cast = PersonBase & {
  castId: number;
  character: string;
  creditId: string;
  order: number;
};

export type Crew = PersonBase & {
  creditId: string;
  department: string;
  job: string;
};

export type MovieCredits = {
  cast: Cast[];
  crew: Crew[];
};

export type ListItemMovie = {
  backdropPath: string | null;
  id: number;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  genreIds: number[];
};

export type ListItem = {
  id: string;
  type: 'favorite' | 'watchlist';
  movieId: number;
  ownerId: string;
  movie: ListItemMovie;
};

export type Rating = {
  id: string;
  movieId: number;
  ownerId: string;
  rating: number;
  movie: ListItemMovie;
};
