export type MovieListItemType = 'favorites' | 'watchlist';

export type MovieListItem = {
  id: string;
  type: MovieListItemType;
  movieId: number;
  ownerId: string;
  movie: MovieListItemData;
  createTime: string;
  updateTime: string;
};

export type MovieListItemData = {
  backdropPath: string | null;
  id: number;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  genreIds: number[];
};

export type MovieListItems = {
  favorites: MovieListItem[];
  watchlist: MovieListItem[];
};
