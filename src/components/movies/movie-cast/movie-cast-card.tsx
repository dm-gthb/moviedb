import { Cast } from '../../../services/movies/movies.types.service';
import { Card, CardSection } from '../movie-info-card/movie-info-card';
import { PersonLink } from '../../person/person-link/person-link';

export function MovieCastCard({ cast }: { cast: Cast[] }) {
  return (
    <Card>
      {cast.length > 0 ? (
        <CardSection title="Starring">
          {cast.map(({ id, name, character, profilePath }) => (
            <span key={id + character} className="block">
              {character && `${character}: `}
              <PersonLink id={id} name={name} profilePath={profilePath} />
            </span>
          ))}
        </CardSection>
      ) : (
        <span>No Cast Data</span>
      )}
    </Card>
  );
}
