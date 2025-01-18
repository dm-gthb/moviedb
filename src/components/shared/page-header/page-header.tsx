import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../../services/auth/auth-context.service';
import { appRoute } from '../../../services/router.service';

interface SearchFormElements extends HTMLFormControlsCollection {
  searchTerm: HTMLInputElement;
}
interface SearchForm extends HTMLFormElement {
  elements: SearchFormElements;
}

export function PageHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchPanel, setIsSearchPanel] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchPanel) {
      searchInput.current?.focus();
    }
  }, [isSearchPanel]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e: FormEvent<SearchForm>) => {
    e.preventDefault();
    const searchTermValue = e.currentTarget.elements.searchTerm.value.trim();

    if (searchTermValue) {
      navigate(`${appRoute.search}/${searchTermValue}`);
      e.currentTarget.reset();
      setIsSearchPanel(false);
    }
  };

  return (
    <header className="max-w-7xl mx-auto px-8">
      <nav className="flex justify-between text-lg relative py-9">
        <Link to="/" className="underline-animation">
          Home
        </Link>
        <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
          {user && (
            <>
              <Link to="/lists" className="underline-animation">
                My Lists
              </Link>
              <button onClick={handleLogout} className="underline-animation">
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link to="/login" className="underline-animation">
              Login
            </Link>
          )}
          <ThemeToggler />
          <SearchToggler
            isSearchPanel={isSearchPanel}
            onClick={() => setIsSearchPanel(!isSearchPanel)}
          />
        </div>
      </nav>
      <form
        onSubmit={handleSubmit}
        className={`flex shadow-md absolute z-50 left-[50%] translate-x-[-50%] w-full bg-white dark:bg-gray-950 pb-16 justify-center ${isSearchPanel ? 'visible' : 'collapse'}`}
      >
        <input
          type="search"
          name="searchTerm"
          placeholder="search"
          className="p-4 border dark:bg-gray-950"
          ref={searchInput}
        />
      </form>
    </header>
  );
}

function ThemeToggler() {
  const [theme, setTheme] = useState('light');

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
          <span className="sr-only">Dismiss search</span>
        </>
      ) : (
        <>
          <MagnifyingGlassIcon width={24} height={24} className="icon-base" />
          <span className="sr-only">Search</span>
        </>
      )}
    </button>
  );
}
