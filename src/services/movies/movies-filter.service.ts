import { useSearchParams } from 'react-router';
import { genresMap } from './movies.constants.service';
import { Entries, getFormattedDate } from '../utils.service';

type SelectName = 'sort' | 'releaseDates' | 'genre';
type SearchParamName = keyof typeof moviesSearchParamName;

const MIN_RELEASE_DATE_YEAR = 1895;

const moviesSearchParamName = {
  releaseDateGte: 'primary_release_date.gte',
  releaseDateLte: 'primary_release_date.lte',
  genre: 'with_genres',
  sortBy: 'sort_by',
  includeAdult: 'include_adult',
};

const moviesSortOption = {
  popularity: 'popularity.desc',
  vote: 'vote_count.desc',
  releaseDateAsc: 'primary_release_date.asc',
  releaseDateDesc: 'primary_release_date.desc',
  title: 'title.asc',
};

const defaultSearchParamValue: Record<SearchParamName, string> = {
  releaseDateGte: `${MIN_RELEASE_DATE_YEAR}-01-01`,
  releaseDateLte: getFormattedDate(new Date()),
  genre: '',
  sortBy: moviesSortOption.popularity,
  includeAdult: 'false',
};

const createYearsRangeParam = ([startYear, endYear]: [number, number]) => {
  return [
    `${startYear}-01-01`,
    endYear === new Date().getFullYear()
      ? getFormattedDate(new Date())
      : `${endYear}-12-31`,
  ].join(',');
};

const getYearsFrom2020ToNow = () => {
  const yearsFrom2020ToNow = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2020; year--) {
    yearsFrom2020ToNow.push(year);
  }
  return yearsFrom2020ToNow;
};

const createReleaseDatesOption = (title: string, yearsRange: [number, number]) => {
  return { title, value: createYearsRangeParam(yearsRange) };
};

const selectOption: Record<SelectName, { title: string; value: string }[]> = {
  sort: Object.entries(moviesSortOption).map(([title, value]) => ({ title, value })),
  releaseDates: [
    ...getYearsFrom2020ToNow().map((year) =>
      createReleaseDatesOption(year.toString(), [year, year]),
    ),
    createReleaseDatesOption('2010-2020', [2010, 2020]),
    createReleaseDatesOption('2000-2010', [2000, 2010]),
    createReleaseDatesOption('1990-2000', [1990, 2000]),
    createReleaseDatesOption('1980-1990', [1980, 1990]),
    createReleaseDatesOption('before 1980', [MIN_RELEASE_DATE_YEAR, 1980]),
    { title: 'all years', value: '' },
  ],
  genre: [
    { title: 'all genres', value: '' },
    ...Object.entries(genresMap).map(([value, title]) => ({ title, value })),
  ],
};

const selectData = Object.entries(selectOption) as Entries<typeof selectOption>;

const getSelectValue = ({
  selectName,
  searchParams,
}: {
  selectName: SelectName;
  searchParams: URLSearchParams;
}) => {
  const get = (name: SearchParamName) =>
    searchParams.get(moviesSearchParamName[name]) ?? '';

  const map = {
    releaseDates:
      get('releaseDateGte') && get('releaseDateLte')
        ? [get('releaseDateGte'), get('releaseDateLte')].join(',')
        : '',
    genre: get('genre'),
    sort: get('sortBy') ?? defaultSearchParamValue['sortBy'],
  };

  return map[selectName];
};

const updateSearchParamsWithSelectValue = ({
  selectName,
  value,
  searchParams,
}: {
  selectName: SelectName;
  value: string;
  searchParams: URLSearchParams;
}) => {
  const set = (name: SearchParamName, value: string) =>
    searchParams.set(moviesSearchParamName[name], value);
  const remove = (name: SearchParamName) =>
    searchParams.delete(moviesSearchParamName[name]);

  const deleteReleaseDateParams = () => {
    remove('releaseDateGte');
    remove('releaseDateLte');
  };

  switch (selectName) {
    case 'releaseDates': {
      if (!value) {
        deleteReleaseDateParams();
        break;
      }

      const [startYear, endYear] = value.split(',');
      set('releaseDateGte', startYear);
      set('releaseDateLte', endYear);
      break;
    }

    case 'genre':
      if (value) {
        set('genre', value);
      } else {
        remove('genre');
      }
      break;

    case 'sort':
      set('sortBy', value);
      break;
  }
};

const useSearchParamsWithMoviesFilterDefaults = () => {
  const [params] = useSearchParams();

  for (const [param, value] of Object.entries(defaultSearchParamValue) as Entries<
    typeof defaultSearchParamValue
  >) {
    const paramName = moviesSearchParamName[param];
    if (value && !params.has(paramName)) {
      params.set(paramName, value);
    }
  }

  return params;
};

export {
  selectData,
  getSelectValue,
  updateSearchParamsWithSelectValue,
  useSearchParamsWithMoviesFilterDefaults,
};
