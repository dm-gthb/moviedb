import { MoviesListItems } from '../../components/movies/movies-list-items/movies-list-items';

export function WatchlistPage() {
  return (
    <>
      <h1>WatchlistPage</h1>
      <MoviesListItems
        listType="watchlist"
        noListItemsInfo={<p>You haven't added any movies to your watchlist.</p>}
      />
    </>
  );
}
