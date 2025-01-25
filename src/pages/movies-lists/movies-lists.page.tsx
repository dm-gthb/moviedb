import { MoviesListItems } from '../../components/movies/movies-list-items/movies-list-items';
import {
  Tabs,
  TabList,
  TabTrigger,
  TabPanels,
  TabPanel,
} from '../../components/shared/tabs/tabs';

export function MoviesLists() {
  const tabClassName =
    'py-2 data-[state=active]:underline hover:underline underline-offset-8';

  return (
    <div className="max-w-7xl mx-auto px-8 pt-4 pb-10">
      <h1 className="sr-only">My Movies</h1>
      <Tabs>
        <TabList className="flex gap-4 mb-8">
          <TabTrigger className={tabClassName}>Watchlist</TabTrigger>
          <TabTrigger className={tabClassName}>Favorites</TabTrigger>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MoviesListItems
              listType="watchlist"
              noListItemsInfo="You haven't added any movies to your watchlist."
            />
          </TabPanel>
          <TabPanel>
            <MoviesListItems
              listType="favorites"
              noListItemsInfo="You haven't added any favourite movies."
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
