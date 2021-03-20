import { createAction, props } from '@ngrx/store';

export const ActionAuthLogin = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const ActionAuthLoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; email: string }>()
);

export const ActionAuthLoginFailed = createAction(
  '[Auth] Login Failure',
  props<{ error: Error }>()
);

export const ActionAuthLogout = createAction('[Auth] Logout');
