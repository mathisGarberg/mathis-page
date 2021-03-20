import {
  ActionAuthLogin,
  ActionAuthLoginFailed,
  ActionAuthLoginSuccess,
  ActionAuthLogout,
} from './auth.actions';
import { AuthState } from './auth.model';
import { createReducer, on } from '@ngrx/store';

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
