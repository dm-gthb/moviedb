import { ReactNode, useEffect, useState } from 'react';
import * as authService from '../../../mocks/auth-service';
import { AuthData, User } from '../../../services/auth/auth.types.service';
import api from '../../../services/api/api.service';
import { AuthContext } from '../../../services/auth/auth-context.service';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getInitData = async () => {
      const token = await authService.getToken();
      if (token) {
        api
          .getMe({ token })
          .then(({ user }) => {
            setUser(user);
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
  }, []);

  const login = (loginData: AuthData) =>
    authService.login(loginData).then((user) => setUser(user));

  const logout = () => authService.logout().then(() => setUser(null));

  const register = (data: AuthData) =>
    authService.register(data).then((user) => setUser(user));

  if (isLoading) {
    return <p>...loading app</p>;
  }

  if (error) {
    return <span>errror</span>;
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
