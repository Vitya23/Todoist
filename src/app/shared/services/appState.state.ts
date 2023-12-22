import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { TaskI } from '../../todo/todo-list/types/task.interface';

Injectable();
export class AppState {
  public isLoggedInState = signal(false);
  public task = signal<TaskI[] | undefined | null>(null);
  public currentUserState: WritableSignal<CurrentUserI | null> = signal(null);

  constructor() {
    if (localStorage.getItem('accessToken')) {
      this.isLoggedInState.set(true);
    }
  }
}
