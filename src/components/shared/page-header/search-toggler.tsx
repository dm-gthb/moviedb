import { RefObject } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function SearchToggler({
  isSearchPanel,
  onClick,
  buttonRef,
}: {
  isSearchPanel: boolean;
  onClick: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button onClick={onClick} ref={buttonRef}>
      {isSearchPanel ? (
        <>
          <XMarkIcon width={24} height={24} className="icon-base" />
          <span className="sr-only">Close search movie form</span>
        </>
      ) : (
        <>
          <MagnifyingGlassIcon width={24} height={24} className="icon-base" />
          <span className="sr-only">Open search movie form</span>
        </>
      )}
    </button>
  );
}
