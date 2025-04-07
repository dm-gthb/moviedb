export type MovieListItemType = 'favorites' | 'watchlist';

export type FirestoreMovieListItem = {
  name: string;
  createTime: string;
  updateTime: string;
  fields: {
    type: { stringValue: MovieListItemType };
    movieId: { integerValue: string };
    ownerId: { stringValue: string };
    movie: {
      mapValue: {
        fields: {
          id: { integerValue: string };
          title: { stringValue: string };
          releaseDate: { stringValue: string };
          backdropPath?: { stringValue: string };
          posterPath?: { stringValue: string };
          overview: { stringValue: string };
          genreIds: {
            arrayValue: {
              values?: { integerValue: string }[];
            };
          };
        };
      };
    };
  };
};
