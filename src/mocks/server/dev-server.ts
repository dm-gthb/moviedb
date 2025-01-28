import { setupWorker } from 'msw/browser';
import pkg from '../../../package.json';
import { user } from '../handlers/user';
import { movies } from '../handlers/movies';
import { listItems } from '../handlers/list-items';

const isMockMovies = false;

const { pathname } = new URL(pkg.homepage);

export const startServer = async () => {
  const worker = isMockMovies
    ? setupWorker(...user, ...listItems, ...movies)
    : setupWorker(...user, ...listItems);

  return worker.start({
    onUnhandledRequest: 'bypass',
    ...(import.meta.env.PROD && {
      serviceWorker: { url: pathname + 'mockServiceWorker.js' },
    }),
  });
};
