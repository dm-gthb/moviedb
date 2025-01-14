import { MoviesListItems } from '../../components/movies/movies-list-items/movies-list-items';
import { Tabs, TabTrigger, TabContent } from '../../components/shared/tabs/tabs';

const tabs: Array<{
  id: 'favorites' | 'watchlist' | 'rated';
  label: string;
  noItemsNote: string;
}> = [
  {
    id: 'favorites',
    label: 'Favorites',
    noItemsNote: `You haven't added any favourite movies.`,
  },
  {
    id: 'watchlist',
    label: 'Watchlist',
    noItemsNote: `You haven't added any movies to your watchlist.`,
  },
  {
    id: 'rated',
    label: 'My ratings',
    noItemsNote: `You haven't added any ratings.`,
  },
];

export function MoviesLists() {
  return (
    <>
      <h1>FavoritesPage</h1>
      <Tabs defaultValue={tabs[0].id}>
        {tabs.map(({ id, label }) => (
          <TabTrigger key={id} value={id}>
            {label}
          </TabTrigger>
        ))}
        {tabs.map(({ id, noItemsNote }) => (
          <TabContent key={id} value={id}>
            <MoviesListItems listType={id} noListItemsInfo={<p>{noItemsNote}</p>} />
          </TabContent>
        ))}
      </Tabs>
    </>
  );
}
