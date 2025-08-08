import { useParams } from 'react-router';
import { usePersonAndMovieCredits } from '../../queries/person.queries';
import { createProfileSrc } from '../../services/image/image.service';
import { formatDate } from '../../services/movies/movies.utils.service';
import { MoviesGrid } from '../../components/movies/movies-grid/movies-grid';
import { MovieItem } from '../../services/movies/movies.types.service';
import { ModalImageGallery } from '../../components/ui/image-gallery/image-gallery';

export function PersonPage() {
  const { id } = useParams();
  const [person, credits] = usePersonAndMovieCredits({ personId: id! });

  if (person.isPending) {
    return <LoadingPage />;
  }

  if (person.isSuccess) {
    const { profilePath, name, biography, birthday, placeOfBirth, deathday } =
      person.data;

    return (
      <div className="mx-auto max-w-7xl px-8 pb-10 pt-2">
        <div className="mb-10 flex items-start gap-8">
          {profilePath && (
            <div className="relative mt-1 hidden aspect-[2/3] w-[210px] max-w-[25%] shrink-0 overflow-hidden rounded bg-gray-100 shadow-md transition-transform hover:scale-105 sm:block dark:bg-gray-700">
              <img src={createProfileSrc(profilePath)} alt={name} />
              {profilePath && (
                <ModalImageGallery
                  galleryTitle={`${name} photo`}
                  srcList={[createProfileSrc(profilePath)]}
                  trigger={
                    <button className="absolute inset-0 h-full w-full">
                      <span className="sr-only">Show {name} image</span>
                    </button>
                  }
                />
              )}
            </div>
          )}
          <div>
            <h1 className="mb-3 text-4xl font-bold md:text-5xl">{name}</h1>
            {birthday && <p>Birthdate: {formatDate(birthday)}</p>}
            {placeOfBirth && <p>Birthplace: {placeOfBirth}</p>}
            {deathday && <p>Day of Death: {formatDate(deathday)}</p>}
            <h3 className="mb-2 mt-5 text-2xl font-bold md:text-3xl">Biography</h3>
            <p>{biography ? biography : `No biography found for ${name}.`}</p>
          </div>
        </div>

        <section>
          <h3 className="mb-5 text-2xl font-bold md:text-3xl">Known For</h3>
          {credits.isPending && <MoviesGrid isPending />}
          {credits.isSuccess && (
            <MoviesGrid
              movies={getMoviesWithoutDublicates([
                ...credits.data.crew,
                ...credits.data.cast,
              ])}
            />
          )}
          {credits.isSuccess &&
            [...credits.data.cast, ...credits.data.crew].length === 0 && (
              <p>no data found</p>
            )}
        </section>
      </div>
    );
  }
}

function getMoviesWithoutDublicates(movies: MovieItem[]) {
  const uniqIds = new Set();
  return movies
    .filter((movie) => {
      if (!uniqIds.has(movie.id)) {
        uniqIds.add(movie.id);
        return movie;
      }
    })
    .sort((a, b) => {
      return new Date(a.releaseDate) > new Date(b.releaseDate) ? -1 : 1;
    });
}

function LoadingPage() {
  return (
    <div className="mx-auto max-w-7xl px-8 pb-10 pt-2">
      <div className="flex items-start gap-8">
        <div className="mt-1 hidden aspect-[2/3] w-[210px] max-w-[25%] shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-md sm:block dark:bg-gray-700" />
        <h1 className="mb-3 animate-pulse text-4xl font-bold md:text-5xl">Loading</h1>
      </div>
    </div>
  );
}
