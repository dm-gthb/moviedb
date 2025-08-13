import { useQueryClient } from '@tanstack/react-query';
import { Tabs, TabList, TabTrigger, TabPanels, TabPanel } from '../../ui/tabs/tabs';
import { ScrollableContainer } from '../../ui/scrollable-container/scrollable-container';
import { PersonMovieCredit } from '../../../services/movies/movies.types.service';
import { appRoute } from '../../../services/router.service';
import { PrefetchLink } from '../../ui/prefetch-link/prefetch-link';
import { movieQueries } from '../../../queries/movies.queries';
import {
  prefetchBackdropImage,
  prefetchPosterImage,
} from '../../../services/image/image.service';

export function PersonMoviesByDepartment({
  departmentMovies,
}: {
  departmentMovies: Array<{
    department: string;
    movies: PersonMovieCredit[];
  }>;
}) {
  const queryClient = useQueryClient();

  const prefetchMovie = (movie: PersonMovieCredit) => {
    queryClient.prefetchQuery(movieQueries.details(movie.id.toString()));
    queryClient.prefetchQuery(movieQueries.credits(movie.id.toString()));
    if (movie.backdropPath) {
      prefetchBackdropImage(movie.backdropPath);
    }
    if (movie.posterPath) {
      prefetchPosterImage(movie.posterPath);
    }
  };

  if (departmentMovies.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <Tabs>
      <ScrollableContainer
        ariaLabel="Movie department tabs"
        className="border-b border-gray-200 dark:border-gray-800"
      >
        <TabList className="flex gap-10">
          {departmentMovies.map(({ department, movies }) => (
            <TabTrigger
              key={department}
              className="relative shrink-0 py-4 text-left data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-gray-900 data-[state=inactive]:hover:text-gray-700 dark:data-[state=active]:text-gray-100 dark:data-[state=inactive]:text-gray-400 dark:data-[state=active]:after:bg-gray-100 dark:data-[state=inactive]:hover:text-gray-100"
            >
              <div className="flex flex-col gap-1">
                <span className="text-lg font-medium">{department}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
                </span>
              </div>
            </TabTrigger>
          ))}
        </TabList>
      </ScrollableContainer>

      <TabPanels className="-mx-4">
        {departmentMovies.map(({ department, movies }) => (
          <TabPanel key={department}>
            <div className="px-4">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`person-movie-credit border-t hover:border-gray-50 hover:dark:border-gray-900 ${index === 0 ? 'border-transparent' : 'border-gray-200 dark:border-gray-800'}`}
                  style={{
                    borderTopColor: undefined,
                  }}
                >
                  <PrefetchLink
                    to={`${appRoute.movie}/${movie.id}`}
                    className="-mx-4 block rounded bg-white px-4 py-4 no-underline transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900"
                    onPrefetch={() => prefetchMovie(movie)}
                  >
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {movie.title}
                      </h4>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        {movie.releaseDate && new Date(movie.releaseDate).getFullYear()}
                      </div>
                    </div>
                    {(department === 'Acting' && movie.character) ||
                    (department !== 'Acting' && movie.job) ? (
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {department === 'Acting' && movie.character ? (
                          <span>
                            as <span className="capitalize">{movie.character}</span>
                          </span>
                        ) : department !== 'Acting' && movie.job ? (
                          <span className="capitalize">{movie.job}</span>
                        ) : null}
                      </div>
                    ) : null}
                  </PrefetchLink>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
