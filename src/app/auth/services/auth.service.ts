import { Injectable } from '@angular/core';
import { AuthRequestI } from '../types/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthResponseI } from '../types/auth.interface';
import { AppState } from '../../shared/services/appState.state';
import { environment } from 'src/environments/environment';
import { RequestPath } from 'src/app/shared/enums/path.enum';
import { LocalStorage } from 'src/app/constants/localStorage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private appState: AppState) {}

  login(user: AuthRequestI): Observable<void> {
    return this.http
      .post<AuthResponseI>(environment.apiUrl + RequestPath.LOGIN, user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem(
            LocalStorage.ACCESS_TOKEN,
            JSON.stringify(user.accessToken)
          );
          this.appState.isLoggedInState.set(true);
        })
      );
  }
  register(user: AuthRequestI): Observable<void> {
    return this.http
      .post<AuthResponseI>(environment.apiUrl + RequestPath.REGISTER, user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem(
            LocalStorage.ACCESS_TOKEN,
            JSON.stringify(user.accessToken)
          );
          this.appState.isLoggedInState.set(true);
        })
      );
  }
}
