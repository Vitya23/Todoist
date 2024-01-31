import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUserI } from '../types/currentUser.interface';
import { AppState } from './appState.state';

export abstract class UserService {
  private readonly http = inject(HttpClient);
  private readonly appState = inject(AppState);
  private readonly router = inject(Router);

  getCurrentUser(): Observable<CurrentUserI> {
    return this.http.get<CurrentUserI>(environment.apiUrl + 'user').pipe(
      map((currentUser) => {
        this.appState.isLoggedInState.set(true);
        this.appState.currentUserState.set(currentUser);
        return currentUser;
      }),
      catchError((err) => {
        this.logout();
        return of(err);
      })
    );
  }
  logout(): void {
    this.appState.isLoggedInState.set(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
