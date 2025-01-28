import { setupWorker } from 'msw/browser';
import { user } from '../handlers/user';
import { movies } from '../handlers/movies';
import { listItems } from '../handlers/list-items';

export const getServer = ({ isMockMovies }: { isMockMovies: boolean }) =>
  isMockMovies
    ? setupWorker(...user, ...movies, ...listItems)
    : setupWorker(...user, ...listItems);
