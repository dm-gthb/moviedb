import { setupWorker } from 'msw/browser';
import { user } from '../handlers/user';
import { movies } from '../handlers/movies';
import { listItems } from '../handlers/list-items';
import { person } from '../handlers/person';

const isMockMovies = true;

export const startServer = async () => {
  const worker = isMockMovies
    ? setupWorker(...user, ...listItems, ...movies, ...person)
    : setupWorker(...user, ...listItems, ...person);

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
};
