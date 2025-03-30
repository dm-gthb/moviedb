import { useQueryClient } from '@tanstack/react-query';
import { personQueries } from '../../../queries/person.queries';
import { prefetchPersonImage } from '../../../services/image/image.service';
import { CardLink } from './info-card';
import { appRoute } from '../../../services/router.service';

export function PersonLink({
  id,
  name,
  profilePath,
}: {
  id: number;
  name: string;
  profilePath: string | null;
}) {
  const queryClient = useQueryClient();
  const prefetchPerson = (id: number, profilePath: string | null) => {
    queryClient.prefetchQuery(personQueries.person(id.toString()));
    prefetchPersonImage(profilePath);
  };

  return (
    <CardLink
      to={`${appRoute.person}/${id}`}
      onMouseEnter={() => prefetchPerson(id, profilePath)}
      onFocus={() => prefetchPerson(id, profilePath)}
    >
      {name}
    </CardLink>
  );
}
