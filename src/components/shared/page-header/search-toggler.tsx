import { RefObject } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton } from './icon-button';

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
    <IconButton
      onClick={onClick}
      buttonRef={buttonRef}
      Icon={isSearchPanel ? XMarkIcon : MagnifyingGlassIcon}
      label={isSearchPanel ? 'Open search movie form' : 'Close search movie form'}
    />
  );
}
