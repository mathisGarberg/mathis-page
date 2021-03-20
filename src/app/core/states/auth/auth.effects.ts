import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ActionAuthLoginSuccess,
  ActionAuthLoginFailed,
  ActionAuthLogin,
  ActionAuthLogout,
} from './auth.actions';
import {
  tap,
  map,
  switchMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store, select, Action } from '@ngrx/store';

import { LocalStorageService } from '../../local-storage/local-storage.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { selectAuthState } from '../../core.state';
import { AuthState } from './auth.model';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  PersistAuth$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(ActionAuthLoginSuccess, ActionAuthLogout),
        withLatestFrom(this.store.pipe(select(selectAuthState))),
        tap(([, auth]) => {
          this.localStorageService.setItem(AUTH_KEY, auth);
        })
      ),
    { dispatch: false }
  );

  Login$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(ActionAuthLogin),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(({ user }: LoginResponse) =>
            ActionAuthLoginSuccess({
              token: user.token,
              email,
            })
          ),
          catchError((error) => of(ActionAuthLoginFailed(error)))
        )
      )
    )
  );

  LoginSuccess$: Observable<Action> = createEffect(
    () =>
      this.actions.pipe(
        ofType(ActionAuthLoginSuccess),
        tap(() => {
          this.notificationService.success('Logged in booooi!!');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  LoginFailed$: Observable<Action> = createEffect(
    () =>
      this.actions.pipe(
        ofType(ActionAuthLoginFailed),
        tap(() => this.notificationService.error('Error'))
      ),
    { dispatch: false }
  );

  Logout$: Observable<Action> = createEffect(
    () =>
      this.actions.pipe(
        ofType(ActionAuthLogout),
        tap(() => {
          this.localStorageService.removeItem(AUTH_KEY);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<AuthState>,
    private notificationService: NotificationService
  ) {}
}
