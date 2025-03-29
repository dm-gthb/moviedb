import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useMovieDetails } from '../../queries/movies.queries';
import { ListItemButtons } from '../../components/movies/list-item-buttons/list-item-buttons';
import { MoviePoster } from '../../components/movies/movie-poster/movie-poster';
import { genresMap } from '../../services/movies/movies.constants.service';
import { InfoGrid } from '../../components/movies/info-grid/info-grid';
import { getCategorizedMovieData } from '../../services/movies/movie-categorized-data.service';
import { createBackdropSrc } from '../../services/image/image.service';

export function MoviePage() {
  const { id: paramsId } = useParams();
  const queries = useMovieDetails({ movieId: paramsId ?? '' });
  const { pathname } = useLocation();
  const [movie, credits] = queries;
  const isPendingDetails = movie.isPlaceholderData || credits.isPending;

  const categorizedMovieData =
    movie.isSuccess && credits.isSuccess && !isPendingDetails
      ? getCategorizedMovieData({ ...movie.data, ...credits.data })
      : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (movie.isPending) {
    return <LoadingPage />;
  }

  if (movie.isSuccess) {
    const { title, releaseDate, overview, genreIds, posterPath, backdropPath } =
      movie.data;

    return (
      <>
        <div className="relative bg-gray-900 py-20 xl:py-24 dark:bg-black">
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-cover bg-center opacity-20 dark:opacity-25"
            style={{
              backgroundImage: backdropPath
                ? `url(${createBackdropSrc(backdropPath)})`
                : 'none',
            }}
          />
          <section className="relative z-30 mx-auto max-w-7xl px-8 text-gray-50">
            <div className="flex gap-10 md:gap-14">
              <div className="hidden w-[180px] shrink-0 overflow-hidden rounded sm:block md:w-[250px]">
                <MoviePoster posterPath={posterPath} movieTitle={title} />
              </div>
              <div className="flex flex-col justify-center gap-6">
                <div>
                  <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:max-w-[70%] lg:text-6xl">
                    {title}
                  </h1>
                  <div>
                    <span>{releaseDate && `${releaseDate?.slice(0, 4)}`}</span>
                    {releaseDate && genreIds?.length > 0 && ' • '}
                    {genreIds?.length > 0 && (
                      <span>{genreIds.map((id) => genresMap[id]).join(', ')}</span>
                    )}
                  </div>
                </div>
                <p>{overview}</p>
                <ListItemButtons movie={movie.data} size="large" />
              </div>
            </div>
          </section>
        </div>
        <section className="mx-auto max-w-7xl p-8">
          <h2 className="sr-only">Movie Details</h2>
          <InfoGrid isLoading={isPendingDetails} dataItems={categorizedMovieData} />
        </section>
      </>
    );
  }
}

function LoadingPage() {
  return (
    <>
      <div className="animate-pulse bg-gray-100 py-20 shadow xl:py-24 dark:bg-gray-800">
        <div className="relative z-30 mx-auto max-w-7xl px-8 text-gray-50">
          <div className="aspect-[2/3] w-[180px] md:w-[250px]" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl p-8">
        <InfoGrid isLoading />
      </div>
    </>
  );
}
