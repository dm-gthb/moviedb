import { setupServer } from 'msw/node';
import { user } from '../handlers/user';
import { movies } from '../handlers/movies';
import { listItems } from '../handlers/list-items';
import { person } from '../handlers/person';

const server = setupServer(...user, ...movies, ...listItems, ...person);

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

export { server };
