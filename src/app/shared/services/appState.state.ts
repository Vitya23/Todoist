import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { TaskI } from '../../todo/todo-list/types/task.interface';
import { CategoryI } from '../components/category/types/category.interface';

Injectable();
export class AppState {
  public isLoggedInState = signal(false);
  public task = signal<TaskI[] | null>(null);
  public categories = signal<CategoryI[] | null>(null);
  public currentUserState = signal<CurrentUserI | null>(null);

  constructor() {
    if (localStorage.getItem('accessToken')) {
      this.isLoggedInState.set(true);
    }
  }
}
