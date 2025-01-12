import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
