import { useActionState, useState } from 'react';
import { AuthData } from '../../../services/auth/auth.types.service';
import { getErrorMessage } from '../../../services/utils.service';
import { FormField } from '../../ui/forms/form-field/form-field';
import { PasswordVisibilityToggler } from './password-visibility-toggler';
import { AuthFormError } from './auth-form-error';
import { Spinner } from '../../ui/spinner/spinner';

const PASSWORD_MIN_LENGTH = 8;

type FormState = {
  data: AuthData;
  isError: boolean;
  errorMessage: string;
};

type AuthFormProps = {
  type: 'login' | 'signup';
  onSubmit: (data: AuthData) => Promise<void>;
};

export function LoginForm({ onSubmit }: { onSubmit: AuthFormProps['onSubmit'] }) {
  return <AuthForm type="login" onSubmit={onSubmit} />;
}

export function SignupForm({ onSubmit }: { onSubmit: AuthFormProps['onSubmit'] }) {
  return <AuthForm type="signup" onSubmit={onSubmit} />;
}

function AuthForm(props: AuthFormProps) {
  const { type, onSubmit } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formState, formAction, isPending] = useActionState(
    async (_: FormState | undefined, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      try {
        await onSubmit({ email, password });
      } catch (error) {
        return {
          data: { email, password },
          isError: true,
          errorMessage: getErrorMessage(error),
        };
      }
    },
    { data: { email: '', password: '' }, isError: false, errorMessage: '' },
  );

  return (
    <form action={formAction}>
      <fieldset disabled={isPending}>
        <FormField
          labelProps={{ children: 'Email' }}
          inputProps={{
            type: 'email',
            name: 'email',
            autoComplete: 'email',
            defaultValue: formState?.data.email,
            autoFocus: true,
            required: true,
          }}
        />
        <FormField
          labelProps={{ children: 'Password' }}
          inputProps={{
            type: isPasswordVisible ? 'text' : 'password',
            name: 'password',
            minLength: PASSWORD_MIN_LENGTH,
            autoComplete: type === 'signup' ? 'new-password' : 'current-password',
            defaultValue: formState?.data.password,
            required: true,
            disabled: isPending,
          }}
          endAdornment={
            <PasswordVisibilityToggler
              isVisible={isPasswordVisible}
              onClick={() => setIsPasswordVisible((v) => !v)}
              isDisabled={isPending}
            />
          }
        />
      </fieldset>
      {formState?.isError && <AuthFormError errorMessage={formState.errorMessage} />}
      <button
        type="submit"
        disabled={isPending}
        className="text-bold min-h-14 w-full rounded-full bg-gray-200 p-4 text-center text-gray-900 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 dark:bg-gray-600 dark:text-gray-50 hover:dark:bg-gray-500 disabled:dark:bg-gray-700"
      >
        {isPending ? (
          <Spinner
            width={20}
            height={20}
            className="inline animate-spin fill-gray-500 text-center text-gray-50 dark:fill-gray-50 dark:text-gray-600"
          />
        ) : type === 'login' ? (
          'Log In'
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  );
}
