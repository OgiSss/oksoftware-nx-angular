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

export const authForgotPassword = createAction(
  '[Auth] Forgot password ',
  props<{ email: string }>()
);

export const authForgotPasswordSuccess = createAction(
  '[Auth] Forgot password success',
  props<{ payload: UserResponseModel }>()
);

export const authForgotPasswordFailure = createAction(
  '[Auth] Forgot password failure',
  props<{ error: any }>()
);

export const authResetPassword = createAction(
  '[Auth] Reset password ',
  props<{
    code: string;
    password: string;
    passwordConfirmation: string;
  }>()
);

export const authResetPasswordSuccess = createAction(
  '[Auth] Reset password success'
);

export const authResetPasswordFailure = createAction(
  '[Auth] Reset password failure',
  props<{ error: any }>()
);

export const authLogout = createAction('[Auth] Logout');
