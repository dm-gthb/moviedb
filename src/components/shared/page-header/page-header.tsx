import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { appRoute } from '../../../services/router.service';
import { SearchForm } from './search-form';
import { SearchToggler } from './search-toggler';
import { ThemeToggler } from './theme-toggler';

export function PageHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSearchPanel, setIsSearchPanel] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscapeKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchPanel(false);
        searchButtonRef.current?.focus();
      }
    };

    if (isSearchPanel) {
      searchInputRef.current?.focus();
      window.addEventListener('keydown', handleEscapeKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyPress);
    };
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
                <NavLink to={appRoute.lists} className={getNavlinkClass}>
                  My Lists
                </NavLink>
                <button onClick={handleLogout} className={hoverUnderlineClass}>
                  Logout
                </button>
              </>
            )}
            {!user && (
              <NavLink to={appRoute.auth} className={getNavlinkClass}>
                Login
              </NavLink>
            )}
            <ThemeToggler />
            <SearchToggler
              buttonRef={searchButtonRef}
              isSearchPanel={isSearchPanel}
              onClick={() => setIsSearchPanel(!isSearchPanel)}
            />
          </div>
        </nav>
        <div
          className={`shadow-md absolute z-50 left-[50%] translate-x-[-50%] w-full bg-white dark:bg-gray-950 pb-16 ${isSearchPanel ? 'visible' : 'collapse'}`}
        >
          <SearchForm onSubmit={handleSearchFormSubmit} inputRef={searchInputRef} />
        </div>
      </header>
    </div>
  );
}
