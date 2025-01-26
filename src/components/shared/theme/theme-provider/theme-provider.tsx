import { ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeContext } from '../../../../services/theme/theme-context.service';

const localStorageThemeKey = '__moviedb_theme_color_mode__';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem(localStorageThemeKey);
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
      toggleDarkThemeClass(savedTheme);
    }
  }, []);

  const switchTheme = () => {
    const themeToActivate = theme === 'light' ? 'dark' : 'light';
    setTheme(themeToActivate);
    toggleThemeClassAndStoreTheme(themeToActivate);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function toggleDarkThemeClass(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function toggleThemeClassAndStoreTheme(theme: Theme) {
  toggleDarkThemeClass(theme);
  localStorage.setItem(localStorageThemeKey, theme);
}
