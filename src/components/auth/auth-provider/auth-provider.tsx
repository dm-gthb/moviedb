import { ReactNode, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import * as authService from '../../../mocks/auth-service';
import { AuthData, User } from '../../../services/auth/auth.types.service';
import api from '../../../services/api/api.service';
import { AuthContext } from '../../../services/auth/auth-context.service';
import { listItemsOptions } from '../../../queries/list-items.queries';
import { ErrorMessage } from '../../shared/error-message/error-message';
import { Spinner } from '../../shared/spinner/spinner';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const getInitData = async () => {
      const token = await authService.getToken();
      if (token) {
        Promise.all([api.getMe({ token }), api.getListItems({ token })])
          .then(([{ user }, listItems]) => {
            setUser(user);
            queryClient.setQueryData(listItemsOptions(token).queryKey, listItems);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    };

    getInitData();
  }, [queryClient]);

  const login = (loginData: AuthData) =>
    authService.login(loginData).then((user) => setUser(user));

  const logout = () => authService.logout().then(() => setUser(null));

  const register = (data: AuthData) =>
    authService.register(data).then((user) => setUser(user));

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
