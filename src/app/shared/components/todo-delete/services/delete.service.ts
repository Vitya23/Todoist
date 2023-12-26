import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { AppState } from 'src/app/shared/services/appState.state';
import { TaskI } from 'src/app/todo/todo-list/types/task.interface';
import { CategoryI } from 'src/app/shared/components/category-add/types/category.interface';

@Injectable()
export class DeleteService {
  constructor(private http: HttpClient, private appState: AppState) {}

  deleteTask(id: number) {
    return this.http
      .request<TaskI[]>('delete', 'http://localhost:4200/task', {
        body: { id: id },
      })
      .pipe(
        map((tasks) => {
          this.appState.task.set(tasks);
        })
      );
  }
  deleteCategory(id: number) {
    return this.http
      .request<CategoryI[]>('delete', 'http://localhost:4200/category', {
        body: { id: id },
      })
      .pipe(
        map((categories) => {
          console.log(categories);
          this.appState.categories.set(categories);
        })
      );
  }
}
