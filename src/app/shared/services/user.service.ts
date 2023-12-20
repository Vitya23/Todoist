import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<CurrentUserI> {
    return this.http.get<CurrentUserI>('http://localhost:4200/user');
  }
}
