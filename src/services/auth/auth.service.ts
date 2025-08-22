import * as api from '../api/auth.api.service';
import { AuthData, User } from './auth.types.service';

export const tokenKey = '__moviedb_auth_token__';
export const userIdKey = '__moviedb_auth_userId__';

export const login = async (authData: AuthData) => {
  try {
    const response = await api.login(authData);
    return handleUserResponse(response);
  } catch {
    throw new Error('Authentication failed. Please try again.');
  }
};

export const register = async (authData: AuthData) => {
  try {
    const response = await api.register(authData);
    return handleUserResponse(response);
  } catch {
    throw new Error('Sign up failed. Please try again.');
  }
};

export const logout = () => {
  window.localStorage.removeItem(tokenKey);
  window.localStorage.removeItem(userIdKey);
};

export const getToken = () => {
  return window.localStorage.getItem(tokenKey);
};

export const getUserId = () => {
  return window.localStorage.getItem(userIdKey);
};

function handleUserResponse(user: User) {
  window.localStorage.setItem(tokenKey, user.idToken);
  window.localStorage.setItem(userIdKey, user.localId);
  return user;
}
