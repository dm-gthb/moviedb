import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../ui/buttons/icon-button/icon-button';
import { useTheme } from '../../services/theme/theme-context.service';

export function ThemeToggler() {
  const { theme, switchTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <IconButton
      onClick={switchTheme}
      Icon={isLight ? SunIcon : MoonIcon}
      label={isLight ? 'Activate dark mode' : 'Activate light mode'}
    />
  );
}
