import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin, map } from 'rxjs';

import { AppState } from 'src/app/shared/services/appState.state';
import { environment } from 'src/environments/environment';
import { AddCategoryI, CategoryI } from '../types/category.interface';
import { TaskI } from 'src/app/todo/todo-list/types/task.interface';
import { RequestPath } from 'src/app/shared/enums/path.enum';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private appState: AppState) {}
  addCategory(category: AddCategoryI): Observable<void> {
    if (category.setAll === true) {
      const req = [
        this.http.post<CategoryI[]>(
          environment.apiUrl + RequestPath.CATEGORY,
          category
        ),
        this.http.get(environment.apiUrl + RequestPath.TASKS),
      ];
      return forkJoin(req).pipe(
        map((response) => {
          this.appState.categories.set(response[0] as CategoryI[]),
            this.appState.task.set(response[1] as TaskI[]);
        })
      );
    }

    return this.http
      .post<CategoryI[]>(environment.apiUrl + RequestPath.CATEGORY, category)
      .pipe(
        map((response) => {
          this.appState.categories.set(response);
        })
      );
  }

  editCategory(category: CategoryI): Observable<void> {
    return this.http
      .put<CategoryI[]>(environment.apiUrl + RequestPath.CATEGORY, category)
      .pipe(
        map((response) => {
          this.appState.categories.set(response);
        })
      );
  }
}
