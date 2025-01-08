import { setupWorker } from 'msw/browser';
import { user } from './handlers/user';
import { movies } from './handlers/movies';
import { listItems } from './handlers/list-items';
import { rating } from './handlers/rating';

export const worker = setupWorker(...user, ...movies, ...listItems, ...rating);
