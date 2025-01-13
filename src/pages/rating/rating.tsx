import { MoviesListItems } from '../../components/movies/movies-list-items/movies-list-items';

export function RatingPage() {
  return (
    <>
      <h1>RatingPage</h1>
      <MoviesListItems
        listType="rated"
        noListItemsInfo={<p>You haven't added any ratings.</p>}
      />
    </>
  );
}
