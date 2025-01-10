import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../services/auth/auth-context.service';
import { FormEvent } from 'react';

interface SearchFormElements extends HTMLFormControlsCollection {
  searchTerm: HTMLInputElement;
}
interface SearchForm extends HTMLFormElement {
  elements: SearchFormElements;
}

export function PageHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
      <Link to="/">home</Link>
      <form onSubmit={handleSubmit}>
        <input type="search" name="searchTerm" />
      </form>
      {user ? (
        <>
          <Link to="/watchlist">watchlist</Link>
          <Link to="/favorites">favorites</Link>
          <Link to="/rating">my ratings</Link>
          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <Link to="/login">login</Link>
      )}
    </header>
  );
}
