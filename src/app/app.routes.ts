import { Routes } from '@angular/router';
import { AuthComponent } from './auth/components/auth.component';
import { TodoList } from './todo/todo-list/components/todo-list.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent, title: 'Register' },
  { path: 'todo', component: TodoList, canActivate: [authGuard] },
];
