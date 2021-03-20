import { isAuthorized, isLoadingAuth } from './auth.selectors';

const createState = ({
  isLoadingAuth = false,
  isAuthenticated = true,
} = {}) => ({
  auth: {
    isLoadingAuth,
    isAuthenticated,
  },
});

describe('Auth Selectors', () => {
  it('should return the isLoading', () => {
    const state = createState();

    expect(isLoadingAuth.projector(state.auth)).toEqual(false);
  });

  it('should return call the todoListSelectorFn', () => {
    const state = createState();

    expect(isLoadingAuth(state)).toEqual(state.auth.isLoadingAuth);
  });

  it('should return the isAuth', () => {
    const state = createState();

    expect(isAuthorized.projector(state.auth)).toEqual(true);
  });

  it('should return call the todoListSelectorFn', () => {
    const state = createState();

    expect(isAuthorized(state)).toEqual(state.auth.isAuthenticated);
  });
});
