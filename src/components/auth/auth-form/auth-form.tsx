import { useActionState, useState } from 'react';
import { AuthData } from '../../../services/auth/auth.types.service';
import { getErrorMessage } from '../../../services/utils.service';
import { FormField } from '../../ui/forms/form-field/form-field';
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

  const formErrors = formState?.isError ? [formState.errorMessage] : undefined;

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
          errors={formErrors}
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
