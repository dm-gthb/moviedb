import { MoviesListItems } from '../../components/movies/movies-list-items/movies-list-items';

export function FavoritesPage() {
  return (
    <>
      <h1>FavoritesPage</h1>
      <MoviesListItems
        listType="favorites"
        noListItemsInfo={<p>You haven't added any favourite movies.</p>}
      />
    </>
  );
}
