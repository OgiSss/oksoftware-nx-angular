import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { catchError, map, pluck, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  authForgotPassword,
  authForgotPasswordFailure,
  authForgotPasswordSuccess,
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
  authResetPassword,
  authResetPasswordSuccess,
} from './auth.actions';
import { of } from 'rxjs';
import { Navigation } from '../enum/nav';
import { NbToastrService } from '@nebular/theme';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  login = createEffect(() =>
    this.actions$.pipe(
      ofType(authLogin),
      switchMap(({ email, password, rememberMe }) =>
        this.authService.login(email, password).pipe(
          map((response) =>
            authLoginSuccess({ payload: { ...response, rememberMe } })
          ),
          catchError((error) => of(authLoginFailure(error)))
        )
      )
    )
  );

  loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLoginSuccess),
        tap(({ payload }) => {
          this.localStorageService.setItem(AUTH_KEY, payload);
          this.router.navigateByUrl(Navigation.Admin);
        })
      ),
    { dispatch: false }
  );

  forgotPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(authForgotPassword),
      switchMap(({ email }) =>
        this.authService.forgotPassword(email).pipe(
          map((response) =>
            authForgotPasswordSuccess({ payload: { ...response } })
          ),
          catchError((error) => of(authForgotPasswordFailure(error)))
        )
      )
    )
  );

  forgotPasswordSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authForgotPasswordSuccess),
        tap(() => {
          this.toastrService.success(
            'Mail has been sent. Check your mailbox.',
            'Reset password'
          );
          this.router.navigateByUrl(Navigation.Login);
        })
      ),
    { dispatch: false }
  );

  resetPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(authResetPassword),
      switchMap(({ code, password, passwordConfirmation }) =>
        this.authService
          .resetPassword(code, password, passwordConfirmation)
          .pipe(
            map(() => authResetPasswordSuccess()),
            catchError((error) => of(authForgotPasswordFailure(error)))
          )
      )
    )
  );

  resetPasswordSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authResetPasswordSuccess),
        tap(() => {
          this.toastrService.success(
            'Password has been changed successfully.',
            'Reset password'
          );
          this.router.navigateByUrl(Navigation.Login);
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.localStorageService.removeItem(AUTH_KEY);
          this.router.navigateByUrl(Navigation.Login);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService,
    private readonly toastrService: NbToastrService
  ) {}
}
