import { Spinner } from '../../ui/spinner/spinner';
import { AuthFormProps } from './auth-form';

type SubmitButtonProps = {
  type: AuthFormProps['type'];
  isDisabled?: boolean;
  isLoading?: boolean;
};

export function SubmitButton({ type, isDisabled, isLoading }: SubmitButtonProps) {
  const buttonLabel: Record<SubmitButtonProps['type'], string> = {
    login: 'Log In',
    signup: 'Sign Up',
  };

  return (
    <button
      type="submit"
      disabled={isDisabled || isLoading}
      className="text-bold min-h-14 w-full rounded-full bg-gray-200 p-4 text-center text-gray-900 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 dark:bg-gray-600 dark:text-gray-50 hover:dark:bg-gray-500 disabled:dark:bg-gray-700"
    >
      {isLoading ? (
        <Spinner
          width={20}
          height={20}
          className="inline animate-spin fill-gray-500 text-center text-gray-50 dark:fill-gray-50 dark:text-gray-600"
        />
      ) : (
        buttonLabel[type]
      )}
    </button>
  );
}
