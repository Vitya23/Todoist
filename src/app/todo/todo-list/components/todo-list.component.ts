import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MenuComponent } from 'src/app/shared/components/menu/components/menu.component';
import { DeleteMods } from 'src/app/shared/components/delete/enums/deleteMods.enum';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { FilterComponent } from '../../filters/components/filter.component';
import { PriorityI } from '../../todo-add-edit/types/priority.interface';
import { ChangeStatusI } from '../../todo-status/types/changeStatus.interface';
import { STATUS } from 'src/app/shared/utils/data.utils';

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
    DropdownModule,
    MenuComponent,
    MenuModule,
    MultiSelectModule,
    FilterComponent,
  ],

  providers: [TodoListService],
})
export class TodoListComponent implements OnInit {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint: ViewContainerRef | undefined;

  tasks = this.appState.task;
  categories = this.appState.categories;
  priority: PriorityI[] = this.appState.priorityItems;
  status: ChangeStatusI[] = STATUS;
  selectedCategories: CategoryI | null = null;
  deleteMods = DeleteMods;

  constructor(
    private todoListService: TodoListService,
    private appState: AppState
  ) {
    this.todoListService.getTasks().pipe(takeUntilDestroyed()).subscribe();
    this.todoListService.getCategories().pipe(takeUntilDestroyed()).subscribe();
  }

  ngOnInit(): void {}

  generateTodoEditComponent(task: TaskI): void {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      let componentRef =
        this.childInsertionPoint.createComponent(TodoAddEditComponent);
      componentRef.instance.task = task;
    }
  }
  generateDeleteComponent(id: number, mode: DeleteMods): void {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      let componentRef =
        this.childInsertionPoint.createComponent(DeleteComponent);
      componentRef.instance.id = id;
      componentRef.instance.mode = mode;
    }
  }
}
