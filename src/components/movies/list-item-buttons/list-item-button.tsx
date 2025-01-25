import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/outline';

export type ListItemButtonProps = {
  onClick: () => void;
  type: 'favorites' | 'watchlist';
  disabled?: boolean;
  isActive?: boolean;
  size?: 'regular' | 'large';
};

export function ListItemButton(props: ListItemButtonProps) {
  const { onClick, type, disabled, isActive, size = 'regular' } = props;

  const iconProps = {
    width: 24,
    height: 24,
    className: getIconClassname({ isFilled: isActive, size }),
  };

  const buttonClassname = getButtonClassname(size);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={buttonClassname}
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

function getIconClassname({
  size = 'regular',
  isFilled = false,
}: {
  size?: ListItemButtonProps['size'];
  isFilled?: boolean;
}) {
  const emptyIconClassname = `text-white dark:text-gray-100 group-disabled:fill-white group-disabled:fill-gray-200 ${size === 'regular' && 'transition hover:scale-125'}`;
  const filledIconClassname = emptyIconClassname + ' fill-white dark:fill-gray-200';
  return isFilled ? filledIconClassname : emptyIconClassname;
}

function getButtonClassname(size: ListItemButtonProps['size']) {
  if (size === 'regular') {
    return 'group';
  }

  return 'flex shrink-0 p-3.5 group bg-gray-800 hover:bg-gray-700 hover:scale-105 transition rounded-full';
}
