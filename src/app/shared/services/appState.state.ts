import { Injectable, signal } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';
import { TaskI } from '../../todo/todo-list/types/task.interface';
import { CategoryI } from '../components/category/types/category.interface';
import { PriorityI } from 'src/app/todo/todo-add-edit/types/priority.interface';
import { LocalStorage } from 'src/app/constants/localStorage';

Injectable();
export class AppState {
  public isLoggedInState = signal(false);
  public task = signal<TaskI[] | null>(null);
  public categories = signal<CategoryI[] | null>(null);
  public currentUserState = signal<CurrentUserI | null>(null);
  private readonly PRIORITIES: PriorityI[] = [
    { title: 'Приоритет 1', priority: 1 },
    { title: 'Приоритет 2', priority: 2 },
    { title: 'Приоритет 3', priority: 3 },
    { title: 'Приоритет 4', priority: 4 },
  ];
  private readonly STATUSES = [
    { id: 1, status: 'Выполнено' },
    { id: 2, status: 'Ожидает' },
  ];

  get priorityItems(): PriorityI[] {
    return this.PRIORITIES;
  }

  get statusItems() {
    return this.STATUSES;
  }

  constructor() {
    if (localStorage.getItem(LocalStorage.ACCESS_TOKEN)) {
      this.isLoggedInState.set(true);
    }
  }
}
