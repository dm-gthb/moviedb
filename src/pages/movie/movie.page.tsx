import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useMovieDetails, useMovieImages } from '../../queries/movies.queries';
import { MovieListItemButtons } from '../../components/movies/movie-list-item-buttons/movie-list-item-buttons';
import { MoviePoster } from '../../components/movies/movie-poster/movie-poster';
import { genresMap } from '../../services/movies/movies.constants.service';
import { MovieInfoGrid } from '../../components/movies/movie-info-grid/movie-info-grid';
import { getCategorizedMovieData } from '../../services/movies/movies.categorize.service';
import {
  createBackdropSrc,
  createPosterSrc,
  prefetchBackdropImage,
} from '../../services/image/image.service';
import { ModalImageGallery } from '../../components/ui/image-gallery/image-gallery';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { CircularIconButton } from '../../components/ui/buttons/circular-icon-button/circular-icon-button';

export function MoviePage() {
  const { id: paramsId } = useParams();
  const queries = useMovieDetails({ movieId: paramsId ?? '' });
  const { data: images, isSuccess: isImagesLoadingSuccess } = useMovieImages({
    movieId: paramsId!,
  });
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

  if (isImagesLoadingSuccess) {
    prefetchBackdropImage(images.backdrops?.[0]?.filePath);
  }

  if (movie.isPending) {
    return <LoadingPage />;
  }

  if (movie.isSuccess) {
    const { title, releaseDate, overview, genreIds, posterPath, backdropPath } =
      movie.data;

    return (
      <>
        <div
          className={`relative py-20 xl:py-24 ${backdropPath ? 'bg-black' : 'bg-gray-600'} dark:bg-black`}
        >
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center opacity-35 dark:opacity-30"
            style={{
              backgroundImage: backdropPath
                ? `url(${createBackdropSrc(backdropPath)})`
                : 'none',
            }}
          />
          <section className="relative z-30 mx-auto max-w-7xl px-8 text-gray-50">
            <div className="flex gap-10 md:gap-14">
              <div className="relative hidden w-[180px] shrink-0 overflow-hidden rounded transition hover:scale-105 sm:block md:w-[250px]">
                <MoviePoster posterPath={posterPath} movieTitle={title} />
                {posterPath && (
                  <ModalImageGallery
                    galleryTitle={`${title} movie poster`}
                    srcList={[createPosterSrc(posterPath)]}
                    trigger={
                      <button className="absolute inset-0 h-full w-full">
                        <span className="sr-only">Show movie poster image</span>
                      </button>
                    }
                  />
                )}
              </div>
              <div className="flex flex-col justify-center gap-6">
                <div>
                  <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
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
                <div className="flex gap-3">
                  <MovieListItemButtons movie={movie.data} variant="circular" />
                  {backdropPath && (
                    <ModalImageGallery
                      galleryTitle={`${title} movie images`}
                      srcList={images?.backdrops.map(({ filePath }) =>
                        createBackdropSrc(filePath),
                      )}
                      trigger={
                        <CircularIconButton
                          icon={PhotoIcon}
                          label="Open movie image gallery"
                        />
                      }
                    />
                  )}
                </div>
                <p>{overview}</p>
              </div>
            </div>
          </section>
        </div>
        <section className="mx-auto max-w-7xl p-8">
          <h2 className="sr-only">Movie Details</h2>
          <MovieInfoGrid isLoading={isPendingDetails} dataItems={categorizedMovieData} />
        </section>
      </>
    );
  }
}

function LoadingPage() {
  return (
    <>
      <div className="animate-pulse bg-gray-100 py-20 shadow dark:bg-gray-800 xl:py-24">
        <div className="relative z-30 mx-auto max-w-7xl px-8 text-gray-50">
          <div className="aspect-[2/3] w-[180px] md:w-[250px]" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl p-8">
        <MovieInfoGrid isLoading />
      </div>
    </>
  );
}
