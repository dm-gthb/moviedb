import { Fragment } from 'react/jsx-runtime';
import { useParams } from 'react-router';
import { appRoute } from '../../../services/router.service';
import { TeamItems } from '../../../services/movies/movies.categorize.service';
import { Card, CardLink, CardSection } from '../movie-info-card/movie-info-card';
import { PersonLink } from '../../person/person-link/person-link';

export function MovieTeamCard({ items }: { items: TeamItems }) {
  const { id: movieId } = useParams();
  return (
    <Card>
      {items.map(({ jobTitle, persons }) => (
        <CardSection title={jobTitle} key={jobTitle}>
          {persons.map(({ id, name, profilePath }, i) => (
            <Fragment key={id}>
              <PersonLink id={id} name={name} profilePath={profilePath} />
              {i !== persons.length - 1 && ', '}
            </Fragment>
          ))}
        </CardSection>
      ))}
      <CardLink
        to={`${appRoute.movie}/${movieId}${appRoute.cast}`}
        className="dark:hover:decoration-gray-400"
      >
        → Full Cast & Crew
      </CardLink>
    </Card>
  );
}
