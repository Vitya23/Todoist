import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorage } from 'src/app/constants/localStorage';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = JSON.parse(
      localStorage.getItem(LocalStorage.ACCESS_TOKEN) as string
    );
    const isApiUrl = req.url.startsWith(environment.apiUrl);

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
