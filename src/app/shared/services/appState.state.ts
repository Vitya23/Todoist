import { Injectable, signal } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { TaskI } from '../../todo/todo-list/types/task.interface';
import { CategoryI } from '../components/category/types/category.interface';
import { PriorityI } from 'src/app/todo/todo-add-edit/types/priority.interface';

Injectable();
export class AppState {
  public isLoggedInState = signal(false);
  public task = signal<TaskI[] | null>(null);
  public categories = signal<CategoryI[] | null>(null);
  public currentUserState = signal<CurrentUserI | null>(null);
  private readonly priorities: PriorityI[] = [
    { title: 'Приоритет 1', priority: 1 },
    { title: 'Приоритет 2', priority: 2 },
    { title: 'Приоритет 3', priority: 3 },
    { title: 'Приоритет 4', priority: 4 },
  ];

  get priorityItems(): PriorityI[] {
    return this.priorities;
  }

  constructor() {
    if (localStorage.getItem('accessToken')) {
      this.isLoggedInState.set(true);
    }
  }
}
