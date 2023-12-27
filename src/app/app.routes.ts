import { Routes } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/components/todo-list.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/components/auth.component').then(
        (mod) => mod.AuthComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/auth.component').then(
        (mod) => mod.AuthComponent
      ),
  },
  { path: 'todo', component: TodoListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'todo' },
];
