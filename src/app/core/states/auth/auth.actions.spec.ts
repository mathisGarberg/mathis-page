import { generateCredentials, generateUser } from './auth.model';
import {
  ActionAuthLogin,
  ActionAuthLoginFailed,
  ActionAuthLoginSuccess,
  ActionAuthLogout
} from './auth.actions';

describe('Auth Actions', () => {
  describe('[Auth] Login', () => {
    it('should create ActionAuthLogin action', () => {
      const credentials = generateCredentials();
      const action = ActionAuthLogin(credentials);

      expect(action.type).toEqual(ActionAuthLogin.type);
      expect(action.email).toEqual(credentials.email);
      expect(action.password).toEqual(credentials.password);
    });
  });

  describe('[Auth] Login Success', () => {
    it('should create ActionAuthLoginSuccess action', () => {
      const user = generateUser();
      const action = ActionAuthLoginSuccess(user);

      expect(action.type).toEqual(ActionAuthLoginSuccess.type);
      expect(action.token).toEqual(user.token);
      expect(action.email).toEqual(user.email);
    });
  });

  describe('[Auth] Login Failed', () => {
    it('should create ActionAuthLoginFailed action', () => {
      const error = new Error();
      const action = ActionAuthLoginFailed({ error });

      expect(action.type).toEqual(ActionAuthLoginFailed.type);
      expect(action.error).toEqual(error);
    });
  });

  describe('[Auth] Logout', () => {
    it('should create ActionAuthLogout action', () => {
      const action = ActionAuthLogout();

      expect(action.type).toEqual(ActionAuthLogout.type);
    });
  });
});
