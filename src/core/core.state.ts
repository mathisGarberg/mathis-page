import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from './router/router.state';

export const reducers: ActionReducerMap<any> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}
