import { AuthState } from './auth.models';
import { authLoginSuccess, authLogout } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  jwt: '',
  user: undefined,
};

const reducer = createReducer(
  initialState,
  on(authLoginSuccess, (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    jwt: payload.jwt,
    user: { ...payload.user },
  })),
  on(authLogout, (state) => ({
    ...state,
    isAuthenticated: false,
    jwt: '',
  }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
