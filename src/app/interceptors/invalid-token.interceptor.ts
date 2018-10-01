import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class InvalidTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) {}

  /**
   * If the request fails with a 401, Our token has likely expired and needs
   * refreshing - We'll automatically hit the refresh endpoint to get a new JWT and
   * update the values in localStorage (so the next request has the correct token)
   * @param request
   * @param next
   *
   * @TODO - Consider instances when the 401 is due to roles rather than expired tokens
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return fromPromise(this.authService.refresh())
          .pipe(switchMap(response => {
            localStorage.setItem('zf3_jwt_api_jwt', response.token);
            localStorage.setItem('zf3_jwt_api_refresh', response.refresh_token);

            const newRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${response.token}`
              }
            });

            return next.handle(newRequest);
          }));
      }
    });
  }
}
