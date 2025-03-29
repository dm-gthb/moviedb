import { PersonBase } from '../person/person.types';
import { Crew, MovieCredits, MovieDetails } from './movies.types.service';
import {
  formatBudget,
  formatCountryList,
  formatDate,
  formatDuration,
  formatLanguage,
  getPersonsWithOverflow,
} from './movies.utils.service';

export type TechItems = {
  title: string;
  content: string;
  href?: string;
}[];

export type TeamItems = {
  jobTitle: string;
  persons: PersonBase[];
}[];

export type CategorizedData = {
  general: TechItems;
  specs: TechItems;
  team: TeamItems;
};

export function getCategorizedMovieData(
  movie: MovieDetails & MovieCredits,
): CategorizedData {
  return {
    general: getTechData(movie, movieDataType.general),
    specs: getTechData(movie, movieDataType.specs),
    team: getTeamData(movie),
  };
}

const movieDataType = {
  general: ['Original Title', 'Original Language', 'Country'],
  specs: ['Runtime', 'Budget', 'Status', 'Release Date', 'Homepage'],
};

const dataItemToMovieField: Record<string, Partial<keyof MovieDetails>> = {
  'Original Title': 'originalTitle',
  'Original Language': 'originalLanguage',
  Country: 'originCountry',
  Runtime: 'runtime',
  Budget: 'budget',
  Status: 'status',
  'Release Date': 'releaseDate',
  Homepage: 'homepage',
};

function getTechData(movie: MovieDetails, movieDataItems: string[]): TechItems {
  return movieDataItems.reduce<TechItems>((techItems, title) => {
    const value = getFormattedValue(movie, dataItemToMovieField[title]);
    if (value !== undefined) {
      techItems.push({
        title,
        content: value,
        ...(title === 'Homepage' && { href: value }),
      });
    }
    return techItems;
  }, []);
}

function getTeamData(movie: MovieCredits): TeamItems {
  const crew = movie.crew ?? [];
  const cast = movie.cast ?? [];
  const [directors, isMultipleDirectors] = getPersonsWithOverflow(
    crew.filter(({ job }) => job === 'Director'),
  );
  const [writers, isMultipleWriters] = getPersonsWithOverflow(
    crew.filter(({ job }) => job === 'Writer'),
  );
  const [screenplay] = getPersonsWithOverflow(
    crew.filter(({ job }) => job === 'Screenplay'),
  );
  const [starring] = getPersonsWithOverflow(cast, 20);

  return [
    { jobTitle: isMultipleDirectors ? 'Directors' : 'Director', persons: directors },
    { jobTitle: isMultipleWriters ? 'Writers' : 'Writer', persons: writers },
    { jobTitle: 'Screenplay', persons: screenplay },
    { jobTitle: 'Starring', persons: starring },
  ].filter(({ persons }) => persons?.length);
}

export function getAllCrew(crew: MovieCredits['crew']) {
  const result: Record<string, Crew[]> = {};
  for (const crewItem of crew) {
    if (result[crewItem.department]) {
      result[crewItem.department].push(crewItem);
    } else {
      result[crewItem.department] = [crewItem];
    }
  }

  return result;
}

function getFormattedValue(
  movie: MovieDetails,
  movieDataKey: Partial<keyof MovieDetails>,
) {
  switch (movieDataKey) {
    case 'originalTitle':
      return movie.originalTitle ? movie.originalTitle : undefined;

    case 'originalLanguage':
      return movie.originalLanguage ? formatLanguage(movie.originalLanguage) : undefined;

    case 'originCountry':
      return formatCountryList(movie.originCountry);

    case 'runtime':
      return movie.runtime ? formatDuration(movie.runtime) : undefined;

    case 'budget':
      return movie.budget ? formatBudget(movie.budget) : undefined;

    case 'status':
      return movie.status ? movie.status : undefined;

    case 'releaseDate':
      return movie.releaseDate ? formatDate(movie.releaseDate) : undefined;

    case 'homepage':
      return movie.homepage ? movie.homepage : undefined;

    default:
      return undefined;
  }
}
