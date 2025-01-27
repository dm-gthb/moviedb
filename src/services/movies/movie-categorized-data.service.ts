import { MovieCredits, MovieDetails } from './movies.types.service';
import {
  formatBudget,
  formatCountryList,
  formatDate,
  formatDuration,
  formatLanguage,
  getNamesWithOverflow,
} from './movies.utils.service';

export type InfoItems = { title: string; content?: string; isLink?: boolean }[];

export function getCategorizedMovieData(movie: MovieDetails & MovieCredits): InfoItems[] {
  return [getMovieGeneralData(movie), getTeamData(movie), getMovieTechData(movie)];
}

const movieDataType = {
  general: ['Original Title', 'Original Language', 'Country'],
  tech: ['Runtime', 'Budget', 'Status', 'Release Date', 'Homepage'],
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

function getMovieGeneralData(movie: MovieDetails): InfoItems {
  return movieDataType.general.map((title) => ({
    title,
    content: getFormattedValue(movie, dataItemToMovieField[title]),
  }));
}

function getMovieTechData(movie: MovieDetails): InfoItems {
  return movieDataType.tech.map((title) => ({
    title,
    content: getFormattedValue(movie, dataItemToMovieField[title]),
    ...(title === 'Homepage' && { isLink: true }),
  }));
}

function getTeamData(movie: MovieCredits): InfoItems {
  const crew = movie.crew ?? [];
  const cast = movie.cast ?? [];
  const [directors, isMultipleDirectors] = getNamesWithOverflow(
    crew.filter(({ job }) => job === 'Director'),
  );
  const [writers, isMultipleWriters] = getNamesWithOverflow(
    crew.filter(({ job }) => job === 'Writer'),
  );
  const [screenplay] = getNamesWithOverflow(
    crew.filter(({ job }) => job === 'Screenplay'),
  );
  const [starring] = getNamesWithOverflow(cast, 20);

  return [
    { title: isMultipleDirectors ? 'Directors' : 'Director', content: directors },
    { title: isMultipleWriters ? 'Writers' : 'Writer', content: writers },
    { title: 'Screenplay', content: screenplay },
    { title: 'Starring', content: starring },
  ];
}

function getFormattedValue(
  movie: MovieDetails,
  movieDataKey: Partial<keyof MovieDetails>,
) {
  switch (movieDataKey) {
    case 'originalTitle':
      return movie.originalTitle;

    case 'originalLanguage':
      return movie.originalLanguage ? formatLanguage(movie.originalLanguage) : undefined;

    case 'originCountry':
      return formatCountryList(movie.originCountry);

    case 'runtime':
      return movie.runtime ? formatDuration(movie.runtime) : undefined;

    case 'budget':
      return movie.budget ? formatBudget(movie.budget) : undefined;

    case 'status':
      return movie.status;

    case 'releaseDate':
      return movie.releaseDate ? formatDate(movie.releaseDate) : undefined;

    case 'homepage':
      return movie.homepage;

    default:
      return undefined;
  }
}
