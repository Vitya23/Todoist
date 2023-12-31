import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TaskI } from '../types/task.interface';

import { AppState } from 'src/app/shared/services/appState.state';

import { DeleteComponent } from 'src/app/shared/components/delete/components/delete.component';
import { CategoryComponent } from 'src/app/shared/components/category/components/category.component';
import { CategoryI } from 'src/app/shared/components/category/types/category.interface';
import { PriorityDirective } from 'src/app/shared/directives/priority.directive';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoAddEditComponent } from 'src/app/todo/todo-add-edit/components/todo-add-edit.component';
import { TodoStatus } from '../../todo-status/components/todo-status.component';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

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
    FormsModule,
    TodoAddEditComponent,
    DeleteComponent,
    CategoryComponent,
    PriorityDirective,
    TodoStatus,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
  ],

  providers: [TodoListService],
})
export class TodoListComponent {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint!: ViewContainerRef;

  tasks = this.appState.task;
  categories = this.appState.categories;
  selectedCategories: CategoryI | null = null;

  constructor(
    private todoListService: TodoListService,
    private appState: AppState
  ) {
    this.todoListService.getTasks().pipe(takeUntilDestroyed()).subscribe();
    this.todoListService.getCategories().pipe(takeUntilDestroyed()).subscribe();
  }

  generateTodoAddComponent(category: CategoryI) {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(TodoAddEditComponent);
    componentRef.instance.category = category;
  }
  generateTodoEditComponent(task: TaskI) {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(TodoAddEditComponent);
    componentRef.instance.task = task;
  }
  generateTodoDeleteComponent(id: number) {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(DeleteComponent);
    componentRef.instance.id = id;
    componentRef.instance.mode = 'task';
  }

  tasksCategories(categories: CategoryI[], tasksId: number) {
    return categories.find((category) => category.id === tasksId)?.title;
  }
}
