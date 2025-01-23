import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../../services/auth/auth-context.service';
import { appRoute } from '../../../services/router.service';
import { SearchForm } from './search-form';

export function PageHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchPanel, setIsSearchPanel] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSearchPanel) {
      searchInput.current?.focus();
    }
  }, [isSearchPanel]);

  useEffect(() => {
    setIsSearchPanel(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchFormSubmit = (formData: FormData) => {
    const searchTermValue = formData.get('searchTerm') as string;
    if (searchTermValue?.trim()) {
      navigate(`${appRoute.search}/${searchTermValue}`);
      setIsSearchPanel(false);
    }
  };

  const hoverUnderlineClass =
    "relative py-2 after:block after:content-[''] after:absolute after:h-0.5 after:bg-gray-900 dark:after:bg-gray-50 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:origin-left";

  const getNavlinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? hoverUnderlineClass + ' after:scale-x-100' : hoverUnderlineClass;

  return (
    <div className="relative">
      <header className="max-w-7xl mx-auto px-8">
        <nav className="flex justify-between text-lg relative py-8">
          <NavLink to="/" className={getNavlinkClass}>
            Home
          </NavLink>
          <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
            {user && (
              <>
                <NavLink to="/lists" className={getNavlinkClass}>
                  My Lists
                </NavLink>
                <button onClick={handleLogout} className={hoverUnderlineClass}>
                  Logout
                </button>
              </>
            )}
            {!user && (
              <NavLink to="/auth" className={getNavlinkClass}>
                Login
              </NavLink>
            )}
            <ThemeToggler />
            <SearchToggler
              isSearchPanel={isSearchPanel}
              onClick={() => setIsSearchPanel(!isSearchPanel)}
            />
          </div>
        </nav>
        <div
          className={`shadow-md absolute z-50 left-[50%] translate-x-[-50%] w-full bg-white dark:bg-gray-950 pb-16 ${isSearchPanel ? 'visible' : 'collapse'}`}
        >
          <SearchForm onSubmit={handleSearchFormSubmit} inputRef={searchInput} />
        </div>
      </header>
    </div>
  );
}

function ThemeToggler() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
      {theme === 'light' ? (
        <>
          <MoonIcon width={24} height={24} className="icon-base" />
          <span className="sr-only">Activate dark mode</span>
        </>
      ) : (
        <>
          <SunIcon width={24} height={24} className="icon-base" />
          <span className="sr-only">Activate light mode</span>
        </>
      )}
    </button>
  );
}

function SearchToggler({
  isSearchPanel,
  onClick,
}: {
  isSearchPanel: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick}>
      {isSearchPanel ? (
        <>
          <XMarkIcon width={24} height={24} className="icon-base" />
          <span className="sr-only">Close search movie form</span>
        </>
      ) : (
        <>
          <MagnifyingGlassIcon width={24} height={24} className="icon-base" />
          <span className="sr-only">Open search movie form</span>
        </>
      )}
    </button>
  );
}
