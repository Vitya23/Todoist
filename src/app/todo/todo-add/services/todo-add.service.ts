import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskI } from '../../todo-list/types/task.interface';
import { map } from 'rxjs';
import { AppState } from '../../../shared/services/appState.state';
import { TaskRequestI } from '../types/taskRequest.interface';
import { PriorityI } from '../types/priority.interface';

@Injectable()
export class TodoAddService {
  readonly priorities: PriorityI[] = [
    { title: 'Приоритет 1', priority: 1 },
    { title: 'Приоритет 2', priority: 2 },
    { title: 'Приоритет 3', priority: 3 },
    { title: 'Приоритет 4', priority: 4 },
  ];
  constructor(private http: HttpClient, private appState: AppState) {}

  addTask(task: TaskRequestI) {
    return this.http.post<TaskI[]>('http://localhost:4200/task', task).pipe(
      map((response) => {
        this.appState.task.set(response);
      })
    );
  }
  editTask(task: TaskRequestI) {
    return this.http.put<TaskI[]>('http://localhost:4200/task', task).pipe(
      map((response) => {
        this.appState.task.set(response);
      })
    );
  }
}
