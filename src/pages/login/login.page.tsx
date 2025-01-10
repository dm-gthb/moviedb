import { Link } from 'react-router';
import { LoginForm } from '../../components/auth/auth-form/auth-form';
import { appRoute } from '../../services/router.service';

export function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <div>
        Don't have an account? <Link to={appRoute.signup}>Sign up here</Link>.
      </div>
    </div>
  );
}
