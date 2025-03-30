export type MovieListItemData = {
  backdropPath: string | null;
  id: number;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  genreIds: number[];
};

export type MovieListItem = {
  id: string;
  type: 'favorite' | 'watchlist';
  movieId: number;
  ownerId: string;
  movie: MovieListItemData;
};
