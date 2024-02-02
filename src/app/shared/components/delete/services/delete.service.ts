import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/shared/services/appState.state';
import { TaskI } from 'src/app/todo/todo-list/types/task.interface';
import { CategoryI } from 'src/app/shared/components/category/types/category.interface';
import { environment } from 'src/environments/environment';
import { RequestPath } from 'src/app/shared/enums/path.enum';

@Injectable()
export class DeleteService {
  constructor(private http: HttpClient, private appState: AppState) {}

  deleteTask(id: number): Observable<void> {
    return this.http
      .delete<TaskI[]>(environment.apiUrl + RequestPath.DELETE_TASK + id)
      .pipe(
        map((tasks) => {
          this.appState.task.set(tasks);
        })
      );
  }
  deleteCategory(id: number): Observable<void> {
    return this.http
      .delete<CategoryI[]>(
        environment.apiUrl + RequestPath.DELETE_CATEGORY + id
      )
      .pipe(
        map((categories) => {
          this.appState.categories.set(categories);
        })
      );
  }
}
