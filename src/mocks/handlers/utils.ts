import { DefaultBodyType, StrictRequest } from 'msw';
import * as userService from '../data-services/user';
import { StatusError } from '../utils';

export async function getUser(req: StrictRequest<DefaultBodyType>) {
  const token = getToken(req);
  if (!token) {
    const error = new StatusError('A token must be provided');
    error.status = 401;
    throw error;
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
  return user;
}

export function getToken(req: StrictRequest<DefaultBodyType>) {
  return req.headers.get('Authorization')?.replace('Bearer ', '');
}
