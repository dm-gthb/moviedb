import { useQueryClient } from '@tanstack/react-query';
import { personQueries } from '../../../queries/person.queries';
import { prefetchPersonImage } from '../../../services/image/image.service';
import { PrefetchLink } from '../../ui/prefetch-link/prefetch-link';
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
  const prefetchPerson = () => {
    queryClient.prefetchQuery(personQueries.person(id.toString()));
    queryClient.prefetchQuery(personQueries.movieCredits(id.toString()));
    prefetchPersonImage(profilePath);
  };

  return (
    <PrefetchLink to={`${appRoute.person}/${id}`} onPrefetch={prefetchPerson}>
      {name}
    </PrefetchLink>
  );
}
