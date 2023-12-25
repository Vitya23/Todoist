import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { TaskI } from '../../todo/todo-list/types/task.interface';
import { CategoriesI } from '../category-add/types/categories.interface';

Injectable();
export class AppState {
  public isLoggedInState = signal(false);
  public task = signal<TaskI[] | undefined | null>(null);
  public categories = signal<CategoriesI[] | undefined | null>(null);
  public currentUserState = signal<CurrentUserI | null>(null);

  constructor() {
    if (localStorage.getItem('accessToken')) {
      this.isLoggedInState.set(true);
    }
  }
}
