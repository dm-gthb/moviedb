import { Link, useParams } from 'react-router';
import { useMovieDetails } from '../../queries/movies.queries';
import { getAllCrew } from '../../services/movies/movie-categorized-data.service';
import { createBackdropSrc } from '../../services/image/image.service';
import { appRoute } from '../../services/router.service';
import { genresMap } from '../../services/movies/movies.constants.service';
import { FullCastCard } from '../../components/movies/info-grid/full-cast-card';
import { FullCrewCard } from '../../components/movies/info-grid/full-crew-card';

export function CastPage() {
  const { movieId } = useParams();
  const queries = useMovieDetails({ movieId: movieId! });
  const [movie, credits] = queries;

  if (movie.isPending || credits.isPending) {
    return (
      <div
        aria-label="loading"
        className={`h-[calc(100vh-84px)] animate-pulse bg-gray-600 shadow md:h-[535px] xl:h-[567px] xl:py-24`}
      />
    );
  }

  if (movie.isSuccess && credits.isSuccess) {
    const { cast, crew } = credits.data;
    const allCrew = getAllCrew(crew);

    const { title, releaseDate, genreIds, backdropPath } = movie.data;

    return (
      <div className="relative min-h-[calc(100vh-84px)] pb-20 pt-10">
        <div
          className={`md:max-h-[535px}] absolute inset-0 hidden lg:block xl:max-h-[567px] ${backdropPath ? 'bg-black' : 'bg-gray-600'} dark:bg-black`}
        />
        <div
          className="absolute inset-0 hidden w-full bg-cover bg-center opacity-35 md:max-h-[535px] lg:block xl:max-h-[567px] dark:opacity-30"
          style={{
            backgroundImage: backdropPath
              ? `url(${createBackdropSrc(backdropPath)})`
              : 'none',
          }}
        />
        <section className="relative z-30 mx-auto max-w-7xl px-8 md:mb-4 lg:text-gray-50">
          <Link
            to={`${appRoute.movie}/${movieId}`}
            className="transition-opacity hover:opacity-85"
          >
            <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Link>
          {/* todo date + genre component */}
          <div>
            <span>{releaseDate && `${releaseDate?.slice(0, 4)}`}</span>
            {releaseDate && genreIds?.length > 0 && ' • '}
            {genreIds?.length > 0 && (
              <span>{genreIds.map((id) => genresMap[id]).join(', ')}</span>
            )}
          </div>
        </section>
        <section className="mx-auto max-w-7xl p-8">
          <h2 className="sr-only">Cast and Crew</h2>
          <div className="grid gap-8 lg:auto-cols-[minmax(0,1fr)] lg:grid-flow-col">
            <FullCastCard cast={cast} />
            <FullCrewCard allCrew={allCrew} />
          </div>
        </section>
      </div>
    );
  }
}
