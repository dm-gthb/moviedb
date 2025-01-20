import { MovieCredits, MovieDetails } from './movies.types.service';

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
  const [directors, isMultipleDirectors] = getNames(
    crew.filter(({ job }) => job === 'Director'),
  );
  const [writers, isMultipleWriters] = getNames(
    crew.filter(({ job }) => job === 'Writer'),
  );
  const [screenplay] = getNames(crew.filter(({ job }) => job === 'Screenplay'));
  const [starring] = getNames(cast, 30);

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
      return new Intl.DisplayNames(['en'], { type: 'language' }).of(
        movie.originalLanguage,
      );

    case 'originCountry':
      return (
        movie.originCountry
          ?.map((code) => new Intl.DisplayNames(['en'], { type: 'region' }).of(code))
          .join(', ') ?? ''
      );

    case 'runtime':
      return formatDuration(movie.runtime ?? 0);

    case 'budget':
      return movie.budget
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(movie.budget)
        : undefined;

    case 'status':
      return movie.status;

    case 'releaseDate':
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
        new Date(movie.releaseDate),
      );

    case 'homepage':
      return movie.homepage;

    default:
      return undefined;
  }
}

function getNames(list?: Array<{ name: string }>, maxCount = 10): [string, boolean] {
  return list
    ? [
        list
          .slice(0, maxCount)
          .map(({ name }) => name)
          .join(', '),
        list.length > 1,
      ]
    : ['', false];
}

function formatDuration(minDuration: number) {
  const hours = Math.floor(minDuration / 60);
  const min = minDuration % 60;
  return `${hours ? `${hours}h` : ''} ${min ? `${min}m` : ''}`;
}
