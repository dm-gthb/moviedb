export type User = {
  id: string;
  username: string;
  passwordHash: string;
};

export type AuthData = {
  username: string;
  password: string;
};

export type AuthenticatedUser = {
  id: string;
  username: string;
  token: string;
};
