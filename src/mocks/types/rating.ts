export type RatingMovie = {
  backdropPath: string | null;
  id: number;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  genreIds: number[];
};

export type Rating = {
  id: string;
  movieId: number;
  ownerId: string;
  rating: number;
  movie: RatingMovie;
};
