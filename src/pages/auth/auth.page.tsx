import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LoginForm, SignupForm } from '../../components/auth/auth-form/auth-form';
import { useAuth } from '../../services/auth/auth-context.service';

export function AuthPage() {
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login, register } = useAuth();
  const navigateOnSuccessAuth = () => navigate(state?.path || '/');
  const isLogin = authType === 'login';

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-8 py-4">
      <h1 className="mb-10 text-4xl font-bold">{isLogin ? 'Log In' : 'Sign Up'}</h1>
      <div className="mb-4 w-full sm:w-96">
        <div>
          {isLogin ? (
            <LoginForm
              onSubmit={async (data) => {
                await login(data);
                navigateOnSuccessAuth();
              }}
            />
          ) : (
            <SignupForm
              onSubmit={async (data) => {
                await register(data);
                navigateOnSuccessAuth();
              }}
            />
          )}
        </div>
      </div>
      <div>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          className="underline disabled:cursor-not-allowed disabled:text-gray-400"
          onClick={() => setAuthType(isLogin ? 'signup' : 'login')}
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </div>
  );
}
