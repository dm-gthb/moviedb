import { createContext, useContext } from 'react';
import { AuthData, User } from './auth.types.service';

type AuthContextType = {
  user: User | null;
  login: (authData: AuthData) => Promise<void>;
  register: (authData: AuthData) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}
