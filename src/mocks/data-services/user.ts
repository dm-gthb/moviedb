import { AuthData, AuthenticatedUser, User } from '../types/user';
import { StatusError } from '../utils';

const usersKey = '__moviedb_users__';

let users: Record<string, User> = {};

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

export async function authenticate({
  email,
  password,
}: AuthData): Promise<AuthenticatedUser> {
  validateUserForm({ email, password });
  const id = hash(email);
  const user = users[id] || {};
  if (user.passwordHash === hash(password)) {
    return { ...sanitizeUser(user), idToken: btoa(user.id) };
  }
  const error = new StatusError('Invalid email or password.');
  error.status = 400;
  throw error;
}

export async function create({ email, password }: AuthData) {
  validateUserForm({ email, password });
  const id = hash(email);
  const passwordHash = hash(password);

  if (users[id]) {
    const error = new StatusError(`Cannot create a new user with email "${email}".`);
    error.status = 400;
    throw error;
  }
  users[id] = { id, email, passwordHash };
  storeUsersData();
  return read(id);
}

export async function read(id: string) {
  validateUserId(id);
  return sanitizeUser(users[id]);
}

export async function reset() {
  users = {};
  storeUsersData();
}

function validateUserId(id: string) {
  load();
  if (!users[id]) {
    const error = new StatusError(`No user with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}

function validateUserForm({ email, password }: AuthData) {
  if (!email) {
    const error = new StatusError('Email is required');
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error = new StatusError('Password is required');
    error.status = 400;
    throw error;
  }
}

function sanitizeUser(user: User) {
  return { localId: user.id };
}

function hash(input: string) {
  return `hashed-${input}`;
}
