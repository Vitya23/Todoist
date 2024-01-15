import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin, map, mergeMap } from 'rxjs';

import { CategoryI } from '../types/category.interface';
import { AppState } from 'src/app/shared/services/appState.state';
import { environment } from 'src/environments/environment';
import { TaskI } from 'src/app/todo/todo-list/types/task.interface';
import { AddCategoryI } from '../types/addCategory.interface';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private appState: AppState) {}
  addCategory(category: AddCategoryI): Observable<void> {
    const req = [
      this.http.post<CategoryI[]>(environment.apiUrl + 'category', category),
      this.http.get<TaskI[]>(environment.apiUrl + 'tasks'),
    ];
    if (category.setAll) {
      return forkJoin(req).pipe(
        map((response) => {
          this.appState.categories.set(response[0] as CategoryI[]);
          this.appState.task.set(response[1] as TaskI[]);
        })
      );
    } else {
      return this.http
        .post<CategoryI[]>(environment.apiUrl + 'category', category)
        .pipe(
          map((response) => {
            this.appState.categories.set(response);
          })
        );
    }
  }
  editCategory(category: CategoryI): Observable<void> {
    const req = [
      this.http.put<CategoryI[]>(environment.apiUrl + 'category', category),
      this.http.get<TaskI[]>(environment.apiUrl + 'tasks'),
    ];
    return forkJoin(req).pipe(
      map((response) => {
        this.appState.categories.set(response[0] as CategoryI[]);
        this.appState.task.set(response[1] as TaskI[]);
      })
    );
  }
}
