import { Link, useParams } from 'react-router';
import { Fragment } from 'react';
import {
  TechItems,
  TeamItems,
} from '../../../services/movies/movie-categorized-data.service';
import { appRoute } from '../../../services/router.service';
import { prefetchPersonImage } from '../../../services/image/image.service';
import { useQueryClient } from '@tanstack/react-query';
import { personQueries } from '../../../queries/person.queries';
import { Cast, Crew } from '../../../services/movies/movies.types.service';

const linkClassname =
  'underline underline-offset-2 decoration-zinc-400 dark:decoration-gray-500 hover:decoration-current';
const cardClassname =
  'flex flex-col gap-4 rounded bg-gray-100 px-6 py-8 shadow-md dark:shadow-gray-950 lg:flex dark:bg-gray-800 z-20';

export function TeamInfoCard({ items }: { items: TeamItems }) {
  const { id: movieId } = useParams();
  return (
    <div className={cardClassname}>
      <div className="flex flex-col items-start gap-4">
        {items.map(({ jobTitle, persons }) => (
          <div key={jobTitle}>
            <h3 className="font-semibold text-gray-900 dark:font-normal dark:text-white">
              {jobTitle}
            </h3>
            <p className="text-gray-900 dark:text-gray-400">
              {persons.map(({ id, name, profilePath }, i) => (
                <Fragment key={id}>
                  <PersonLink id={id} name={name} profilePath={profilePath} />
                  {i !== persons.length - 1 && ', '}
                </Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
      <Link
        to={`${appRoute.movie}/${movieId}${appRoute.cast}`}
        className={`${linkClassname} dark:hover:decoration-gray-400`}
      >
        → Full Cast & Crew
      </Link>
    </div>
  );
}

export function AllCastCard({ cast }: { cast: Cast[] }) {
  return (
    <div className={cardClassname}>
      {cast.length > 0 ? (
        <section className="mb-4">
          <h3 className="font-semibold text-gray-900 dark:font-normal dark:text-white">
            Starring
          </h3>
          <div>
            {cast.map(({ id, name, character, profilePath }) => (
              <p key={id} className="text-gray-900 dark:text-gray-400">
                {character && <span>{character}: </span>}
                <PersonLink id={id} name={name} profilePath={profilePath} />
              </p>
            ))}
          </div>
        </section>
      ) : (
        <span>No Cast Data</span>
      )}
    </div>
  );
}

export function AllCrewCard({ allCrew }: { allCrew: Record<string, Crew[]> }) {
  const isNoCrewData = Object.values(allCrew).every((team) => team.length === 0);
  return (
    <div className={cardClassname}>
      {isNoCrewData ? (
        <span>No Crew Data</span>
      ) : (
        Object.keys(allCrew).map((department) => (
          <section key={department}>
            <h3 className="font-semibold text-gray-900 dark:font-normal dark:text-white">
              {department}
            </h3>
            <div>
              {allCrew[department].map(({ id, name, job, profilePath }) => (
                <p key={id} className="text-gray-900 dark:text-gray-400">
                  {job && <span>{job}: </span>}
                  <PersonLink id={id} name={name} profilePath={profilePath} />
                </p>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export function TechInfoCard({ items }: { items: TechItems }) {
  return (
    <div className={cardClassname}>
      {items.map(({ title, content, href }) => (
        <div key={title}>
          <h3 className="font-semibold text-gray-900 dark:font-normal dark:text-white">
            {title}
          </h3>
          <p
            className={`text-gray-900 dark:text-gray-400 ${href && 'overflow-ellipsis'}`}
          >
            {href ? (
              <a
                href={href}
                rel="noopener noreferrer"
                target="_blank"
                className={linkClassname}
              >
                {content}
              </a>
            ) : (
              <>{content}</>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export function LoadingInfoCard() {
  return (
    <div className="aspect-video animate-pulse rounded border-white bg-gray-100 shadow-md lg:aspect-square dark:bg-gray-800" />
  );
}

function PersonLink({
  id,
  name,
  profilePath,
}: {
  id: number;
  name: string;
  profilePath: string | null;
}) {
  const queryClient = useQueryClient();
  const prefetchPerson = (id: number, profilePath: string | null) => {
    prefetchPersonImage(profilePath);
    queryClient.prefetchQuery(personQueries.person(id.toString()));
  };
  return (
    <Link
      className={linkClassname}
      key={id}
      to={`${appRoute.person}/${id}`}
      onMouseEnter={() => prefetchPerson(id, profilePath)}
      onFocus={() => prefetchPerson(id, profilePath)}
    >
      {name}
    </Link>
  );
}
