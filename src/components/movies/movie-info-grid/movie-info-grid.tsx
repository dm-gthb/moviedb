import { CategorizedData } from '../../../services/movies/movies.categorize.service';
import { LoadingCard } from '../movie-info-card/movie-info-card';
import { MovieTeamCard } from './movie-team-card';
import { MovieTechCard } from './movie-tech-card';

export function MovieInfoGrid({
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
        {general.length > 0 && <MovieTechCard items={general} />}
        {team.length > 0 && <MovieTeamCard items={team} />}
        {specs.length > 0 && <MovieTechCard items={specs} />}
      </div>
    );
  }

  return null;
}
