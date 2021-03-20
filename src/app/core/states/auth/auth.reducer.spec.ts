import { generateCredentials, generateUser } from './auth.model';
import { authReducer, initialAuthState } from './auth.reducer';
import {
  ActionAuthLogin,
  ActionAuthLoginFailed,
  ActionAuthLoginSuccess,
  ActionAuthLogout,
} from './auth.actions';

describe('Auth Reducer', () => {
  const credentials = generateCredentials();
  const user = generateUser();

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = authReducer(undefined, action);

      expect(state).toBe(initialAuthState);
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
        const action = ActionAuthLoginSuccess(user);
        const result = authReducer(initialAuthState, action);

        expect(result).toEqual({
          ...initialAuthState,
          isAuthenticated: true,
          user,
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
