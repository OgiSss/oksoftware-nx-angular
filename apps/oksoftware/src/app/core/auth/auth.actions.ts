import { createAction, props } from '@ngrx/store';
import { UserResponseModel } from './auth.models';

export const authLogin = createAction(
  '[Auth] Login',
  props<{ email: string; password: string; rememberMe: boolean }>()
);

export const authLoginSuccess = createAction(
  '[Auth] Login success',
  props<{ payload: UserResponseModel }>()
);

export const authLoginFailure = createAction(
  '[Auth] Login failure',
  props<{ email: string; password: string }>()
);
export const authLogout = createAction('[Auth] Logout');
