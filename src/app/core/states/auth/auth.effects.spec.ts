import * as assert from 'assert';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';

import { LocalStorageService } from '../../local-storage/local-storage.service';
import { initialAuthState } from './auth.reducer';
import { AuthState } from './auth.model';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { AuthEffects, AUTH_KEY } from './auth.effects';
import { StatusCode } from '../../enums/status-code.enum';
import {
  ActionAuthLogin,
  ActionAuthLoginFailed,
  ActionAuthLoginSuccess,
  ActionAuthLogout
} from './auth.actions';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('AuthEffects', () => {
  let router: any;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let actions$: Observable<Actions>;
  let store: MockStore<AuthState>;

  const user = {
    email: 'anakin@disney.com',
    token: 'Bearer 123456'
  };
  const credentials = {
    email: 'anakin@disney.com',
    password: 'password'
  };
  const error = new HttpErrorResponse({
    error: 'error',
    status: StatusCode.BadRequest
  });

  beforeEach(() => {
    const initialAuthState = {
      auth: {
        isAuthenticated: false,
        user: null,
        error: null,
        isLoadingAuth: false
      } as AuthState
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: initialAuthState })
      ]
    });

    store = TestBed.inject(Store) as MockStore<AuthState>;
    authService = jasmine.createSpyObj('AuthService', ['login']);
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem',
      'removeItem'
    ]);
    notificationService = jasmine.createSpyObj('NotificationService', [
      'error',
      'success'
    ]);
    router = {
      routerState: {
        snapshot: {}
      },
      events: {
        pipe() {}
      },
      navigate: jasmine.createSpy('navigate')
    };
  });

  it('should not dispatch any actions', () => {
    const actions = new Actions(EMPTY);
    const effects = new AuthEffects(
      actions,
      router,
      authService,
      localStorageService,
      store,
      notificationService
    );
    const metadata = getEffectsMetadata(effects);

    expect(metadata.PersistAuth$.dispatch).toEqual(false);
    expect(metadata.LoginSuccess$.dispatch).toEqual(false);
    expect(metadata.LoginFailed$.dispatch).toEqual(false);
    expect(metadata.Logout$.dispatch).toEqual(false);
  });

  describe('PersistAuth$', () => {
    it('should call methods on LocalstorageSerice for PERSIST action', () => {
      scheduler.run(({ cold }) => {
        const persistAction = ActionAuthLoginSuccess(user);
        const source = cold('a', { a: persistAction });
        const actions = new Actions(source);
        const effects = new AuthEffects(
          actions,
          router,
          authService,
          localStorageService,
          store,
          notificationService
        );

        effects.PersistAuth$.subscribe(() => {
          expect(localStorageService.setItem).toHaveBeenCalledWith(
            AUTH_KEY,
            initialAuthState
          );
        });
      });
    });
  });

  describe('Login$', () => {
    it('should return ActionAuthLoginSuccess action, with the user, on success', done => {
      scheduler.run(({ cold, expectObservable }) => {
        const action = ActionAuthLogin(credentials);
        const outcome = ActionAuthLoginSuccess(user);

        const values = {
          a: action,
          b: outcome
        };

        const source = cold('a', values);
        const expected = 'b';
        const actions = new Actions(source);

        authService.login.and.returnValue(of({ user }));

        const effects = new AuthEffects(
          actions,
          router,
          authService,
          localStorageService,
          store,
          notificationService
        );

        expectObservable(effects.Login$).toBe(expected, values);

        setTimeout(() => {
          expect(authService.login).toHaveBeenCalled();
          done();
        });
      });
    });

    it('should return ActionAuthLoginFailed action, with an error, on failure', done => {
      scheduler.run(({ cold, expectObservable }) => {
        const action = ActionAuthLogin(credentials);
        const outcome = ActionAuthLoginFailed({ error });

        const values = {
          a: action,
          b: outcome
        };

        const source = cold('a', values);
        const expected = 'b';
        const actions = new Actions(source);

        authService.login.and.returnValue(throwError({ error }));

        const effects = new AuthEffects(
          actions,
          router,
          authService,
          localStorageService,
          store,
          notificationService
        );

        expectObservable(effects.Login$).toBe(expected, values);

        setTimeout(() => {
          expect(authService.login).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  describe('LoginSuccess$', () => {
    it('should call notification success and redirect to home page, on success', () => {
      scheduler.run(({ cold }) => {
        const action = ActionAuthLoginSuccess(user);
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effects = new AuthEffects(
          actions,
          router,
          authService,
          localStorageService,
          store,
          notificationService
        );

        effects.LoginSuccess$.subscribe(() => {
          expect(notificationService.success).toHaveBeenCalled();
          expect(router.navigate).toHaveBeenCalled();
        });
      });
    });
  });

  describe('LoginFailed$', () => {
    it('should call notification error and redirect to home page, on error', () => {
      scheduler.run(({ cold }) => {
        const action = ActionAuthLoginFailed(error);
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effects = new AuthEffects(
          actions,
          router,
          authService,
          localStorageService,
          store,
          notificationService
        );

        effects.LoginFailed$.subscribe(() => {
          expect(notificationService.error).toHaveBeenCalled();
        });
      });
    });
  });

  describe('Logout$', () => {
    it('should clear authentication state and navigate to home page', () => {
      scheduler.run(({ cold }) => {
        const logoutAction = ActionAuthLogout();
        const source = cold('a', { a: logoutAction });
        const actions = new Actions(source);
        const effects = new AuthEffects(
          actions,
          router,
          authService,
          localStorageService,
          store,
          notificationService
        );

        effects.Logout$.subscribe(() => {
          expect(localStorageService.removeItem).toHaveBeenCalled();
        });
      });
    });
  });
});
