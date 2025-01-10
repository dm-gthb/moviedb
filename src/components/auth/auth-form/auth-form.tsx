import { FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { useAuthMutation } from '../../../queries/auth.query';

const PASSWORD_MIN_LENGTH = 8;

interface AuthElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface AuthFormInterface extends HTMLFormElement {
  elements: AuthElements;
}

function AuthForm({ isSignup = false }: { isSignup?: boolean }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useLocation();
  const { mutate, isPending, isError, error } = useAuthMutation({ isSignup });

  useEffect(() => {
    if (user) {
      navigate(state?.path || '/');
    }
  }, [user, navigate, state?.path]);

  const hanldeSubmit = (e: FormEvent<AuthFormInterface>) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    mutate(
      {
        username: formEl.elements.username.value,
        password: formEl.elements.password.value,
      },
      {
        onSuccess: () => {
          e.currentTarget.reset();
          navigate(state?.path || '/');
        },
      },
    );
  };

  return (
    <form onSubmit={hanldeSubmit}>
      <label htmlFor="username">username</label>
      <input type="text" name="username" autoComplete="username" required />
      <label htmlFor="passord">password</label>
      <input
        type="password"
        name="password"
        minLength={PASSWORD_MIN_LENGTH}
        autoComplete={isSignup ? 'new-password' : 'current-password'}
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {isError && <p>{error?.message}</p>}
    </form>
  );
}

export function LoginForm() {
  return <AuthForm />;
}

export function SignupForm() {
  return <AuthForm isSignup />;
}
