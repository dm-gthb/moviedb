import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/outline';

export function ListItemButton({
  onClick,
  type,
  disabled,
  isActive,
}: {
  onClick: () => void;
  type: 'favorites' | 'watchlist';
  disabled?: boolean;
  isActive?: boolean;
}) {
  const iconProps = {
    width: 24,
    height: 24,
    className: getIconClassname(isActive),
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      className="group"
      disabled={disabled}
    >
      {type === 'favorites' ? (
        <HeartIcon {...iconProps} />
      ) : (
        <BookmarkIcon {...iconProps} />
      )}
      <span className="sr-only">
        {isActive ? `Remove movie from ${type}` : `Add movie to ${type}`}
      </span>
    </button>
  );
}

function getIconClassname(isFilled?: boolean) {
  const emptyIconClassname =
    'text-white dark:text-gray-300 transition hover:scale-125 group-disabled:fill-white group-disabled:fill-gray-300';
  const filledIconClassname = emptyIconClassname + ' fill-white dark:fill-gray-300';
  return isFilled ? filledIconClassname : emptyIconClassname;
}
