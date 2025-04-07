import { delay, http, HttpResponse, StrictResponse } from 'msw';
import * as userService from '../data-services/user.ts';
import { AuthRequestBody, AuthResponseBody } from './types.ts';
import { getErrorMessage, StatusError } from '../utils.ts';
import { AuthenticatedUser } from '../types/user.ts';
import { tokenKey } from '../../services/auth/auth.service.ts';

const DELAY_MS = import.meta.env.MODE === 'test' ? 0 : 500;

const endpoints = {
  login:
    /^https:\/\/identitytoolkit\.googleapis\.com\/v1\/accounts:signInWithPassword.*$/,
  register: /^https:\/\/identitytoolkit\.googleapis\.com\/v1\/accounts:signUp.*$/,
  getMe: /^https:\/\/identitytoolkit\.googleapis\.com\/v1\/accounts:lookup.*$/,
};

export const user = [
  http.post<never, AuthRequestBody>(
    endpoints.login,
    async ({ request }): Promise<HttpResponse | StrictResponse<AuthResponseBody>> => {
      const { email, password } = await request.json();
      try {
        const user = await userService.authenticate({ email, password });
        await delay(DELAY_MS);
        return HttpResponse.json(user);
      } catch (error) {
        await delay(DELAY_MS);
        return new HttpResponse(null, {
          status: 400,
          statusText: getErrorMessage(error),
        });
      }
    },
  ),

  http.post<never, AuthRequestBody>(
    endpoints.register,
    async ({ request }): Promise<HttpResponse | StrictResponse<AuthResponseBody>> => {
      const { email, password } = await request.json();
      try {
        await userService.create({ email, password });
        const user = await userService.authenticate({ email, password });
        await delay(DELAY_MS);
        return HttpResponse.json(user);
      } catch (error) {
        await delay(DELAY_MS);
        return new HttpResponse(null, {
          status: 400,
          statusText: getErrorMessage(error),
        });
      }
    },
  ),

  http.post<{ idToken: string }, never>(
    endpoints.getMe,
    async (): Promise<HttpResponse | StrictResponse<{ users: AuthenticatedUser[] }>> => {
      try {
        const { user, token } = await getMeUser();
        await delay(DELAY_MS);
        if (token && user) {
          return HttpResponse.json({ users: [{ ...user, idToken: token }] });
        }

        return HttpResponse.json({ users: [] });
      } catch (e) {
        await delay(DELAY_MS);
        return new HttpResponse(null, {
          status: 401,
          statusText: getErrorMessage(e),
        });
      }
    },
  ),
];

async function getMeUser() {
  const token = window.localStorage.getItem(tokenKey);

  if (!token) {
    return { user: null, token: null };
  }

  let userId;
  try {
    userId = atob(token);
  } catch {
    const error = new StatusError('Invalid token. Please login again.');
    error.status = 401;
    throw error;
  }

  const user = await userService.read(userId);
  return { user, token };
}
