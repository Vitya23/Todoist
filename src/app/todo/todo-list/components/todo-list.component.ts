import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Subscription, single } from 'rxjs';
import { TaskI } from '../types/task.interface';

import { TodoAddComponent } from '../../todo-add/components/todo-add.component';
import { AppState } from '../../../shared/services/appState.state';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DeleteComponent } from 'src/app/shared/components/todo-delete/components/delete.component';
import { CategoryComponent } from 'src/app/shared/components/category-add/components/category.component';
import { CategoriesI } from 'src/app/shared/components/category-add/types/categories.interface';
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
  ],
  providers: [TodoListService],
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint!: ViewContainerRef;

  visible: boolean = false;
  sortedBy!: string;
  tasks = this.appState.task;
  categories = this.appState.categories;

  taskSub!: Subscription;
  categoriesSub!: Subscription;

  constructor(
    private todoListService: TodoListService,
    private appState: AppState
  ) {}

  ngOnInit() {
    this.taskSub = this.todoListService.getTasks().subscribe();
    this.categoriesSub = this.todoListService.getCategories().subscribe();
  }

  generateTodoAddComponent(category: CategoriesI) {
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

  tasksByCategories(category: CategoriesI, tasks: TaskI[]) {
    return tasks.filter((task) => task.category === category.id);
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }
}
