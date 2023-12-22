import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskI } from '../../todo-list/types/task.interface';
import { map } from 'rxjs';
import { AppState } from '../../../shared/services/appState.state';

@Injectable()
export class TodoAddService {
  constructor(private http: HttpClient, private appState: AppState) {}

  addTask(task: TaskI) {
    return this.http.post<TaskI[]>('http://localhost:4200/task', task).pipe(
      map((response) => {
        this.appState.task.set(response);
      })
    );
  }
  editTask(task: TaskI) {
    return this.http.put<TaskI[]>('http://localhost:4200/task', task).pipe(
      map((response) => {
        this.appState.task.set(response);
      })
    );
  }
}
