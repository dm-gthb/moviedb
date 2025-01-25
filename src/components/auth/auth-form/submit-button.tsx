import { Spinner } from '../../shared/spinner/spinner';
import { AuthFormProps } from './auth-form';

type SubmitButtonProps = {
  type: AuthFormProps['type'];
  isDisabled: boolean;
};

export function SubmitButton({ type, isDisabled }: SubmitButtonProps) {
  const buttonLabel: Record<SubmitButtonProps['type'], string> = {
    login: 'Log In',
    signup: 'Sign Up',
  };

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="text-bold w-full p-4 min-h-14 text-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 hover:dark:bg-gray-700 disabled:text-gray-400 disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:cursor-not-allowed transition-colors rounded-full"
    >
      {isDisabled ? (
        <Spinner
          width={20}
          height={20}
          className="inline text-center text-gray-50 fill-gray-500 dark:text-gray-600 dark:fill-gray-50 animate-spin"
        />
      ) : (
        buttonLabel[type]
      )}
    </button>
  );
}
