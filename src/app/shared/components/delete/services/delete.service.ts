import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/shared/services/appState.state';
import { TaskI } from 'src/app/todo/todo-list/types/task.interface';
import { CategoryI } from 'src/app/shared/components/category/types/category.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class DeleteService {
  constructor(private http: HttpClient, private appState: AppState) {}

  deleteTask(id: number): Observable<void> {
    return this.http
      .request<TaskI[]>('delete', environment.apiUrl + 'task', {
        body: { id: id },
      })
      .pipe(
        map((tasks) => {
          this.appState.task.set(tasks);
        })
      );
  }
  deleteCategory(id: number): Observable<void> {
    return this.http
      .request<CategoryI[]>('delete', environment.apiUrl + 'category', {
        body: { id: id },
      })
      .pipe(
        map((categories) => {
          this.appState.categories.set(categories);
        })
      );
  }
}
