import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  buildMovieCredits,
  buildMovieItemWithDetails,
  buildUserAuthData,
} from '../../mocks/generate';
import * as userDataService from '../../mocks/data-services/user';
import * as authService from '../../mocks/auth-service';
import * as movieDataService from '../../mocks/data-services/movies';
import * as creditsDataService from '../../mocks/data-services/credits';
import App from '../../app/app';
import { renderWithProviders } from '../../mocks/app-test-utils';
import {
  formatBudget,
  formatCountryList,
  formatDate,
  formatDuration,
  formatLanguage,
} from '../../services/movies/movies.utils.service';

const createMovieWithCredits = async () => {
  const movie = buildMovieItemWithDetails();
  const credits = buildMovieCredits();
  await movieDataService.create(movie);
  await creditsDataService.create(movie.id, credits);
  return { movie, credits };
};

test('renders movie data', async () => {
  const {
    movie,
    credits: { cast, crew },
  } = await createMovieWithCredits();
  const directors = crew.filter(({ job }) => job === 'Director').map(({ name }) => name);
  const writers = crew.filter(({ job }) => job === 'Writer').map(({ name }) => name);
  const screenplay = crew
    .filter(({ job }) => job === 'Screenplay')
    .map(({ name }) => name);
  const starring = cast.slice(0, 12).map(({ name }) => name);
  await renderWithProviders(<App />, { route: `/movie/${movie.id}` });

  expect(screen.getByRole('heading', { name: movie.title })).toBeInTheDocument();
  expect(screen.getByText(movie.release_date.slice(0, 4))).toBeInTheDocument();
  expect(
    screen.getByText(movie.genres.map(({ name }) => name).join(', ')),
  ).toBeInTheDocument();
  expect(screen.getByText(movie.overview)).toBeInTheDocument();
  expect(screen.getByText(movie.original_title)).toBeInTheDocument();
  expect(screen.getByText(formatLanguage(movie.original_language)!)).toBeInTheDocument();
  expect(screen.getByText(formatCountryList(movie.origin_country))).toBeInTheDocument();
  directors.forEach((person) => expect(screen.getByText(person)).toBeInTheDocument());
  writers.forEach((person) => expect(screen.getByText(person)).toBeInTheDocument());
  screenplay.forEach((person) => expect(screen.getByText(person)).toBeInTheDocument());
  starring.forEach((person) => expect(screen.getByText(person)).toBeInTheDocument());
  expect(screen.getByText(formatDuration(movie.runtime))).toBeInTheDocument();
  expect(screen.getByText(formatBudget(movie.budget))).toBeInTheDocument();
  expect(screen.getByText(movie.status)).toBeInTheDocument();
  expect(screen.getByText(formatDate(movie.release_date))).toBeInTheDocument();
  expect(screen.getByText(movie.homepage)).toBeInTheDocument();
});

test.todo('authenticated user can add movie to list and delete from list', async () => {
  const userAuthData = buildUserAuthData();
  await userDataService.create(userAuthData);
  const authenticatedUser = await userDataService.authenticate(userAuthData);
  window.localStorage.setItem(authService.localStorageKey, authenticatedUser.token);

  const { movie } = await createMovieWithCredits();
  await renderWithProviders(<App />, { route: `/movie/${movie.id}` });

  const addToFavoritesName = { name: /add movie to favorites/i };
  const removeFromFavoritesName = { name: /remove movie from favorites/i };
  const addToWatchlistName = { name: /add movie to watchlist/i };
  const removeFromWatchlist = { name: /remove movie from watchlist/i };

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
  const { movie } = await createMovieWithCredits();
  await renderWithProviders(<App />, { route: `/movie/${movie.id}` });

  const addToFavoritesButton = screen.getByRole('button', {
    name: /add movie to favorites/i,
  });
  await userEvent.click(addToFavoritesButton);

  expect(
    screen.queryByRole('button', { name: /remove movie from favorites/i }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
});

test("unauthenticated user can't add movie to watchlist", async () => {
  const { movie } = await createMovieWithCredits();
  await renderWithProviders(<App />, { route: `/movie/${movie.id}` });

  const addToFavoritesButton = screen.getByRole('button', {
    name: /add movie to watchlist/i,
  });
  await userEvent.click(addToFavoritesButton);

  expect(
    screen.queryByRole('button', { name: /remove movie from watchlist/i }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
});
