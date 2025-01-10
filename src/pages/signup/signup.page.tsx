import { Link } from 'react-router';
import { SignupForm } from '../../components/auth/auth-form/auth-form';
import { appRoute } from '../../services/router.service';

export function SignupPage() {
  return (
    <div>
      <h1>Sign up</h1>
      <SignupForm />
      <div>
        Already have an account? <Link to={appRoute.login}>Log in here</Link>.
      </div>
    </div>
  );
}
