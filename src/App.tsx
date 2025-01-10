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

function App() {
  return (
    <>
      <PageHeader />
      <main>
        <Routes>
          <Route path="/" element={<DiscoverPage />} />
          <Route path={`${appRoute.search}`} element={<SearchPage />} />
          <Route path={`${appRoute.watchlist}`} element={<WatchlistPage />} />
          <Route path={`${appRoute.favorites}`} element={<FavoritesPage />} />
          <Route path={`${appRoute.rating}`} element={<RatingPage />} />
          <Route path={`${appRoute.login}`} element={<LoginPage />} />
          <Route path={`${appRoute.signup}`} element={<SignupPage />} />
          <Route path={`${appRoute.movie}/:id`} element={<MoviePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
