import { ReactNode } from 'react';
import { ListType } from '../../../services/api/api.types.service';
import { useListItems } from '../../../queries/list-items.queries';
import { MoviesListItem } from './movies-list-item';

export function MoviesListItems({
  listType,
  noListItemsInfo = 'no items found',
}: {
  listType: ListType;
  noListItemsInfo?: ReactNode;
}) {
  const { data, isPending } = useListItems();
  const listItems = data?.[listType] ?? [];

  if (isPending) {
    return <p>...loading</p>;
  }

  if (!listItems.length) {
    return <div>{noListItemsInfo}</div>;
  }

  return (
    <ul>
      {listItems.map((listItem) => (
        <li key={listItem.id}>
          <MoviesListItem movie={listItem.movie} />
        </li>
      ))}
    </ul>
  );
}
