import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Subscription, takeUntil } from 'rxjs';
import { TaskI } from '../types/task.interface';

import { TodoAddComponent } from '../../todo-add/components/todo-add.component';
import { AppState } from '../../../shared/services/appState.state';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DeleteComponent } from 'src/app/shared/components/todo-delete/components/delete.component';
import { CategoryComponent } from 'src/app/shared/components/category-add/components/category.component';
import { CategoryI } from 'src/app/shared/components/category-add/types/category.interface';
import { PriorityDirective } from 'src/app/shared/directives/priority.directive';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    TodoAddComponent,
    ConfirmDialogModule,
    DeleteComponent,
    CategoryComponent,
    PriorityDirective,
  ],

  providers: [TodoListService],
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint!: ViewContainerRef;
  changeStatusSub!: Subscription;

  visible: boolean = false;
  sortedBy!: string;
  tasks = this.appState.task;
  categories = this.appState.categories;

  constructor(
    private todoListService: TodoListService,
    private appState: AppState
  ) {
    this.todoListService.getTasks().pipe(takeUntilDestroyed()).subscribe();
    this.todoListService.getCategories().pipe(takeUntilDestroyed()).subscribe();
  }

  ngOnInit() {}

  changeStatus(task: TaskI): void {
    if (task.status === 'Выполнено') {
      task.status = 'Ожидает';
    } else {
      task.status = 'Выполнено';
    }
    const { id, status } = task;
    this.changeStatusSub = this.todoListService
      .changeStatus({ id, status })
      .subscribe();
  }

  generateTodoAddComponent(category: CategoryI) {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(TodoAddComponent);
    componentRef.instance.category = category;
  }
  generateTodoEditComponent(task: TaskI) {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(TodoAddComponent);
    componentRef.instance.task = task;
  }
  generateTodoDeleteComponent(id: number) {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(DeleteComponent);
    componentRef.instance.id = id;
    componentRef.instance.mode = 'task';
  }

  dialogShow() {
    this.visible = true;
  }
  dialogClose(event: any) {
    this.visible = event;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Ожидает':
        return 'success';
      case 'Выполнено':
        return 'danger';
    }
    return;
  }
  todoSorted(sortedBy: string) {
    this.sortedBy = sortedBy;
  }

  tasksByCategories(category: CategoryI, tasks: TaskI[]) {
    return tasks.filter((task) => task.category === category.id);
  }

  ngOnDestroy(): void {
    if (this.changeStatusSub) {
      this.changeStatusSub.unsubscribe();
    }
  }
}
