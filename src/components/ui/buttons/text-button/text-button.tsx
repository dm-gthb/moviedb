export function TextButton({
  children,
  onClick,
  isDisabled = false,
  type = 'button',
  className = '',
}: {
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}) {
  return (
    <button
      type={type}
      className={`w-max rounded px-4 py-2 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 hover:dark:bg-gray-700 ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
