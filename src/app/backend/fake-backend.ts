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
        case url.endsWith('/category') && method === 'POST':
          return addCategory();
        case url.endsWith('/status') && method === 'POST':
          return changeStatus();
        case url.endsWith('/user') && method === 'GET':
          return getUser();
        case url.endsWith('/tasks') && method === 'GET':
          return getTasks();
        case url.endsWith('/categories') && method === 'GET':
          return getCategories();
        case url.endsWith('/task') && method === 'PUT':
          return editTask();
        case url.endsWith('/category') && method === 'PUT':
          return editCategory();
        case url.endsWith('/task') && method === 'DELETE':
          return deleteTask();
        case url.endsWith('/category') && method === 'DELETE':
          return deleteCategory();
        default:
          return next.handle(req);
      }
    }

    function generateToken() {
      return Math.random().toString(18).substring(2);
    }

    function getUserByToken() {
      const token = headers.get('Authorization');
      const user = userDataBase.users.find(
        (res) => `Token ${res.accessToken}` === token
      );

      return user;
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
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');

      return ok({ email: user.email });
    }

    function getTasks() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');

      const tasks = toDoDataBase.tasks.filter((res) => res.userId === user?.id);
      return ok(tasks);
    }

    function getCategories() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');

      const categories = categoriesDataBase.categories.filter(
        (res) => res.userId === user?.id
      );
      return ok(categories);
    }

    function addTask() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');

      const newId = toDoDataBase.tasks[toDoDataBase.tasks.length - 1].id + 1;
      const task = {
        id: newId,
        userId: user.id,
        description: body.description,
        category: body.category,
        priority: body.priority.priority,
        endDate: body.endDate,
        status: 'Ожидает',
      };
      toDoDataBase.tasks.push(task);
      const tasks = toDoDataBase.tasks.filter((res) => res.userId === user?.id);
      return ok(tasks);
    }

    function editTask() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');
      const reqTask = {
        id: body.id,
        userId: user.id,
        description: body.description,
        category: body.category,
        priority: body.priority.priority,
        endDate: body.endDate,
        status: 'Ожидает',
      };
      toDoDataBase.tasks = toDoDataBase.tasks.map((defaultTask) => {
        if (defaultTask.id === reqTask.id) {
          return reqTask;
        } else {
          return defaultTask;
        }
      });
      const newTasks = toDoDataBase.tasks.filter(
        (res) => res.userId === user?.id
      );

      return ok(newTasks);
    }
    function changeStatus() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');
      const task = toDoDataBase.tasks.find((task) => task.id === body.id);
      if (task) {
        task.status = body.status;
      }
      return ok();
    }

    function deleteTask() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');

      toDoDataBase.tasks = toDoDataBase.tasks.filter(
        (res) => res.id !== body?.id
      );
      const resTasks = toDoDataBase.tasks.filter(
        (res) => res.userId === user?.id
      );
      return ok(resTasks);
    }
    function addCategory() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');

      const repeat = categoriesDataBase.categories.find((res) => {
        return res.userId === user.id && res.title === body.title;
      });
      if (repeat) return error('Категория с таким названием уже существует');

      const newId =
        categoriesDataBase.categories[categoriesDataBase.categories.length - 1]
          .id + 1;
      const newCategory = {
        id: newId,
        userId: user.id,
        title: body.title,
      };

      if (body.setAll === false) {
        categoriesDataBase.categories.push(newCategory);
      } else {
        categoriesDataBase.categories.push(newCategory);
        toDoDataBase.tasks = toDoDataBase.tasks.map((defaultTask) => {
          if (defaultTask.category === null) {
            return { ...defaultTask, category: newId };
          } else {
            return defaultTask;
          }
        });
      }

      const newCategories = categoriesDataBase.categories.filter(
        (category) => category.userId === user.id
      );
      return ok(newCategories);
    }
    function editCategory() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');
      editTaskCategory();
      const newCategories = categoriesDataBase.categories.filter(
        (res) => res.userId === user?.id
      );
      return ok(newCategories);
    }

    function editTaskCategory() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');
      const newId =
        categoriesDataBase.categories[categoriesDataBase.categories.length - 1]
          .id + 1;
      const repeat = categoriesDataBase.categories.find((res) => {
        return res.userId === user.id && res.title === body.title;
      });
      if (!repeat) {
        addCategory();
      }
      toDoDataBase.tasks = toDoDataBase.tasks.map((defaultTask) => {
        if (body.setAll === true && defaultTask.id === body.taskId) {
          return repeat
            ? { ...defaultTask, category: repeat.id }
            : { ...defaultTask, category: newId };
        }
        if (body.setAll === false && defaultTask.category === body.id) {
          return repeat
            ? { ...defaultTask, category: repeat.id }
            : { ...defaultTask, category: newId };
        }
        return defaultTask;
      });
      return;
    }

    function deleteCategory() {
      const user = getUserByToken();
      if (!user) return error('Пожалуйста войдите снова');

      categoriesDataBase.categories = categoriesDataBase.categories.filter(
        (res) => res.id !== body.id
      );

      toDoDataBase.tasks = toDoDataBase.tasks.map((defaultTask) => {
        if (defaultTask.category === body.id) {
          return { ...defaultTask, category: null };
        }
        return defaultTask;
      });

      const resCategories = categoriesDataBase.categories.filter(
        (res) => res.userId === user?.id
      );
      return ok(resCategories);
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
