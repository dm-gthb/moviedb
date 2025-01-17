import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { FormEvent, useState } from 'react';

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e: FormEvent<SearchForm>) => {
    e.preventDefault();
    const searchTermValue = e.currentTarget.elements.searchTerm.value.trim();

    if (searchTermValue) {
      navigate(`/search/${searchTermValue}`);
      e.currentTarget.reset();
    }
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <div>
          <button onClick={() => setIsSearchPanel(!isSearchPanel)}>
            {isSearchPanel ? <span>hide search bar</span> : <span>show search bar</span>}
          </button>
          {user ? (
            <>
              <Link to="/lists">my lists</Link>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <Link to="/login">login</Link>
          )}
        </div>
      </nav>
      {isSearchPanel && (
        <form onSubmit={handleSubmit}>
          <input type="search" name="searchTerm" placeholder="Search" />
        </form>
      )}
    </header>
  );
}
