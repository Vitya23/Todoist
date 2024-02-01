import { Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/components/todo-list.component';
import { authGuard } from './shared/guards/auth.guard';
import { Path } from './shared/enums/path.enum';

export const routes: Routes = [
  {
    path: Path.REGISTER,
    loadComponent: () =>
      import('./auth/components/auth.component').then(
        (mod) => mod.AuthComponent
      ),
  },
  {
    path: Path.LOGIN,
    loadComponent: () =>
      import('./auth/components/auth.component').then(
        (mod) => mod.AuthComponent
      ),
  },
  { path: Path.TODO, component: TodoListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: Path.TODO },
];
