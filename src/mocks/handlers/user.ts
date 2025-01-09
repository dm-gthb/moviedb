import { delay, http, HttpResponse, StrictResponse } from 'msw';
import * as userService from '../data-services/user.ts';
import { getToken, getUser } from './utils.ts';
import { AuthRequestBody, AuthResponseBody } from './types.ts';
import { endpoints } from '../../services/endpoints.service.ts';
import { getErrorMessage } from '../utils.ts';

const DELAY_MS = 1000;

export const user = [
  http.post<never, AuthRequestBody>(
    `${endpoints.login()}`,
    async ({ request }): Promise<HttpResponse | StrictResponse<AuthResponseBody>> => {
      const { username, password } = await request.json();
      let user;
      try {
        user = await userService.authenticate({ username, password });
      } catch (error) {
        return new HttpResponse(null, {
          status: 400,
          statusText: getErrorMessage(error),
        });
      }
      await delay(DELAY_MS);
      return HttpResponse.json({ user });
    },
  ),

  http.post<never, AuthRequestBody>(
    `${endpoints.register()}`,
    async ({ request }): Promise<HttpResponse | StrictResponse<AuthResponseBody>> => {
      const { username, password } = await request.json();
      let user;
      try {
        await userService.create({ username, password });
        user = await userService.authenticate({ username, password });
      } catch (error) {
        return new HttpResponse(null, {
          status: 400,
          statusText: getErrorMessage(error),
        });
      }
      await delay(DELAY_MS);
      return HttpResponse.json({ user });
    },
  ),

  http.get<never, never>(
    `${endpoints.getMe()}`,
    async ({ request }): Promise<HttpResponse | StrictResponse<AuthResponseBody>> => {
      try {
        const user = await getUser(request);
        const token = getToken(request)!;
        return HttpResponse.json({ user: { ...user, token } });
      } catch (e) {
        return new HttpResponse(null, {
          status: 401,
          statusText: getErrorMessage(e),
        });
      }
    },
  ),
];
