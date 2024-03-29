import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskI } from '../../todo-list/types/task.interface';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../shared/services/appState.state';
import { TaskRequestI } from '../types/task.interface';
import { environment } from 'src/environments/environment';
import { RequestPath } from 'src/app/shared/enums/path.enum';

@Injectable()
export class TodoAddService {
  constructor(private http: HttpClient, private appState: AppState) {}

  addTask(task: TaskRequestI): Observable<void> {
    return this.http
      .post<TaskI[]>(environment.apiUrl + RequestPath.TASK, task)
      .pipe(
        map((response) => {
          this.appState.task.set(response);
        })
      );
  }
  editTask(task: TaskRequestI): Observable<void> {
    return this.http
      .put<TaskI[]>(environment.apiUrl + RequestPath.TASK, task)
      .pipe(
        map((response) => {
          this.appState.task.set(response);
        })
      );
  }
}
