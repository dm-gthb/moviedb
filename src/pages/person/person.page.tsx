import { useParams } from 'react-router';
import { usePersonAndMovieCredits } from '../../queries/person.queries';
import { createProfileSrc } from '../../services/image/image.service';
import { formatDate } from '../../services/movies/movies.utils.service';
import { ModalImageGallery } from '../../components/ui/image-gallery/image-gallery';
import { groupMoviesByDepartment } from '../../services/person/person-movies.categorize.service';
import { PersonMoviesByDepartment } from '../../components/person/person-movies-by-department/person-movies-by-department';

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
          <div className="min-w-0 grow">
            <h1 className="mb-3 text-4xl font-bold md:text-5xl">{name}</h1>
            {birthday && <p>Birthdate: {formatDate(birthday)}</p>}
            {placeOfBirth && <p>Birthplace: {placeOfBirth}</p>}
            {deathday && <p>Day of Death: {formatDate(deathday)}</p>}

            <section className="mb-10">
              <h3 className="mb-2 mt-5 text-2xl font-bold md:text-3xl">Biography</h3>
              <p>{biography ? biography : `No biography found for ${name}.`}</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold md:text-3xl">Credits</h3>
              {credits.isSuccess && (
                <PersonMoviesByDepartment
                  departmentMovies={groupMoviesByDepartment(person.data, credits.data)}
                />
              )}
              {credits.isSuccess &&
                [...credits.data.cast, ...credits.data.crew].length === 0 && (
                  <p>no data found</p>
                )}
            </section>
          </div>
        </div>
      </div>
    );
  }
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
