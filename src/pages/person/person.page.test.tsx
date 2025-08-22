import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../app';
import { renderWithProviders } from '../../mocks/app-test-utils';
import * as personDataService from '../../mocks/data-services/person';
import {
  buildPerson,
  buildPersonMovieCredit,
  buildPersonMovieCredits,
} from '../../mocks/generate';

test('renders person details and grouped credits', async () => {
  const person = buildPerson({ id: 123, known_for_department: 'Acting' });

  await personDataService.create(person);

  const acting1 = buildPersonMovieCredit({ title: 'Acting Movie 1', character: 'Hero' });
  const acting2 = buildPersonMovieCredit({ title: 'Acting Movie 2', character: 'Lead' });
  const directing = buildPersonMovieCredit({
    title: 'Directed Movie',
    department: 'Directing',
    job: 'Director',
  });

  await personDataService.createCredits(
    buildPersonMovieCredits({ cast: [acting1, acting2], crew: [directing] }),
  );

  await renderWithProviders(<App />, { route: `/person/${person.id}` });

  expect(screen.getByRole('heading', { name: person.name })).toBeInTheDocument();
  expect(screen.getByText(/biography/i)).toBeInTheDocument();
  expect(screen.getByText(/birthdate:/i)).toBeInTheDocument();

  expect(screen.getByRole('tab', { name: /acting/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /directing/i })).toBeInTheDocument();

  expect(screen.getByText('Acting Movie 2')).toBeInTheDocument();
  expect(screen.getByText('Acting Movie 1')).toBeInTheDocument();

  const acting2Link = screen.getByRole('link', { name: /acting movie 2/i });
  expect(within(acting2Link).getByText('Lead')).toBeInTheDocument();
  expect(within(acting2Link).getAllByText(/as/i).length).toBeGreaterThan(0);

  const acting1Link = screen.getByRole('link', { name: /acting movie 1/i });
  expect(within(acting1Link).getByText('Hero')).toBeInTheDocument();
  expect(within(acting1Link).getAllByText(/as/i).length).toBeGreaterThan(0);

  await userEvent.click(screen.getByRole('tab', { name: /directing/i }));
  const directingLink = screen.getByRole('link', { name: /directed movie/i });
  expect(within(directingLink).getByText(/Director/i)).toBeInTheDocument();
});

test('renders empty state when no credits found', async () => {
  const person = buildPerson({ id: 999 });

  await personDataService.create(person);
  await personDataService.createCredits({ cast: [], crew: [] });

  await renderWithProviders(<App />, { route: `/person/${person.id}` });
  expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
});

test('renders a simple list (no tabs) when only one department exists', async () => {
  const person = buildPerson({ id: 321, known_for_department: 'Acting' });
  await personDataService.create(person);

  const acting1 = buildPersonMovieCredit({ title: 'Movie 1', character: 'Lead' });
  const acting2 = buildPersonMovieCredit({ title: 'Movie 2', character: 'Support' });

  await personDataService.createCredits(
    buildPersonMovieCredits({ cast: [acting1, acting2], crew: [] }),
  );

  await renderWithProviders(<App />, { route: `/person/${person.id}` });
  screen.debug();

  expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  expect(screen.getByText(/acting/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /movie 1/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /movie 2/i })).toBeInTheDocument();
});

test('renders "Unknown" when movie has no release date', async () => {
  const person = buildPerson({ id: 123, known_for_department: 'Acting' });
  await personDataService.create(person);

  const movieWithoutReleaseDate = buildPersonMovieCredit({
    title: 'Movie Without Date',
    character: 'Hero',
    release_date: undefined,
  });

  await personDataService.createCredits(
    buildPersonMovieCredits({ cast: [movieWithoutReleaseDate], crew: [] }),
  );

  await renderWithProviders(<App />, { route: `/person/${person.id}` });

  const movieLink = screen.getByRole('link', { name: /movie without date/i });
  expect(within(movieLink).getByText('Unknown')).toBeInTheDocument();
});
