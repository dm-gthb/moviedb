import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { CircularIconButton } from '../../ui/buttons/circular-icon-button/circular-icon-button';
import { IconButton } from '../../ui/buttons/icon-button/icon-button';

export type MovieListItemButtonProps = {
  onClick: () => void;
  type: 'favorites' | 'watchlist';
  variant: 'compact' | 'circular';
  disabled?: boolean;
  isActive?: boolean;
};

export function MovieListItemButton(props: MovieListItemButtonProps) {
  const { onClick, type, disabled, isActive, variant = 'compact' } = props;
  const Icon = type === 'favorites' ? HeartIcon : BookmarkIcon;
  const label = isActive ? `Remove movie from ${type}` : `Add movie to ${type}`;

  if (variant === 'circular') {
    return (
      <CircularIconButton
        icon={Icon}
        label={label}
        onClick={onClick}
        isFilled={isActive}
        isDisabled={disabled}
      />
    );
  }

  return (
    <IconButton
      onClick={onClick}
      Icon={Icon}
      label={label}
      isFilled={isActive}
      isDisabled={disabled}
      isAlwaysOnDarkBg
    />
  );
}
