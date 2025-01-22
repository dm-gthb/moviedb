import { FormEvent, RefObject } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export interface SearchFormInterface extends HTMLFormElement {
  elements: SearchFormElements;
}

interface SearchFormElements extends HTMLFormControlsCollection {
  searchTerm: HTMLInputElement;
}

export function SearchForm({
  onSubmit,
  inputRef,
}: {
  onSubmit: (e: FormEvent<SearchFormInterface>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 items-center justify-center">
      <div className="flex gap-2">
        <input
          id="search"
          type="search"
          name="searchTerm"
          className="p-4 border dark:bg-gray-950 rounded"
          ref={inputRef}
        />
        <button
          type="submit"
          className="px-4 group bg-gray-700 dark:bg-gray-700 hover:bg-gray-600 hover:dark:bg-gray-600 disabled:text-gray-400 transition-colors rounded"
        >
          <ArrowRightIcon
            width={24}
            height={24}
            strokeWidth={2}
            className="text-white dark:text-gray-100 group-hover:scale-125 transition-transform"
          />
          <span className="sr-only">Submit</span>
        </button>
      </div>
      <label className="text-center" htmlFor="search">
        Search for movies by their original, translated and alternative titles.
      </label>
    </form>
  );
}
