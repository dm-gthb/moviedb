import { setupWorker } from 'msw/browser';
import { user } from '../handlers/user';
import { movies } from '../handlers/movies';
import { listItems } from '../handlers/list-items';

const isMockMovies = false;

export const startServer = async () => {
  const worker = isMockMovies
    ? setupWorker(...user, ...listItems, ...movies)
    : setupWorker(...user, ...listItems);

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
};
