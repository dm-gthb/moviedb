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
    <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mb-10">{isLogin ? 'Log In' : 'Sign Up'}</h1>
      <div className="w-full sm:w-80 mb-4">
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
          className="underline disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={() => setAuthType(isLogin ? 'signup' : 'login')}
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </div>
  );
}
