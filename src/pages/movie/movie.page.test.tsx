import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  buildMovieCredits,
  buildMovieItemWithDetails,
  buildMovieRecommendations,
  buildUserAuthData,
} from '../../mocks/generate';
import * as userDataService from '../../mocks/data-services/user';
import * as authService from '../../mocks/auth-service';
import * as movieDataService from '../../mocks/data-services/movies';
import * as creditsDataService from '../../mocks/data-services/credits';
import * as recommendationsDataService from '../../mocks/data-services/recommendations';
import { AppProviders } from '../../app/app-providers';
import App from '../../app/app';

const waitForLoadingToFinish = async () =>
  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

const renderMoviePage = async (movieId: number) => {
  window.history.pushState({}, 'Test Movie Page', `/movie/${movieId}`);
  render(<App />, { wrapper: AppProviders });
  await waitForLoadingToFinish();
};

const createMovieWithCreditsAndRecommendations = async () => {
  const movie = buildMovieItemWithDetails();
  const credits = buildMovieCredits();
  const recommendations = buildMovieRecommendations();
  await movieDataService.create(movie);
  await creditsDataService.create(movie.id, credits);
  await recommendationsDataService.create(movie.id, recommendations);
  return { movie, credits, recommendations };
};

test('renders movie data', async () => {
  const { movie, credits, recommendations } =
    await createMovieWithCreditsAndRecommendations();
  await renderMoviePage(movie.id);

  expect(screen.getByRole('heading', { name: movie.title })).toBeInTheDocument();
  expect(screen.getByText(movie.vote_average.toFixed(1))).toBeInTheDocument();
  expect(screen.getByText(movie.overview)).toBeInTheDocument();
  expect(screen.getByText(movie.release_date)).toBeInTheDocument();
  expect(screen.getByText(movie.release_date)).toBeInTheDocument();
  expect(screen.getByText(movie.runtime)).toBeInTheDocument();
  expect(
    screen.getByText(movie.genres.map(({ name }) => name).join(', ')),
  ).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /movie poster/i })).toHaveAttribute(
    'src',
    movie.poster_path,
  );
  expect(
    screen.getByText(
      credits.cast
        .slice(0, 5)
        .map(({ name }) => name)
        .join(', '),
    ),
  ).toBeInTheDocument();
  recommendations.slice(0, 5).forEach(({ title }) => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});

test('authenticated user can add movie to list and delete from list', async () => {
  const userAuthData = buildUserAuthData();
  await userDataService.create(userAuthData);
  const authenticatedUser = await userDataService.authenticate(userAuthData);
  window.localStorage.setItem(authService.localStorageKey, authenticatedUser.token);

  const { movie } = await createMovieWithCreditsAndRecommendations();
  await renderMoviePage(movie.id);

  const addToFavoritesName = { name: /add to favorites/i };
  const removeFromFavoritesName = { name: /remove from favorites/i };
  const addToWatchlistName = { name: /add to watchlist/i };
  const removeFromWatchlist = { name: /remove from watchlist/i };

  // toggle favorites
  const addToFavoritesButton = screen.getByRole('button', addToFavoritesName);
  await userEvent.click(addToFavoritesButton);
  expect(addToFavoritesButton).toBeDisabled();
  await waitForElementToBeRemoved(() => screen.queryByRole('button', addToFavoritesName));
  const removeFromFavoritesButton = screen.getByRole('button', removeFromFavoritesName);
  expect(removeFromFavoritesButton).toBeInTheDocument();
  await userEvent.click(removeFromFavoritesButton);
  // no toBeDisabled, no waitForElementToBeRemoved here because of optimistic updates
  expect(addToFavoritesButton).toBeInTheDocument();

  // toggle watchlist
  const addToWatchlistButton = screen.getByRole('button', addToWatchlistName);
  await userEvent.click(addToWatchlistButton);
  expect(addToWatchlistButton).toBeDisabled();
  await waitForElementToBeRemoved(() => screen.queryByRole('button', addToWatchlistName));
  const removeFromWatchlistButton = screen.getByRole('button', removeFromWatchlist);
  expect(removeFromWatchlistButton).toBeInTheDocument();
  await userEvent.click(removeFromWatchlistButton);
  // no toBeDisabled, no waitForElementToBeRemoved here because of optimistic updates
  expect(addToWatchlistButton).toBeInTheDocument();
});

test("unauthenticated user can't add movie to favorites", async () => {
  const { movie } = await createMovieWithCreditsAndRecommendations();
  await renderMoviePage(movie.id);

  const addToFavoritesButton = screen.getByRole('button', { name: /add to favorites/i });
  await userEvent.click(addToFavoritesButton);

  expect(
    screen.queryByRole('button', { name: /remove from favorites/i }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test("unauthenticated user can't add movie to watchlist", async () => {
  const { movie } = await createMovieWithCreditsAndRecommendations();
  await renderMoviePage(movie.id);

  const addToFavoritesButton = screen.getByRole('button', { name: /add to watchlist/i });
  await userEvent.click(addToFavoritesButton);

  expect(
    screen.queryByRole('button', { name: /remove from watchlist/i }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test.todo('authenticated user can add rating for movie', async () => {});
test.todo('unauthenticated user can not add movie rating', async () => {});
