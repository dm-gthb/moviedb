import { screen } from '@testing-library/react';
import { buildMovieItemWithDetails } from '../../mocks/generate';
import * as movieDataService from '../../mocks/data-services/movies';
import { renderWithProviders } from '../../mocks/app-test-utils';
import App from '../../app/app';

beforeEach(() => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

test('renders movie cards', async () => {
  const movies = new Array(10).fill('').map(buildMovieItemWithDetails);
  await Promise.all(movies.map((movie) => movieDataService.create(movie)));
  await renderWithProviders(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /discover movies/i }));
  expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(10);
  expect(screen.getAllByRole('img', { name: /movie poster/i }).length).toBe(10);
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

test.todo('movies filter works correctly', async () => {});
