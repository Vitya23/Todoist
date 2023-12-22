import {
  Observable,
  delay,
  dematerialize,
  materialize,
  mergeMap,
  of,
  throwError,
} from 'rxjs';
import { categoriesDataBase, toDoDataBase, userDataBase } from './dataBase';
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
        case url.endsWith('/user/register') && method === 'POST':
          return register();
        case url.endsWith('/task') && method === 'POST':
          return addTask();
        case url.endsWith('/user') && method === 'GET':
          return getUser();
        case url.endsWith('/tasks') && method === 'GET':
          return getTasks();
        case url.endsWith('/categories') && method === 'GET':
          return getCategories();
        case url.endsWith('/task') && method === 'PUT':
          return editTask();
        case url.endsWith('/task') && method === 'DELETE':
          return deleteTask();
        default:
          return next.handle(req);
      }
    }

    function generateToken() {
      return Math.random().toString(18).substring(2);
    }

    function login() {
      const { email, password } = body.user;
      const user = userDataBase.users.find(
        (res) => res.email === email && res.password === password
      );
      if (!user) return error('Неправильная почта или пароль');
      return ok({ email: user.email, accessToken: user.accessToken });
    }

    function register() {
      const { email, password } = body.user;
      const user = userDataBase.users.find((res) => res.email === email);
      if (user) return error('Аккаунт с данной почтой уже существует');
      const newId = userDataBase.users[userDataBase.users.length - 1].id + 1;
      const token = generateToken();
      userDataBase.users.push({
        id: newId,
        email: email,
        password: password,
        accessToken: token,
      });
      return ok({ email: email, accessToken: token });
    }

    function getUser() {
      const token = headers.get('Authorization');
      const user = userDataBase.users.find(
        (res) => `Token ${res.accessToken}` === token
      );
      if (!user) return error('Пожалуйста войдите снова');
      return ok({ email: user.email });
    }

    function getTasks() {
      const token = headers.get('Authorization');
      const user = userDataBase.users.find(
        (res) => `Token ${res.accessToken}` === token
      );
      const tasks = toDoDataBase.tasks.filter((res) => res.userId === user?.id);
      return ok(tasks);
    }

    function getCategories() {
      const token = headers.get('Authorization');
      const user = userDataBase.users.find(
        (res) => `Token ${res.accessToken}` === token
      );
      const categories = categoriesDataBase.categories.filter(
        (res) => res.userId === user?.id
      );
      return ok(categories);
    }

    function addTask() {
      const token = headers.get('Authorization');
      const user = userDataBase.users.find(
        (res) => `Token ${res.accessToken}` === token
      );
      if (!user) {
        return error('Не найден пользователь');
      }
      const newId = toDoDataBase.tasks[toDoDataBase.tasks.length - 1].id + 1;
      const task = {
        id: newId,
        userId: user.id,
        description: body.description,
        category: body.category,
        priority: body.selectedPriority.priority,
        endDate: body.date,
        status: 'Ожидает',
      };
      toDoDataBase.tasks.push(task);
      const tasks = toDoDataBase.tasks.filter((res) => res.userId === user?.id);
      console.log(tasks);
      return ok(tasks);
    }

    function editTask() {
      const token = headers.get('Authorization');
      const user = userDataBase.users.find(
        (res) => `Token ${res.accessToken}` === token
      );
      if (!user) {
        return error('Не найден пользователь');
      }
      const reqTask = {
        id: body.id,
        userId: user.id,
        description: body.description,
        category: body.category,
        priority: body.selectedPriority.priority,
        endDate: body.date,
        status: 'Ожидает',
      };
      const newTasks = toDoDataBase.tasks
        .filter((res) => res.userId === user?.id)
        .map((defaultTask) => {
          if (defaultTask.id === reqTask.id) {
            return reqTask;
          } else {
            return defaultTask;
          }
        });
      return ok(newTasks);
    }

    function deleteTask() {
      const token = headers.get('Authorization');
      const user = userDataBase.users.find(
        (res) => `Token ${res.accessToken}` === token
      );
      if (!user) {
        return error('Не найден пользователь');
      }
      toDoDataBase.tasks = toDoDataBase.tasks.filter(
        (res) => res.id !== body?.id
      );
      const resTasks = toDoDataBase.tasks.filter(
        (res) => res.userId === user?.id
      );
      return ok(resTasks);
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
