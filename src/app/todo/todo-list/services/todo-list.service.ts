import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { TaskI } from '../types/task.interface';
import { CategoriesI } from '../../../shared/category-add/types/categories.interface';
import { AppState } from '../../../shared/services/appState.state';

@Injectable()
export class TodoListService {
  constructor(private http: HttpClient, private appState: AppState) {}
  getTasks(): Observable<TaskI[]> {
    return this.http.get<TaskI[]>('http://localhost:4200/tasks').pipe(
      map((tasks: TaskI[]) => {
        this.appState.task.set(tasks);
        return tasks;
      })
    );
  }
  getCategories(): Observable<CategoriesI[]> {
    return this.http
      .get<CategoriesI[]>('http://localhost:4200/categories')
      .pipe(
        map((categories: CategoriesI[]) => {
          this.appState.categories.set(categories);
          return categories;
        })
      );
  }
}
