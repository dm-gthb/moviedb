import { AuthData, User } from '../auth/auth.types.service';
import { endpoints } from './endpoints.api.service';
import { fetchDataWithConfig } from './api.utils.service';

export async function getMe({ token }: { token?: string }): Promise<User> {
  const authData: { users: User[] } = await fetchData(endpoints.getMe(), {
    method: 'POST',
    body: JSON.stringify({ idToken: token }),
  });
  return authData.users[0];
}

export async function login(authData: AuthData) {
  const user: User = await fetchData(endpoints.login(), {
    method: 'POST',
    body: JSON.stringify({ ...authData, returnSecureToken: true }),
  });
  return user;
}

export async function register(authData: AuthData) {
  const user: User = await fetchData(endpoints.register(), {
    method: 'POST',
    body: JSON.stringify({ ...authData, returnSecureToken: true }),
  });
  return user;
}

async function fetchData(url: string, config = {}) {
  return fetchDataWithConfig({ url, config });
}
