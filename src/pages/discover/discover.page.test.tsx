import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buildMovieItemWithDetails } from '../../mocks/generate';
import * as movieDataService from '../../mocks/data-services/movies';
import { renderWithProviders } from '../../mocks/app-test-utils';
import App from '../../app/app';

test('renders movie cards', async () => {
  const movies = new Array(10).fill('').map(buildMovieItemWithDetails);
  await Promise.all(movies.map((movie) => movieDataService.create(movie)));
  await renderWithProviders(<App />);
  expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(10);
});

test('renders movies with "popularity" default sort option', async () => {
  const movies = new Array(20).fill('').map(buildMovieItemWithDetails);
  await Promise.all(movies.map((movie) => movieDataService.create(movie)));
  await renderWithProviders(<App />);
  movies.sort((a, b) =>
    a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0,
  );

  for (let i = 1; i < movies.length; i++) {
    const prevMovieCard = screen.getByText(movies[i - 1].title);
    const currentMovieCard = screen.getByText(movies[i].title);
    expect(prevMovieCard.compareDocumentPosition(currentMovieCard)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  }
});

test('limits render to 20 items and show more with "load more" button click', async () => {
  const moviesToRenderCount = 30;
  const movies = new Array(moviesToRenderCount).fill('').map(buildMovieItemWithDetails);
  await Promise.all(movies.map((movie) => movieDataService.create(movie)));
  await renderWithProviders(<App />);
  expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(20);

  const loadMoreButton = screen.getByRole('button', { name: /load more/i });
  expect(loadMoreButton).toBeInTheDocument();

  await userEvent.click(loadMoreButton);
  expect(loadMoreButton).toBeDisabled();

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('button', { name: /load more/i }),
  );
  expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(moviesToRenderCount);
});

test.todo('movies filter works correctly', async () => {});
