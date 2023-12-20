import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { Observable, map } from 'rxjs';
import { AuthState } from './authState.state';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private authState: AuthState) {}

  getCurrentUser(): Observable<CurrentUserI> {
    return this.http.get<CurrentUserI>('http://localhost:4200/user').pipe(
      map((currentUser) => {
        this.authState.isLoggedInState.set(true);
        return currentUser;
      })
    );
  }
}
