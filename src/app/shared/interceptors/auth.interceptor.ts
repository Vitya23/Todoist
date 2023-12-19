import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServices } from '../../auth/services/auth.services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServices) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.userValue;
    const isApiUrl = req.url.startsWith('http://localhost:4200');

    if (token && isApiUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}
