import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoadingAuth = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isLoadingAuth
);

export const isAuthorized = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isAuthenticated
);
