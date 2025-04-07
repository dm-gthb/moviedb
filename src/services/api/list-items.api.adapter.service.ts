import {
  MovieListItem,
  MovieListItemData,
  MovieListItemType,
} from '../list-items/list-items.types.service';
import { MovieListItemDoc } from './list-items.api.types.service';

export function transformListItemToServer({
  movie,
  type,
  userId,
}: {
  movie: MovieListItemData;
  type: MovieListItemType;
  userId: string;
}) {
  return {
    fields: {
      type: { stringValue: type },
      movieId: { integerValue: movie.id.toString() },
      ownerId: { stringValue: userId },
      movie: {
        mapValue: {
          fields: {
            id: { integerValue: movie.id.toString() },
            title: { stringValue: movie.title ?? '' },
            releaseDate: { stringValue: movie.releaseDate ?? '' },
            backdropPath: movie.backdropPath
              ? { stringValue: movie.backdropPath }
              : { nullValue: null },
            posterPath: movie.posterPath
              ? { stringValue: movie.posterPath }
              : { nullValue: null },
            overview: { stringValue: movie.overview ?? '' },
            genreIds: {
              arrayValue: {
                values: movie.genreIds.map((id) => ({
                  integerValue: id.toString(),
                })),
              },
            },
          },
        },
      },
    },
  };
}

export function transformListItemToClient(doc: MovieListItemDoc): MovieListItem {
  const { type, movieId, ownerId, movie } = doc.fields;
  return {
    id: doc.name.split('/').pop() ?? '',
    updateTime: doc.updateTime,
    createTime: doc.createTime,
    type: type.stringValue,
    movieId: Number(movieId.integerValue),
    ownerId: ownerId.stringValue,
    movie: {
      id: Number(movie.mapValue.fields.id.integerValue),
      title: movie.mapValue.fields.title.stringValue,
      releaseDate: movie.mapValue.fields.releaseDate.stringValue,
      backdropPath: movie.mapValue.fields.backdropPath?.stringValue ?? null,
      posterPath: movie.mapValue.fields.posterPath?.stringValue ?? null,
      overview: movie.mapValue.fields.overview.stringValue,
      genreIds:
        movie.mapValue.fields.genreIds.arrayValue.values?.map(
          ({ integerValue }: { integerValue: string }) => Number(integerValue),
        ) ?? [],
    },
  };
}
