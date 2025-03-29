import { CategorizedData } from '../../../services/movies/movie-categorized-data.service';
import { TeamInfoCard, LoadingInfoCard, TechInfoCard } from './info-grid-card';

export function InfoGrid({
  isLoading,
  dataItems,
}: {
  isLoading: boolean;
  dataItems?: CategorizedData;
}) {
  const containerClassname = 'grid gap-6 lg:auto-cols-[minmax(0,1fr)] lg:grid-flow-col';

  if (isLoading) {
    return (
      <div className={containerClassname} aria-label="loading">
        {new Array(3).fill('').map((_el, i) => (
          <LoadingInfoCard key={i} />
        ))}
      </div>
    );
  }

  if (dataItems) {
    const { general, team, specs } = dataItems;
    return (
      <div className={containerClassname}>
        {general.length > 0 && <TechInfoCard items={general} />}
        {team.length > 0 && <TeamInfoCard items={team} />}
        {specs.length > 0 && <TechInfoCard items={specs} />}
      </div>
    );
  }

  return null;
}
