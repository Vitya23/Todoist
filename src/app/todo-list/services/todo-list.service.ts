import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskI } from '../types/task.interface';
import { CategoriesI } from '../types/categories.interface';

@Injectable()
export class TodoListService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskI[]> {
    return this.http.get<TaskI[]>('http://localhost:4200/tasks');
  }
  getCategories(): Observable<CategoriesI[]> {
    return this.http.get<CategoriesI[]>('http://localhost:4200/categories');
  }
}
