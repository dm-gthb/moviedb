import { ReactNode, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import * as authService from '../../../services/auth/auth.service';
import { AuthData, User } from '../../../services/auth/auth.types.service';
import { AuthContext } from '../../../services/auth/auth-context.service';
import { movieListItemsOptions } from '../../../queries/list-items.queries';
import { ErrorMessage } from '../../shared/error-message/error-message';
import { Spinner } from '../../shared/spinner/spinner';
import { getMovieListItems } from '../../../services/list-items/list-items.service';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthStateChange((user) => {
      setIsLoading(true);
      setError(null);

      if (user) {
        getMovieListItems()
          .then((listItems) => {
            queryClient.setQueryData(movieListItemsOptions().queryKey, listItems);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }

      setUser(user);
    });

    return unsubscribe;
  }, [queryClient]);

  const register = (authData: AuthData) =>
    authService.register(authData).then(({ user }) => setUser(user));

  const login = (authData: AuthData) =>
    authService.login(authData).then(({ user }) => setUser(user));

  const logout = () => authService.logout().then(() => setUser(null));

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
