import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskI } from '../../todo-list/types/task.interface';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../shared/services/appState.state';
import { TaskRequestI } from '../types/taskRequest.interface';
import { PriorityI } from '../types/priority.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class TodoAddService {
  private readonly priorities: PriorityI[] = [
    { title: 'Приоритет 1', priority: 1 },
    { title: 'Приоритет 2', priority: 2 },
    { title: 'Приоритет 3', priority: 3 },
    { title: 'Приоритет 4', priority: 4 },
  ];
  constructor(private http: HttpClient, private appState: AppState) {}

  get priorityItems(): PriorityI[] {
    return this.priorities;
  }

  addTask(task: TaskRequestI): Observable<void> {
    return this.http.post<TaskI[]>(environment.apiUrl + 'task', task).pipe(
      map((response) => {
        this.appState.task.set(response);
      })
    );
  }
  editTask(task: TaskRequestI): Observable<void> {
    return this.http.put<TaskI[]>(environment.apiUrl + 'task', task).pipe(
      map((response) => {
        this.appState.task.set(response);
      })
    );
  }
}
