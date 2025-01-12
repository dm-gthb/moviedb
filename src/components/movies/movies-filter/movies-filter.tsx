import { useSearchParams } from 'react-router';
import {
  getSelectValue,
  selectData,
  updateSearchParamsWithSelectValue,
} from '../../../services/movies/movies-filter.service';

export function MoviesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      {selectData.map(([selectName, options]) => (
        <select
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
        >
          {options.map(({ title, value }) => (
            <option key={title} value={value}>
              {title}
            </option>
          ))}
        </select>
      ))}
      <button onClick={() => setSearchParams(new URLSearchParams())}>
        reset filters
      </button>
    </div>
  );
}
