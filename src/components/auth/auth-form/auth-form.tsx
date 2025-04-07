import { useActionState, useState } from 'react';
import { AuthData } from '../../../services/auth/auth.types.service';
import { getErrorMessage } from '../../../services/utils.service';
import { AuthFormError } from './auth-form-error';
import { PasswordVisibilityToggler } from './password-visibility-toggler';
import { SubmitButton } from './submit-button';

const PASSWORD_MIN_LENGTH = 8;

export type AuthFormProps = {
  type: 'login' | 'signup';
  onSubmit: (data: AuthData) => Promise<void>;
};

type FormState = {
  data: AuthData;
  isError: boolean;
  errorMessage: string;
};

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

  const classNames = {
    input: 'p-3 border-2 rounded dark:bg-transparent disabled:text-gray-400',
    formGroup: 'flex flex-col gap-1 mb-4 last-of-type:mb-6',
  };

  return (
    <form action={formAction}>
      <fieldset disabled={isPending}>
        <div className={classNames.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            className={classNames.input}
            defaultValue={formState?.data.email}
            autoFocus
            required
          />
        </div>
        <div className={classNames.formGroup}>
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              minLength={PASSWORD_MIN_LENGTH}
              autoComplete={type === 'signup' ? 'new-password' : 'current-password'}
              className={`${classNames.input} w-full pr-11`}
              defaultValue={formState?.data.password}
              required
            />
            <PasswordVisibilityToggler
              isVisible={isPasswordVisible}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              isDisabled={isPending}
            />
          </div>
        </div>
      </fieldset>
      {formState?.isError && <AuthFormError errorMessage={formState.errorMessage} />}
      <SubmitButton type={type} isDisabled={isPending} />
    </form>
  );
}

export function LoginForm({ onSubmit }: { onSubmit: AuthFormProps['onSubmit'] }) {
  return <AuthForm type="login" onSubmit={onSubmit} />;
}

export function SignupForm({ onSubmit }: { onSubmit: AuthFormProps['onSubmit'] }) {
  return <AuthForm type="signup" onSubmit={onSubmit} />;
}
