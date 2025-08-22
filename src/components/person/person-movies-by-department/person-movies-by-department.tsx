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

  if (departmentMovies.length === 1) {
    const { department, movies } = departmentMovies[0];
    return (
      <div>
        <div className="border-b border-gray-200 py-4 dark:border-gray-800">
          <DepartmentHeader department={department} moviesLength={movies.length} />
        </div>

        <div className="-mx-4">
          <DepartmentMovies
            department={department}
            movies={movies}
            prefetchMovie={prefetchMovie}
          />
        </div>
      </div>
    );
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
              <DepartmentHeader department={department} moviesLength={movies.length} />
            </TabTrigger>
          ))}
        </TabList>
      </ScrollableContainer>

      <TabPanels className="-mx-4">
        {departmentMovies.map(({ department, movies }) => (
          <TabPanel key={department}>
            <DepartmentMovies
              department={department}
              movies={movies}
              prefetchMovie={prefetchMovie}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

function DepartmentHeader({
  department,
  moviesLength,
}: {
  department: string;
  moviesLength: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-lg font-medium">{department}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {moviesLength} {moviesLength === 1 ? 'movie' : 'movies'}
      </span>
    </div>
  );
}

function DepartmentMovies({
  department,
  movies,
  prefetchMovie,
}: {
  department: string;
  movies: PersonMovieCredit[];
  prefetchMovie: (movie: PersonMovieCredit) => void;
}) {
  return (
    <div className="px-4">
      {movies.map((movie, index) => {
        const label = department === 'Acting' ? movie.character : movie.job;
        return (
          <div
            key={movie.id + (label || '')}
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
              {label ? (
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {department === 'Acting' ? (
                    <span>
                      as <span className="capitalize">{label}</span>
                    </span>
                  ) : (
                    <span className="capitalize">{label}</span>
                  )}
                </div>
              ) : null}
            </PrefetchLink>
          </div>
        );
      })}
    </div>
  );
}
