import { ReactNode } from 'react';
import { ListType } from '../../../services/api/api.types.service';
import { useListItems } from '../../../queries/list-items.queries';
import { MoviesGrid } from '../movies-grid/movies-grid';

export function MoviesListItems({
  listType,
  noListItemsInfo = 'no items found',
}: {
  listType: ListType;
  noListItemsInfo?: ReactNode;
}) {
  const { data, isPending } = useListItems();
  const listItems = data?.[listType] ?? [];

  if (!isPending && !listItems.length) {
    return <div>{noListItemsInfo}</div>;
  }

  return (
    <MoviesGrid isPending={isPending} movies={listItems.map((item) => item.movie)} />
  );
}
