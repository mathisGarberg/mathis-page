import { ActionAuthLogin, ActionAuthLoginSuccess } from './auth.actions';

describe('Auth Actions', () => {
  const credentials = {
    email: 'Mathis.Garberg@test.com',
    password: '123456',
  };

  const userData = {
    token: 'Bearer 123456',
    email: 'Mathis.Garberg@test.com',
  };

  it('should create ActionAuthLogin action', () => {
    const action = ActionAuthLogin(credentials);

    expect(action.type).toEqual(ActionAuthLogin.type);
    expect(action.email).toEqual(credentials.email);
    expect(action.password).toEqual(credentials.password);
  });

  it('should create ActionAuthLoginSuccess action', () => {
    const action = ActionAuthLoginSuccess(userData);

    expect(action.type).toEqual(ActionAuthLoginSuccess.type);
    expect(action.token).toEqual(userData.token);
    expect(action.email).toEqual(userData.email);
  });
});
