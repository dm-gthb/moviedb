import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  switchTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeContext');
  }

  return context;
}
