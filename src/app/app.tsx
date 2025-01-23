import { Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { PageHeader } from '../components/shared/page-header/page-header';
import { DiscoverPage } from '../pages/discover/discover.page';
import { appRoute } from '../services/router.service';
import { SearchPage } from '../pages/search/search.page';
import { MoviePage } from '../pages/movie/movie.page';
import { NotFoundPage } from '../pages/not-found/not-found.page';
import { RequireAuth } from '../components/auth/require-auth/require-auth';
import { ErrorMessage } from '../components/shared/error-message/error-message';
import { MoviesLists } from '../pages/movies-lists/movies-lists.page';
import { CheckAuth } from '../components/auth/check-auth/check-auth';
import { AuthPage } from '../pages/auth/auth.page';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <PageHeader />
      <main>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <AppRoutes />
        </ErrorBoundary>
      </main>
    </ErrorBoundary>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DiscoverPage />} />
      <Route path={`${appRoute.search}/:searchTerm`} element={<SearchPage />} />
      <Route
        path={`${appRoute.lists}`}
        element={
          <RequireAuth>
            <MoviesLists />
          </RequireAuth>
        }
      />
      <Route
        path={`${appRoute.auth}`}
        element={
          <CheckAuth>
            <AuthPage />
          </CheckAuth>
        }
      />
      <Route path={`${appRoute.movie}/:id`} element={<MoviePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
