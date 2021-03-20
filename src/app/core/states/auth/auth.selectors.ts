import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const isLoadingAuth = createSelector(
  getAuthState,
  (authState: AuthState) => authState.isLoadingAuth
);

export const isAuthorized = createSelector(
  getAuthState,
  (authState: AuthState) => authState.isAuthenticated
);
