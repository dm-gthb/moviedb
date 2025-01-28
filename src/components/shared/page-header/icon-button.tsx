import { ComponentType, RefObject } from 'react';

export function IconButton({
  onClick,
  Icon,
  label,
  buttonRef,
}: {
  onClick: () => void;
  Icon: ComponentType<{ width: number; height: number; className: string }>;
  label: string;
  buttonRef?: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button ref={buttonRef} onClick={onClick}>
      <Icon
        width={24}
        height={24}
        className="text-gray-900 transition-transform hover:scale-125 dark:text-gray-50"
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
