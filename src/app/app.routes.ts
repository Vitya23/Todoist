import { Routes } from '@angular/router';
import { AuthComponent } from './auth/components/auth.component';

export const routes: Routes = [
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent, title: 'Register' },
];
