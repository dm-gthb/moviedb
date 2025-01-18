import { useSearchParams } from 'react-router';
import {
  getSelectValue,
  selectData,
  updateSearchParamsWithSelectValue,
} from '../../../services/movies/movies-filter.service';
import { Select } from '../../shared/select/select';

export function MoviesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex items-center flex-row gap-4 overflow-x-auto -mx-8 px-8">
      {selectData.map(([selectName, options]) => (
        <Select
          key={selectName}
          name={selectName}
          value={getSelectValue({ selectName, searchParams })}
          onChange={(e) => {
            setSearchParams((prev) => {
              updateSearchParamsWithSelectValue({
                selectName,
                value: e.target.value,
                searchParams: prev,
              });
              return prev;
            });
          }}
          className="flex items-center gap-2 filter-element capitalize"
        >
          {options.map(({ title, value }) => (
            <option key={title} value={value}>
              {title}
            </option>
          ))}
        </Select>
      ))}
      <button
        className="filter-element flex shrink-0 hover:bg-gray-200 hover:dark:bg-gray-800 transition-colors border-transparent"
        onClick={() => setSearchParams(new URLSearchParams())}
      >
        Reset Filters
      </button>
    </div>
  );
}
