import { RefObject } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { SquareIconButton } from '../../ui/buttons/square-icon-button/square-icon-button';
import { FormField } from '../../ui/forms/form-field/form-field';

export function MovieSearchForm({
  onSubmit,
  inputRef,
}: {
  onSubmit: (formData: FormData) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  return (
    <form action={onSubmit}>
      <div className="flex justify-center gap-2">
        <FormField
          labelProps={{
            children: 'Search movies',
            className: 'sr-only',
          }}
          inputProps={{
            type: 'search',
            name: 'searchTerm',
            ref: inputRef,
            placeholder: 'Search movies...',
            required: true,
          }}
          isReserveErrorSpace={false}
        />
        <div className="h-[52px] w-[52px]">
          <SquareIconButton Icon={ArrowRightIcon} label="Submit" type="submit" />
        </div>
      </div>
    </form>
  );
}
