import { useSearchParams } from 'react-router';
import {
  getSelectValue,
  selectData,
  updateSearchParamsWithSelectValue,
} from '../../../services/movies/movies.filter.service';
import { Select } from '../../ui/forms/select/select';
import { TextButton } from '../../ui/buttons/text-button/text-button';

export function MoviesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="-mx-8 flex flex-row items-stretch gap-4 overflow-x-auto px-8">
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
        >
          {options.map(({ title, value }) => (
            <option key={title} value={value}>
              {title}
            </option>
          ))}
        </Select>
      ))}
      <TextButton
        className="shrink-0"
        onClick={() => setSearchParams(new URLSearchParams())}
      >
        Reset Filters
      </TextButton>
    </div>
  );
}
