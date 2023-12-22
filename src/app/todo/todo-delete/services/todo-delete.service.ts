import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskI } from '../../todo-list/types/task.interface';
import { map } from 'rxjs';
import { AppState } from '../../../shared/services/appState.state';

@Injectable()
export class TodoDeleteService {
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
}
