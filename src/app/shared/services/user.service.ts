import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { Observable, map } from 'rxjs';
import { AppState } from './appState.state';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private appState: AppState) {}

  getCurrentUser(): Observable<CurrentUserI> {
    return this.http.get<CurrentUserI>('http://localhost:4200/user').pipe(
      map((currentUser) => {
        this.appState.isLoggedInState.set(true);
        this.appState.currentUserState.set(currentUser);
        return currentUser;
      })
    );
  }
}
