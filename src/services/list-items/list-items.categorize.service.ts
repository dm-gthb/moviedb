import { MovieListItem, MovieListItems } from './list-items.types.service';

export function getCategorizedListItems(listItems: MovieListItem[]): MovieListItems {
  const categorizedListItems = listItems.reduce(
    (
      result: { favorites: MovieListItem[]; watchlist: MovieListItem[] },
      listItem: MovieListItem,
    ) => {
      if (listItem.type === 'favorites') {
        result.favorites.push(listItem);
      }

      if (listItem.type === 'watchlist') {
        result.watchlist.push(listItem);
      }

      return result;
    },
    { favorites: [], watchlist: [] },
  );

  const sortByUpdateTime = (a: MovieListItem, b: MovieListItem) =>
    new Date(a.updateTime) > new Date(b.updateTime) ? -1 : 1;

  return {
    favorites: categorizedListItems.favorites.sort(sortByUpdateTime),
    watchlist: categorizedListItems.watchlist.sort(sortByUpdateTime),
  };
}
