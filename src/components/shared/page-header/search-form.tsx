import { RefObject } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function SearchForm({
  onSubmit,
  inputRef,
}: {
  onSubmit: (formData: FormData) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  return (
    <form action={onSubmit} className="flex flex-col items-center justify-center gap-6">
      <div className="flex gap-2">
        <input
          id="search"
          type="search"
          name="searchTerm"
          className="rounded border-2 p-3 dark:bg-gray-950"
          ref={inputRef}
          required
        />
        <button
          type="submit"
          className="group rounded bg-gray-700 px-4 transition-colors hover:bg-gray-600 disabled:text-gray-400 dark:bg-gray-700 hover:dark:bg-gray-600"
        >
          <ArrowRightIcon
            width={24}
            height={24}
            strokeWidth={2}
            className="text-white transition-transform group-hover:scale-125 dark:text-gray-100"
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
