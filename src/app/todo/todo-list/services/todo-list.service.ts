import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TaskI } from '../types/task.interface';
import { AppState } from '../../../shared/services/appState.state';
import { CategoryI } from 'src/app/shared/components/category/types/category.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class TodoListService {
  constructor(private http: HttpClient, private appState: AppState) {}
  getTasks(): Observable<void> {
    return this.http.get<TaskI[]>(environment.apiUrl + 'tasks').pipe(
      map((tasks: TaskI[]) => {
        this.appState.task.set(tasks);
      })
    );
  }
  getCategories(): Observable<void> {
    return this.http.get<CategoryI[]>(environment.apiUrl + 'categories').pipe(
      map((categories: CategoryI[]) => {
        this.appState.categories.set(categories);
      })
    );
  }
}
