import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
} from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Observable, single } from 'rxjs';
import { TaskI } from '../types/task.interface';
import { CategoriesI } from '../types/categories.interface';
import { TodoAddComponent } from '../../todo-add/components/todo-add.component';
@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    TodoAddComponent,
  ],
  providers: [TodoListService],
})
export class TodoListComponent implements OnInit, OnChanges {
  visible: boolean = false;
  tasks$!: Observable<TaskI[]>;
  categories$!: Observable<CategoriesI[]>;
  constructor(private todoListService: TodoListService) {}
  ngOnInit() {
    this.tasks$ = this.todoListService.getTasks();
    this.categories$ = this.todoListService.getCategories();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
}
