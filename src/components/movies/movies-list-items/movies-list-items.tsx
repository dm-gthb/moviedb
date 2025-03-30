import { ReactNode } from 'react';
import { useMovieListItems } from '../../../queries/list-items.queries';
import { MoviesGrid } from '../movies-grid/movies-grid';

export function MoviesListItems({
  listType,
  noListItemsInfo = 'no items found',
}: {
  listType: 'favorites' | 'watchlist';
  noListItemsInfo?: ReactNode;
}) {
  const { data, isPending } = useMovieListItems();
  const listItems = data?.[listType] ?? [];

  if (!isPending && !listItems.length) {
    return <p>{noListItemsInfo}</p>;
  }

  return (
    <MoviesGrid isPending={isPending} movies={listItems.map((item) => item.movie)} />
  );
}
