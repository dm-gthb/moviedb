import { Crew } from '../../../services/movies/movies.types.service';
import { Card, CardSection } from './info-card';
import { PersonLink } from './person-link';

export function FullCrewCard({ allCrew }: { allCrew: Record<string, Crew[]> }) {
  const isNoCrewData = Object.values(allCrew).every((team) => team.length === 0);
  return (
    <Card>
      {isNoCrewData ? (
        <span>No Crew Data</span>
      ) : (
        Object.keys(allCrew).map((department) => (
          <CardSection key={department} title={department}>
            {allCrew[department].map(({ id, name, job, profilePath }) => (
              <span key={id + job} className="block">
                {job && `${job}: `}
                <PersonLink id={id} name={name} profilePath={profilePath} />
              </span>
            ))}
          </CardSection>
        ))
      )}
    </Card>
  );
}
