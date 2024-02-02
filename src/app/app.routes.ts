import { Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/components/todo-list.component';
import { authGuard } from './shared/guards/auth.guard';
import { PagePath } from './shared/enums/path.enum';

export const routes: Routes = [
  {
    path: PagePath.REGISTER,
    loadComponent: () =>
      import('./auth/components/auth.component').then(
        (mod) => mod.AuthComponent
      ),
  },
  {
    path: PagePath.LOGIN,
    loadComponent: () =>
      import('./auth/components/auth.component').then(
        (mod) => mod.AuthComponent
      ),
  },
  {
    path: PagePath.TODO,
    component: TodoListComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: PagePath.TODO },
];
