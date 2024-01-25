import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TodoListService } from '../services/todo-list.service';
import { TaskI } from '../types/task.interface';

import { AppState } from 'src/app/shared/services/appState.state';

import { CategoryComponent } from 'src/app/shared/components/category/components/category.component';
import { CategoryI } from 'src/app/shared/components/category/types/category.interface';
import { DeleteComponent } from 'src/app/shared/components/delete/components/delete.component';
import { PriorityDirective } from 'src/app/shared/directives/priority.directive';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteMods } from 'src/app/shared/components/delete/enums/deleteMods.enum';
import { MenuComponent } from 'src/app/shared/components/menu/components/menu.component';
import { TodoAddEditComponent } from 'src/app/todo/todo-add-edit/components/todo-add-edit.component';
import { FilterComponent } from '../../filters/components/filter.component';
import { PriorityI } from '../../todo-add-edit/types/priority.interface';
import { TodoStatusComponent } from '../../todo-status/components/todo-status.component';
import { ChangeStatusI } from '../../todo-status/types/changeStatus.interface';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CategoryComponent,
    PriorityDirective,
    TodoStatusComponent,
    MenuComponent,
    FilterComponent,
  ],

  providers: [TodoListService],
})
export class TodoListComponent {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint: ViewContainerRef | null = null;

  tasks = this.appState.task;
  categories = this.appState.categories;
  priority: PriorityI[] = this.appState.priorityItems;
  status: ChangeStatusI[] = this.appState.statusItems;
  selectedCategories: CategoryI | null = null;
  deleteMods = DeleteMods;
  taskField: string = 'description';

  constructor(
    private todoListService: TodoListService,
    private appState: AppState
  ) {
    this.todoListService.getTasks().pipe(takeUntilDestroyed()).subscribe();
    this.todoListService.getCategories().pipe(takeUntilDestroyed()).subscribe();
  }

  generateTodoEditComponent(task: TaskI): void {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(TodoAddEditComponent);
      componentRef.instance.task = task;
    }
  }
  generateDeleteComponent(id: number, mode: DeleteMods): void {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(DeleteComponent);
      componentRef.instance.id = id;
      componentRef.instance.mode = mode;
    }
  }
}
