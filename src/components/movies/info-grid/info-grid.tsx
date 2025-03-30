import { CategorizedData } from '../../../services/movies/movie-categorized-data.service';
import { LoadingCard } from './info-card';
import { TeamCard } from './team-card';
import { TechCard } from './tech-card';

export function InfoGrid({
  isLoading,
  dataItems,
}: {
  isLoading: boolean;
  dataItems?: CategorizedData;
}) {
  const containerClassname =
    'flex flex-col lg:grid gap-6 lg:auto-cols-[minmax(0,1fr)] lg:grid-flow-col';

  if (isLoading) {
    return (
      <div className={containerClassname} aria-label="loading">
        {new Array(3).fill('').map((_el, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (dataItems) {
    const { general, team, specs } = dataItems;
    return (
      <div className={containerClassname}>
        {general.length > 0 && <TechCard items={general} />}
        {team.length > 0 && <TeamCard items={team} />}
        {specs.length > 0 && <TechCard items={specs} />}
      </div>
    );
  }

  return null;
}
