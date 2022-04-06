import { NavigationEnum } from '@adxero/shared/enums';
import { IAuthenticationTokensResponseModel } from '@adxero/shared/models';

import { LocalStorageService } from '../services/local-storage.service';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authService: AuthService,
    private nbToastrService: NbToastrService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.localStorageService.getUserInfo?.token) {
      request = this.addToken(request, this.localStorageService.getUserInfo?.token);
    }

    return next.handle(request)
      .pipe(
        catchError((error): Observable<HttpEvent<any>> => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(request, next);
          }

          return throwError(error);
        }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const getKeptMeIn = this.localStorageService.getKeptMeIn;

    // if (!getKeptMeIn) { 
    //   this.nbToastrService.info('Session expired', 'Log out');
    //   this.router.navigate([NavigationEnum.Logout]);

    //   return next.handle(request);
    // }

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      if (!this.localStorageService.getUserInfo?.refreshToken) {
        this.localStorageService.clearLocalStorage();
        this.router.navigate([NavigationEnum.Auth]);

        return next.handle(request);
      }

      return this.authService.refreshToken(this.localStorageService.getUserInfo?.refreshToken).pipe(
        switchMap((tokenReturned) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokenReturned?.token);
          this.updateLocalStorage(tokenReturned);

          return next.handle(this.addToken(request, tokenReturned?.token as string));
        }),
        catchError((x) => {
          this.localStorageService.clearLocalStorage();
          this.router.navigate([NavigationEnum.Auth]);

          return next.handle(request);
        }));
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((jwt) => next.handle(this.addToken(request, jwt))));
  }

  private updateLocalStorage(token: IAuthenticationTokensResponseModel | undefined) {
    const user = this.localStorageService.getUserInfo;

    const userCloned = { ...user };

    userCloned.refreshToken = token?.refreshToken;
    userCloned.token = token?.token;

    this.localStorageService.setUserInfo(userCloned);
  }
}
