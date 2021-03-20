import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { RouterStateUrl } from './router/custom-serializer';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { authReducer } from './states/auth/auth.reducer';
import { AuthState } from './states/auth/auth.model';
import { settingsReducer } from './states/settings/settings.reducer';
import { SettingsState } from './states/settings/settings.model';

export const reducers: ActionReducerMap<any> = {
  router: routerReducer,
  auth: authReducer,
  settings: settingsReducer
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
  settingsState: SettingsState;
}
