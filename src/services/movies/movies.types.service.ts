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

type Cast = {
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string | null;
  castId: number;
  character: string;
  creditId: string;
  order: number;
};

type Crew = {
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string | null;
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
