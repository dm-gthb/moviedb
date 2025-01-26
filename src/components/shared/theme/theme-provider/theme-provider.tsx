import { ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeContext } from '../../../../services/theme/theme-context.service';

const localStorageThemeKey = '__moviedb_theme_color_mode__';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem(localStorageThemeKey);
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
      applyThemeClass(savedTheme);
    } else {
      applyThemeClassAndStoreTheme(theme);
    }
  }, []);

  const switchTheme = () => {
    const themeToActivate = theme === 'light' ? 'dark' : 'light';
    setTheme(themeToActivate);
    applyThemeClassAndStoreTheme(themeToActivate);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyThemeClass(theme: Theme) {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
}

function applyThemeClassAndStoreTheme(theme: Theme) {
  localStorage.setItem(localStorageThemeKey, theme);
  applyThemeClass(theme);
}
