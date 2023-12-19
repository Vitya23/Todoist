import { Injectable } from '@angular/core';
import { AuthRequestI } from '../types/authRequest.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthResponseI } from '../types/authResponse.interface';

@Injectable()
export class AuthService {
  private userSubject: BehaviorSubject<AuthResponseI | null>;
  public user: Observable<AuthResponseI | null>;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(user: AuthRequestI): Observable<string> {
    return this.http
      .post<AuthResponseI>(`http://localhost:4200/user/login`, user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user.email;
        })
      );
  }
  register(user: AuthRequestI): Observable<string> {
    return this.http
      .post<AuthResponseI>(`http://localhost:4200/user/register`, user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user.email;
        })
      );
  }
}
