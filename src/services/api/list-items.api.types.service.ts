import {
  MovieListItemData,
  MovieListItemType,
} from '../list-items/list-items.types.service';

export type AddMovieToListBaseParams = {
  movie: MovieListItemData;
  token: string;
  userId: string;
};

export type DeleteMovieFromListParams = {
  listItemId: string;
  token: string;
  userId: string;
};

export type AddMovieToListParams = AddMovieToListBaseParams & { type: MovieListItemType };

// https://firebase.google.com/docs/firestore/reference/rest/v1/Value
export type MovieListItemDoc = {
  createTime: string;
  updateTime: string;
  name: string;
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
          backdropPath: { stringValue: string };
          posterPath: { stringValue: string };
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
