import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../services/auth/auth-context.service';

export function useAuthMutation({ isSignup }: { isSignup: boolean }) {
  const { login, register } = useAuth();
  return useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      return isSignup ? register(data) : login(data);
    },
  });
}
