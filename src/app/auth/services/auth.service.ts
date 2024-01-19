import { Injectable } from '@angular/core';
import { AuthRequestI } from '../types/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthResponseI } from '../types/auth.interface';
import { AppState } from '../../shared/services/appState.state';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private appState: AppState) {}

  login(user: AuthRequestI): Observable<void> {
    return this.http
      .post<AuthResponseI>(environment.apiUrl + 'user/login', user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
          this.appState.isLoggedInState.set(true);
        })
      );
  }
  register(user: AuthRequestI): Observable<void> {
    return this.http
      .post<AuthResponseI>(environment.apiUrl + 'user/register', user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
          this.appState.isLoggedInState.set(true);
        })
      );
  }
}
