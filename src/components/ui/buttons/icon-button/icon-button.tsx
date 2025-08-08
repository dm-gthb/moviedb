import { ComponentType, RefObject } from 'react';

export function IconButton({
  Icon,
  label,
  onClick,
  isDisabled,
  isFilled,
  isAlwaysOnDarkBg,
  buttonRef,
}: {
  Icon: ComponentType<{ width: number; height: number; className: string }>;
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  isFilled?: boolean;
  isAlwaysOnDarkBg?: boolean;
  buttonRef?: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={buttonRef}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="group transition-transform hover:scale-125"
      disabled={isDisabled}
    >
      <Icon
        width={24}
        height={24}
        className={`${isAlwaysOnDarkBg ? 'text-gray-50' : 'text-gray-900 dark:text-gray-50'} ${isFilled ? (isAlwaysOnDarkBg ? 'fill-gray-50' : 'fill-gray-900 dark:fill-gray-50') : ''} group-disabled:fill-gray-50`}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
