import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';

export function CheckAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}
