import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
} from '@ngrx/store';
import { RouterStateUrl } from './router/custom-serializer';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { authReducer, AuthState } from './states/auth/auth.reducers';

export const reducers: ActionReducerMap<any> = {
  router: routerReducer,
  auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  authState: AuthState;
}
