import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { Observable, map } from 'rxjs';
import { AppState } from './appState.state';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private appState: AppState) {}

  getCurrentUser(): Observable<CurrentUserI> {
    return this.http.get<CurrentUserI>(environment.apiUrl + 'user').pipe(
      map((currentUser) => {
        this.appState.isLoggedInState.set(true);
        this.appState.currentUserState.set(currentUser);
        return currentUser;
      })
    );
  }
}
