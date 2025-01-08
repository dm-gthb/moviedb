import { endpoints } from './constants';
import { AuthRequestBody, AuthResponseBody } from './handlers/types';

const localStorageKey = '__moviedb_auth_token__';

export const getToken = async () => {
  return window.localStorage.getItem(localStorageKey);
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const requestBody: AuthRequestBody = { username, password };
  const response: AuthResponseBody = await client(`${endpoints.login()}`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
  return handleUserResponse(response);
};

export const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const requestBody: AuthRequestBody = { username, password };
  const response: AuthResponseBody = await client(`${endpoints.register()}`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
  return handleUserResponse(response);
};

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};

function handleUserResponse(res: AuthResponseBody) {
  const { user } = res;
  window.localStorage.setItem(localStorageKey, user.token);
  return user;
}

async function client(url: string, config = {}) {
  try {
    const res = await fetch(`${url}`, config);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
