import { useSearchParams } from 'react-router';
import { genresMap } from './movies.constants.service';
import { Entries, getYear } from './movies.utils.service';

type SelectName = 'sort' | 'releaseDates' | 'genre';
type SearchParamName = keyof typeof searchParamName;

const MIN_RELEASE_DATE_YEAR = 1895;

const searchParamName = {
  releaseDateGte: 'primary_release_date.gte',
  releaseDateLte: 'primary_release_date.lte',
  genre: 'with_genres',
  sortBy: 'sort_by',
  includeAdult: 'include_adult',
};

const sortOption = {
  popularity: 'popularity.desc',
  releaseDateDesc: 'primary_release_date.desc',
  titleAsc: 'title.asc',
};

const sortOptionLabel: Record<keyof typeof sortOption, string> = {
  popularity: 'Popularity',
  releaseDateDesc: 'Release Date',
  titleAsc: 'Alphabetical',
};

const defaultSearchParamValue: Record<SearchParamName, string> = {
  releaseDateGte: `${MIN_RELEASE_DATE_YEAR}-01-01`,
  releaseDateLte: getYear(new Date()),
  genre: '',
  sortBy: sortOption.popularity,
  includeAdult: 'false',
};

const createYearsRangeParam = ([startYear, endYear]: [number, number]) => {
  return [
    `${startYear}-01-01`,
    endYear === new Date().getFullYear() ? getYear(new Date()) : `${endYear}-12-31`,
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
  sort: (Object.entries(sortOption) as Entries<typeof sortOption>).map(
    ([title, value]) => ({
      title: sortOptionLabel[title],
      value,
    }),
  ),
  releaseDates: [
    { title: 'all years', value: '' },
    ...getYearsFrom2020ToNow().map((year) =>
      createReleaseDatesOption(year.toString(), [year, year]),
    ),
    createReleaseDatesOption('2010 - 2020', [2010, 2020]),
    createReleaseDatesOption('2000 - 2010', [2000, 2010]),
    createReleaseDatesOption('1990 - 2000', [1990, 2000]),
    createReleaseDatesOption('1980 - 1990', [1980, 1990]),
    createReleaseDatesOption('1970 - 1980', [1970, 1980]),
    createReleaseDatesOption('1960 - 1970', [1960, 1970]),
    createReleaseDatesOption('1950 - 1960', [1950, 1960]),
    createReleaseDatesOption('before 1950', [MIN_RELEASE_DATE_YEAR, 1950]),
  ],
  genre: [
    { title: 'all genres', value: '' },
    ...Object.entries(genresMap)
      .map(([value, title]) => ({ title, value }))
      .sort((a, b) => (a.title > b.title ? 1 : -1)),
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
  const get = (name: SearchParamName) => searchParams.get(searchParamName[name]) ?? '';

  const map = {
    releaseDates:
      get('releaseDateGte') && get('releaseDateLte')
        ? [get('releaseDateGte'), get('releaseDateLte')].join(',')
        : '',
    genre: get('genre'),
    sort: get('sortBy') || defaultSearchParamValue['sortBy'],
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
    searchParams.set(searchParamName[name], value);
  const remove = (name: SearchParamName) => searchParams.delete(searchParamName[name]);

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
    const paramName = searchParamName[param];
    if (value && !params.has(paramName)) {
      params.set(paramName, value);
    }
  }

  params.sort();
  return params;
};

export {
  selectData,
  getSelectValue,
  updateSearchParamsWithSelectValue,
  useSearchParamsWithMoviesFilterDefaults,
};
