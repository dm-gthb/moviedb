import { queryOptions, useQueries } from '@tanstack/react-query';
import api from '../services/api/api.service';

const personQueryConfig = {
  cacheTime: 1000 * 60 * 60,
  staleTime: 1000 * 60 * 60,
};

export const personQueries = {
  person: (personId: string) =>
    queryOptions({
      queryKey: ['person', { personId }],
      queryFn: () => api.getPerson({ personId }),
      ...personQueryConfig,
    }),

  movieCredits: (personId: string) =>
    queryOptions({
      queryKey: ['person', 'movieCredits', { personId }],
      queryFn: () => api.getPersonMovieCredits({ personId }),
      ...personQueryConfig,
    }),
};

export const usePersonAndMovieCredits = ({ personId }: { personId: string }) => {
  return useQueries({
    queries: [personQueries.person(personId), personQueries.movieCredits(personId)],
  });
};
