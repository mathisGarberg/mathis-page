import {
  ActionAuthLogin,
  ActionAuthLoginFailed,
  ActionAuthLoginSuccess,
  ActionAuthLogout,
} from './auth.actions';
import { User } from '../../models/user.model';
import { createReducer, on } from '@ngrx/store';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: Error;
  isLoadingAuth: boolean;
}

export interface AppState {
  auth: AuthState;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoadingAuth: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(ActionAuthLogin, (state) => ({ ...state, isLoadingAuth: true })),
  on(ActionAuthLoginSuccess, (state, { token, email }) => ({
    ...state,
    isAuthenticated: true,
    isLoadingAuth: false,
    user: {
      token,
      email,
    },
    error: null,
  })),
  on(ActionAuthLoginFailed, (state, { error }) => ({
    ...state,
    isLoadingAuth: false,
    error: error,
  })),
  on(ActionAuthLogout, () => ({ ...initialAuthState }))
);
