import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AUTH_KEY } from '../auth/auth.effects';
import { AuthState } from '../auth/auth.models';
import { LocalStorageService } from '../core.module';
import { Navigation } from '../enum/nav';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard implements CanLoad, CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canLoad(
    _: Route,
    _2: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isLoggedIn() ? true : this.router.parseUrl(Navigation.Login);
  }

  /**
   * Note: Used for navigating to admin's auth-related pages only
   *
   * @returns true if not logged in; in other case redirecting
   * to admin's homepage
   */
  canActivate(): boolean | UrlTree {
    return this.isLoggedIn() ? this.router.parseUrl(Navigation.Admin) : true;
  }

  isLoggedIn(): boolean {
    const isLoggedIn = this.localStorageService.getItem(AUTH_KEY) as AuthState;

    const isEmpty =
      isLoggedIn &&
      Object.keys(isLoggedIn).length === 0 &&
      Object.getPrototypeOf(isLoggedIn) === Object.prototype;

    return !isEmpty;
  }
}
