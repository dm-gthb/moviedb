import '@testing-library/jest-dom/vitest';
import { server } from './mocks/server/test-server';
import * as userDataService from './mocks/data-services/user';
import * as authService from './mocks/auth-service';
import * as movieDataService from './mocks/data-services/movies';
import * as creditsDataService from './mocks/data-services/credits';
import * as recommendationsDataService from './mocks/data-services/recommendations';
import * as listItemsDataService from './mocks/data-services/list-items';
import * as ratingDataService from './mocks/data-services/rating';

beforeAll(() => {
  server.listen();

  const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
  }));

  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
  vi.stubGlobal('scrollTo', vi.fn());
});

beforeEach(async () => {
  await Promise.all([
    authService.logout(),
    userDataService.reset(),
    movieDataService.reset(),
    creditsDataService.reset(),
    recommendationsDataService.reset(),
    listItemsDataService.reset(),
    ratingDataService.reset(),
  ]);
});

afterEach(async () => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  vi.unstubAllGlobals();
});
