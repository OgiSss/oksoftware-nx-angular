import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogout,
} from './auth.actions';
import { of } from 'rxjs';
import { Navigation } from '../enum/nav';

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
          if (payload.rememberMe) {
            this.localStorageService.setItem(AUTH_KEY, payload);
          }
          this.router.navigateByUrl(Navigation.Admin);
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
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {}
}
