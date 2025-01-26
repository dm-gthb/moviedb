import { useSearchParams } from 'react-router';
import {
  getSelectValue,
  selectData,
  updateSearchParamsWithSelectValue,
} from '../../../services/movies/movies-filter.service';
import { Select } from '../../shared/select/select';

export function MoviesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterElementClassname = 'w-max p-4 shrink-0 rounded border-2 capitalize';

  return (
    <div className="flex items-center flex-row gap-4 -mx-8 px-8 overflow-x-auto">
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
          className={`${filterElementClassname} flex items-center gap-2`}
        >
          {options.map(({ title, value }) => (
            <option key={title} value={value}>
              {title}
            </option>
          ))}
        </Select>
      ))}
      <button
        className={`${filterElementClassname} hover:bg-gray-200 hover:dark:bg-gray-800 transition-colors border-transparent`}
        onClick={() => setSearchParams(new URLSearchParams())}
      >
        Reset Filters
      </button>
    </div>
  );
}
