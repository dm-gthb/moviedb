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

export type PersonBase = {
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  popularity: number;
  profilePath: string | null;
};

export type PersonDetails = PersonBase & {
  alsoKnownsAs: string[];
  biography: string;
  birthday: string;
  deathday: string;
  homepage: null | string;
  imdbId: string;
  placeOfBirth: string;
};
