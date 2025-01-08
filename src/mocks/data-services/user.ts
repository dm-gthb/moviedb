import { AuthData, User } from '../types/user';
import { StatusError } from '../utils';

const usersKey = '__moviedb_users__';

const users: Record<string, User> = {};

const storeUsersData = () => {
  window.localStorage.setItem(usersKey, JSON.stringify(users));
};

const load = () => {
  Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey) ?? ''));
};

try {
  load();
} catch {
  storeUsersData();
}

export async function authenticate({ username, password }: AuthData) {
  validateUserForm({ username, password });
  const id = hash(username);
  const user = users[id] || {};
  if (user.passwordHash === hash(password)) {
    return { ...sanitizeUser(user), token: btoa(user.id) };
  }
  const error = new StatusError('Invalid username or password');
  error.status = 400;
  throw error;
}

export async function create({ username, password }: AuthData) {
  validateUserForm({ username, password });
  const id = hash(username);
  const passwordHash = hash(password);

  if (users[id]) {
    const error = new StatusError(
      `Cannot create a new user with the username "${username}"`,
    );
    error.status = 400;
    throw error;
  }
  users[id] = { id, username, passwordHash };
  storeUsersData();
  return read(id);
}

export async function read(id: string) {
  validateUser(id);
  return sanitizeUser(users[id]);
}

function validateUser(id: string) {
  load();
  if (!users[id]) {
    const error = new StatusError(`No user with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}

function validateUserForm({ username, password }: AuthData) {
  if (!username) {
    const error = new StatusError('A username is required');
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error = new StatusError('A password is required');
    error.status = 400;
    throw error;
  }
}

function sanitizeUser(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = user;
  return rest;
}

function hash(input: string) {
  return `hashed-${input}`;
}
