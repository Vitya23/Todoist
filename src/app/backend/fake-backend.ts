import {
  Observable,
  delay,
  dematerialize,
  materialize,
  mergeMap,
  of,
  throwError,
} from 'rxjs';
import { userDataBase } from './dataBase';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/user/login') && method === 'POST':
          return login();
        default:
          return next.handle(req);
      }
    }

    function login() {
      const { email, password } = body.user;
      const user = userDataBase.users.find(
        (res) => res.email === email && res.password === password
      );
      if (!user) return error('Неправильная почта или пароль');
      return ok({ email: user.email, accessToken: user.accessToken });
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError(() => ({ error: { message } }));
    }
  }
}
export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
