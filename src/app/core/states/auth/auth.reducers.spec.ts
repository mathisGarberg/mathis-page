import {
  ActionAuthLogin,
  ActionAuthLoginFailed,
  ActionAuthLoginSuccess,
  ActionAuthLogout,
} from './auth.actions';
import { authReducer, initialAuthState } from './auth.reducers';

describe('Auth Reducer', () => {
  const credentials = {
    email: 'anakin@disney.com',
    password: 'password',
  };

  const loginResult = {
    email: 'anakin@disney.com',
    token: 'Bearer 123456',
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = authReducer(undefined, action);

      expect(result).toBe(initialAuthState);
    });
  });

  describe('[Auth] Login', () => {
    it('should toggle loading state', () => {
      const action = ActionAuthLogin(credentials);
      const result = authReducer(initialAuthState, action);

      expect(result).toEqual({
        ...initialAuthState,
        isLoadingAuth: true,
      });
    });

    describe('[Auth] Login Success', () => {
      it('should add token to state', () => {
        const action = ActionAuthLoginSuccess(loginResult);
        const result = authReducer(initialAuthState, action);

        expect(result).toEqual({
          ...initialAuthState,
          isAuthenticated: true,
          user: loginResult,
        });
      });
    });

    describe('[Auth] Login Failed', () => {
      it('should update error in state', () => {
        const error = new Error();
        const action = ActionAuthLoginFailed({ error });
        const result = authReducer(initialAuthState, action);

        expect(result).toEqual({
          ...initialAuthState,
          error,
          isLoadingAuth: false,
        });
      });
    });

    describe('[Auth] Logout', () => {
      it('should reset state', () => {
        const action = ActionAuthLogout();
        const result = authReducer(initialAuthState, action);

        expect(result).toEqual(initialAuthState);
      });
    });
  });
});
