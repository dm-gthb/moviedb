export type User = {
  id: string;
  email: string;
  passwordHash: string;
};

export type AuthData = {
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  localId: string;
  idToken: string;
};
