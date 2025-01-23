import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export function PasswordVisibilityToggler({
  isVisible,
  onClick,
}: {
  isVisible: boolean;
  onClick: () => void;
}) {
  const buttonClassnames =
    'absolute right-0 top-[50%] -translate-y-[50%] p-3 text-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white';
  const iconProps = { width: 24, height: 24, strokeWidth: 2 };

  return (
    <button type="button" onClick={onClick} className={buttonClassnames}>
      {isVisible ? (
        <>
          <EyeSlashIcon {...iconProps} />
          <span className="sr-only">Hide password</span>
        </>
      ) : (
        <>
          <EyeIcon {...iconProps} />
          <span className="sr-only">Show password</span>
        </>
      )}
    </button>
  );
}
