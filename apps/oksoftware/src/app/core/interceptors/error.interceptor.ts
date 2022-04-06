
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastrService: NbToastrService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpResponseBase) => {
        if (error.status === 401) {
          return throwError(error);
        }

        if (error.status === 400 && (error as any).error.hasErrors) {
          (error as any)?.error?.errors.forEach((element: any) => {
            this.toastrService.danger(element.message, `Error ${element.code}`);
          });
        } else {
          this.toastrService.danger('Something went wrong', 'Error');
        }

        return throwError(error);
      }));
  }
}
