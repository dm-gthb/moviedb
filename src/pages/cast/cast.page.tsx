import { useParams } from 'react-router';
import { useMovieDetails } from '../../queries/movies.queries';
import { getAllCrew } from '../../services/movies/movies.categorize.service';
import { MovieCastCard } from '../../components/movies/movie-cast/movie-cast-card';
import { MovieCrewCard } from '../../components/movies/movie-cast/movie-crew-card';
import { MovieBanner } from '../../components/movies/movie-banner/movie-banner';
import { MovieInfoHeader } from '../../components/movies/movie-info-header/movie-info-header';

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

    return (
      <div className="relative min-h-[calc(100vh-84px)] pb-20 pt-10">
        <div className="absolute inset-0 hidden md:max-h-[535px] lg:block xl:max-h-[567px]">
          <MovieBanner backdropPath={movie.data.backdropPath} />
        </div>
        <section className="relative z-30 mx-auto max-w-7xl px-8 md:mb-4 lg:text-gray-50">
          <MovieInfoHeader movie={movie.data} isLink />
        </section>
        <section className="mx-auto max-w-7xl p-8">
          <h2 className="sr-only">Cast and Crew</h2>
          <div className="grid gap-8 lg:auto-cols-[minmax(0,1fr)] lg:grid-flow-col">
            <MovieCastCard cast={cast} />
            <MovieCrewCard allCrew={allCrew} />
          </div>
        </section>
      </div>
    );
  }
}
