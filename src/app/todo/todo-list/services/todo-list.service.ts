import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { TaskI } from '../types/task.interface';
import { AppState } from '../../../shared/services/appState.state';
import { CategoryI } from 'src/app/shared/components/category-add/types/category.interface';
import { TaskStatus } from '../types/taskStatus.type';
import { ChangeStatusI } from '../types/changeStatus.interface';

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
  getCategories(): Observable<CategoryI[]> {
    return this.http.get<CategoryI[]>('http://localhost:4200/categories').pipe(
      map((categories: CategoryI[]) => {
        this.appState.categories.set(categories);
        return categories;
      })
    );
  }
  changeStatus(status: ChangeStatusI) {
    return this.http.post('http://localhost:4200/status', status);
  }
}
