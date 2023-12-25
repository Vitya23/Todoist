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
import { CategoriesI } from '../../../shared/category-add/types/categories.interface';
import { TodoAddComponent } from '../../todo-add/components/todo-add.component';
import { AppState } from '../../../shared/services/appState.state';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TodoDeleteComponent } from '../../todo-delete/components/todo-delete.component';
import { CategoryComponent } from '../../../shared/category-add/components/category.component';
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
    TodoDeleteComponent,
    CategoryComponent,
  ],
  providers: [TodoListService],
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint!: ViewContainerRef;

  visible: boolean = false;

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

  tasksByCategories(category: CategoriesI, tasks: TaskI[]) {
    return tasks.filter((task) => task.category === category.id);
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }
}
