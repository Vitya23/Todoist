import { Injectable } from '@angular/core';
import { AuthRequestI } from '../types/authRequest.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthResponseI } from '../types/authResponse.interface';

@Injectable()
export class AuthServices {
  private userSubject: BehaviorSubject<string>;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('accessToken')!)
    );
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(user: AuthRequestI): Observable<string> {
    return this.http
      .post<AuthResponseI>(`http://localhost:4200/user/login`, user)
      .pipe(
        map((user: AuthResponseI) => {
          localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
          this.userSubject.next(user.accessToken);
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
          this.userSubject.next(user.accessToken);
          return user.email;
        })
      );
  }
}
