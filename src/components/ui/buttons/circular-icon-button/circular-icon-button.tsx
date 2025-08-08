import { ComponentType } from 'react';

type CircularIconButtonProps = {
  icon: ComponentType<{ width: number; height: number; className: string }>;
  label: string;
  onClick?: () => void;
  isFilled?: boolean;
  isDisabled?: boolean;
};

export function CircularIconButton({
  icon: Icon,
  label,
  onClick,
  isFilled = false,
  isDisabled = false,
}: CircularIconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="group flex shrink-0 rounded-full bg-gray-800 p-3.5 transition hover:scale-105 hover:bg-gray-700"
    >
      <Icon width={24} height={24} className={getIconClassname({ isFilled })} />
      <span className="sr-only">{label}</span>
    </button>
  );
}

function getIconClassname({ isFilled }: { isFilled?: boolean }) {
  const emptyIconClassname = 'text-gray-50 group-disabled:fill-gray-50';
  const filledIconClassname = emptyIconClassname + ' fill-gray-50';
  return isFilled ? filledIconClassname : emptyIconClassname;
}
