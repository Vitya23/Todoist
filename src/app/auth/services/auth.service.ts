import { Injectable } from '@angular/core';
import { AuthRequestI } from '../types/authRequest.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthResponseI } from '../types/authResponse.interface';
import { AuthState } from '../../shared/services/authState.state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private authState: AuthState) {}

  login(user: AuthRequestI): Observable<string> {
    return this.http
      .post<AuthResponseI>(`http://localhost:4200/user/login`, user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
          this.authState.isLoggedInState.set(true);
          return user.email;
        })
      );
  }
  register(user: AuthRequestI): Observable<string> {
    return this.http
      .post<AuthResponseI>(`http://localhost:4200/user/register`, user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
          this.authState.isLoggedInState.set(true);
          return user.email;
        })
      );
  }
}
