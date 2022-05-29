import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Navigation } from '../enum/nav';

@Injectable({
  providedIn: 'root',
})
export class AuthResetPasswordGuard implements CanActivate {
  constructor(private route: ActivatedRoute, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    console.log(route);
    return route.queryParams['code']
      ? true
      : this.router.parseUrl(Navigation.Login);
  }
}
