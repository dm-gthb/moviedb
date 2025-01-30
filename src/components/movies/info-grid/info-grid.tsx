import { InfoItems } from '../../../services/movies/movie-categorized-data.service';
import { InfoGridCard, LoadingInfoGridCard } from './info-grid-card';

export function InfoGrid({
  isLoading,
  dataItems,
}: {
  isLoading: boolean;
  dataItems?: InfoItems[];
}) {
  const containerClassname = 'grid gap-6 grid-cols-1 lg:grid-cols-3';

  if (isLoading) {
    return (
      <div className={containerClassname} aria-label="loading">
        {new Array(3).fill('').map((_el, i) => (
          <LoadingInfoGridCard key={i} />
        ))}
      </div>
    );
  }

  if (dataItems) {
    return (
      <div className={containerClassname}>
        {dataItems.map((items, i) => (
          <InfoGridCard key={i} items={items} />
        ))}
      </div>
    );
  }

  return null;
}
