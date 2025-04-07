import { setupServer } from 'msw/node';
import { user } from '../handlers/user';
import { movies } from '../handlers/movies';
import { listItems } from '../handlers/list-items';

const server = setupServer(...user, ...movies, ...listItems);

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

export { server };
