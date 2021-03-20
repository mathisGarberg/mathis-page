import * as assert from 'assert';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.reducers';
import { TestScheduler } from 'rxjs/testing';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { AuthEffects, AUTH_KEY } from './auth.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ActionAuthLogin,
  ActionAuthLoginFailed,
  ActionAuthLoginSuccess,
  ActionAuthLogout,
} from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { StatusCode } from '../../enums/status-code.enum';

describe('AuthEffects', () => {
  let router: any;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let actions$: Observable<Actions>;
  let store: MockStore<AuthState>;
  let scheduler: TestScheduler;

  const user = {
    email: 'anakin@disney.com',
    token: 'Bearer 123456',
  };
  const credentials = {
    email: 'anakin@disney.com',
    password: 'password',
  };

  beforeEach(() => {
    const initialAuthState = {
      auth: {
        isAuthenticated: false,
        user: null,
        error: null,
        isLoadingAuth: false,
      } as AuthState,
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: initialAuthState }),
      ],
    });

    authService = jasmine.createSpyObj('AuthService', ['login']);
    store = TestBed.inject(Store) as MockStore<AuthState>;

    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem',
      'removeItem',
    ]);
    notificationService = jasmine.createSpyObj('NotificationService', [
      'error',
      'success',
    ]);
    router = {
      routerState: {
        snapshot: {},
      },
      events: {
        pipe() {},
      },
      navigate: jasmine.createSpy('navigate'),
    };

    scheduler = new TestScheduler((actual, expected) =>
      assert.deepStrictEqual(actual, expected)
    );
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

  describe('Login$', () => {
    it('should return ActionAuthLoginSuccess action, with the user, on success', (done) => {
      scheduler.run(({ cold, expectObservable }) => {
        const action = ActionAuthLogin(credentials);
        const outcome = ActionAuthLoginSuccess(user);

        const values = {
          a: action,
          b: outcome,
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

    it('should return ActionAuthLoginFailed action, with an error, on failure', (done) => {
      scheduler.run(({ cold, expectObservable }) => {
        const error = new HttpErrorResponse({
          error: 'An error occured',
          status: StatusCode.BadRequest,
        });

        const action = ActionAuthLogin(credentials);
        const outcome = ActionAuthLoginFailed({ error });

        const values = {
          a: action,
          b: outcome,
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
    it('should call notification success and redirect to home page, on success', (done) => {
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

        effects.LoginSuccess$.subscribe();

        setTimeout(() => {
          expect(notificationService.success).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  describe('LoginFailed$', () => {
    it('should call notification error and redirect to home page, on error', (done) => {
      scheduler.run(({ cold }) => {
        const error = new HttpErrorResponse({
          error: 'An error occured',
          status: StatusCode.BadRequest,
        });
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

        effects.LoginFailed$.subscribe();

        setTimeout(() => {
          expect(notificationService.error).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  describe('PersistAuth$', () => {
    it('should call methods on LocalstorageSerice for PERSIST action', (done) => {
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

        effects.PersistAuth$.subscribe();

        setTimeout(() => {
          expect(localStorageService.setItem).toHaveBeenCalledWith(
            AUTH_KEY,
            initialAuthState
          );
          done();
        });
      });
    });
  });

  describe('Logout$', () => {
    it('should clear authentication state and navigate to home page', (done) => {
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

        effects.Logout$.subscribe();

        setTimeout(() => {
          expect(localStorageService.removeItem).toHaveBeenCalled();
          done();
        });
      });
    });
  });
});
