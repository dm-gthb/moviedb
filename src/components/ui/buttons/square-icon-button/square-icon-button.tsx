import { ComponentType } from 'react';

export interface SquareIconButtonProps {
  Icon: ComponentType<{
    width: number;
    height: number;
    strokeWidth?: number;
    className: string;
  }>;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  isDisabled?: boolean;
  className?: string;
}

export function SquareIconButton({
  Icon,
  label,
  type = 'button',
  onClick,
  isDisabled = false,
  className = '',
}: SquareIconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`group flex h-full max-h-14 w-full max-w-14 items-center justify-center rounded bg-gray-700 p-2 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-gray-700 disabled:dark:bg-gray-500 ${className}`}
    >
      <Icon
        width={24}
        height={24}
        strokeWidth={2}
        className="text-white transition-transform group-hover:scale-125 group-disabled:scale-100 dark:text-gray-100"
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
