import { InfoItems } from '../../../services/movies/movie-categorized-data.service';
import { InfoGridCard, LoadingInfoGridCard } from './info-grid-card';

export function InfoGrid({
  isLoading,
  dataItems,
}: {
  isLoading: boolean;
  dataItems?: InfoItems[];
}) {
  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-3 gap-6" aria-label="loading">
        {new Array(3).fill('').map((_el, i) => (
          <LoadingInfoGridCard key={i} />
        ))}
      </div>
    );
  }

  if (dataItems) {
    return (
      <div className="grid lg:grid-cols-3 gap-6">
        {dataItems.map((items, i) => (
          <InfoGridCard key={i} items={items} />
        ))}
      </div>
    );
  }

  return null;
}
