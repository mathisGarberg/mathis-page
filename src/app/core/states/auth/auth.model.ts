import * as faker from 'faker/locale/en_US';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: Error;
  isLoadingAuth: boolean;
}

export interface User {
  email: string;
  token: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export const generateCredentials = (): Credentials => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const generateUser = (): User => {
  return {
    email: faker.internet.email(),
    token: 'Bearer 123456',
  };
};
