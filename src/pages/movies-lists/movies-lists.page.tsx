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
];

export function MoviesLists() {
  return (
    <div className="max-w-7xl mx-auto px-8 pt-4 pb-10">
      <h1 className="sr-only">My Movies</h1>
      <Tabs defaultValue={tabs[0].id}>
        <div className="flex gap-4 mb-8">
          {tabs.map(({ id, label }) => (
            <TabTrigger
              key={id}
              value={id}
              label={label}
              className="py-2 data-[state=active]:underline hover:underline underline-offset-8"
            />
          ))}
        </div>
        {tabs.map(({ id, noItemsNote }) => (
          <TabContent key={id} value={id}>
            <MoviesListItems listType={id} noListItemsInfo={<p>{noItemsNote}</p>} />
          </TabContent>
        ))}
      </Tabs>
    </div>
  );
}
