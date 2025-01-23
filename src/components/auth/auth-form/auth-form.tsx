import { useActionState } from 'react';
import { AuthFormError } from './auth-form-error';
import { AuthData } from '../../../services/auth/auth.types.service';
import { getErrorMessage } from '../../../services/utils.service';

const PASSWORD_MIN_LENGTH = 8;

type AuthFormProps = {
  type: 'login' | 'signup';
  onSubmit: (data: AuthData) => Promise<void>;
};

type FormState = {
  data: { username: string; password: string };
  isError: boolean;
  errorMessage: string;
};

function AuthForm(props: AuthFormProps) {
  const { type, onSubmit } = props;
  const [formState, formAction, isPending] = useActionState(
    async (_: FormState | undefined, formData: FormData) => {
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;
      try {
        await onSubmit({ username, password });
      } catch (error) {
        return {
          data: { username, password },
          isError: true,
          errorMessage: getErrorMessage(error),
        };
      }
    },
    { data: { username: '', password: '' }, isError: false, errorMessage: '' },
  );

  const classNames = {
    input: 'p-3 border-2 rounded dark:bg-transparent disabled:text-gray-400',
    formGroup: 'flex flex-col gap-1 mb-4 last-of-type:mb-6',
  };

  return (
    <form action={formAction}>
      <fieldset disabled={isPending}>
        <div className={classNames.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            className={classNames.input}
            defaultValue={formState?.data.username}
            required
          />
        </div>
        <div className={classNames.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            minLength={PASSWORD_MIN_LENGTH}
            autoComplete={type === 'signup' ? 'new-password' : 'current-password'}
            className={classNames.input}
            defaultValue={formState?.data.password}
            required
          />
        </div>
      </fieldset>
      {formState?.isError && <AuthFormError errorMessage={formState.errorMessage} />}
      <button
        type="submit"
        disabled={isPending}
        className="text-bold w-full p-4 text-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 hover:dark:bg-gray-700 disabled:text-gray-400 disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:cursor-not-allowed transition-colors rounded-full"
      >
        {type === 'login' ? 'Log In' : 'Sign Up'}
      </button>
    </form>
  );
}

export function LoginForm({ onSubmit }: { onSubmit: AuthFormProps['onSubmit'] }) {
  return <AuthForm type="login" onSubmit={onSubmit} />;
}

export function SignupForm({ onSubmit }: { onSubmit: AuthFormProps['onSubmit'] }) {
  return <AuthForm type="signup" onSubmit={onSubmit} />;
}
