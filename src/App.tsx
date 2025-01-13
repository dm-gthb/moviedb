import { Route, Routes } from 'react-router';
import { PageHeader } from './components/shared/page-header/page-header';
import { DiscoverPage } from './pages/discover/discover.page';
import { appRoute } from './services/router.service';
import { SearchPage } from './pages/search/search.page';
import { WatchlistPage } from './pages/watchlist/watchlist.page';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { RatingPage } from './pages/rating/rating';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { MoviePage } from './pages/movie/movie.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { RequireAuth } from './components/auth/require-auth/require-auth';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from './components/shared/error-message/error-message';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <PageHeader />
      <main>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Routes>
            <Route path="/" element={<DiscoverPage />} />
            <Route path={`${appRoute.search}/:searchTerm`} element={<SearchPage />} />
            <Route
              path={`${appRoute.watchlist}`}
              element={
                <RequireAuth>
                  <WatchlistPage />
                </RequireAuth>
              }
            />
            <Route
              path={`${appRoute.favorites}`}
              element={
                <RequireAuth>
                  <FavoritesPage />
                </RequireAuth>
              }
            />
            <Route
              path={`${appRoute.rating}`}
              element={
                <RequireAuth>
                  <RatingPage />
                </RequireAuth>
              }
            />
            <Route path={`${appRoute.login}`} element={<LoginPage />} />
            <Route path={`${appRoute.signup}`} element={<SignupPage />} />
            <Route path={`${appRoute.movie}/:id`} element={<MoviePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </ErrorBoundary>
  );
}

export default App;
