import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useMovieDetails } from '../../queries/movies.queries';
import { ListItemButtons } from '../../components/movies/list-item-buttons/list-item-buttons';
import { MoviePoster } from '../../components/movies/movie-poster/movie-poster';
import { genresMap } from '../../services/movies/movies.constants.service';
import { InfoGrid } from '../../components/movies/info-grid/info-grid';
import { getCategorizedMovieData } from '../../services/movies/movie-categorized-data.service';
import { imageUrl, BackdropSize } from '../../services/movies/movies.constants.service';

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
        <div className="relative py-20 xl:py-24 dark:bg-black bg-gray-900">
          <div
            className="bg-cover bg-center opacity-20 dark:opacity-25 absolute left-0 right-0 top-0 bottom-0 w-full h-full "
            style={{
              backgroundImage: `url(${`${imageUrl}/${BackdropSize.w780}${backdropPath}`})`,
            }}
          />
          <section className="max-w-7xl mx-auto relative z-30 text-gray-50 px-8">
            <div className="flex gap-10 md:gap-14">
              <div className="w-[180px] md:w-[250px] shrink-0 hidden sm:block rounded overflow-hidden">
                <MoviePoster posterPath={posterPath} movieTitle={title} />
              </div>
              <div className="flex flex-col gap-6 justify-center">
                <div>
                  <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:max-w-[70%] mb-2">
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
        <section className="max-w-7xl mx-auto p-8">
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
      <div className="py-20 xl:py-24 bg-gray-100 dark:bg-gray-800 animate-pulse shadow">
        <div className="max-w-7xl mx-auto relative z-30 text-gray-50 px-8">
          <div className="w-[180px] md:w-[250px] aspect-[2/3]" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <InfoGrid isLoading />
      </div>
    </>
  );
}
