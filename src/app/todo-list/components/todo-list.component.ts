import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { TaskI } from '../types/task.interface';
import { CategoriesI } from '../types/categories.interface';
@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  providers: [TodoListService],
})
export class TodoList implements OnInit {
  tasks$!: Observable<TaskI[]>;
  categories!: CategoriesI[];
  constructor(private todoListService: TodoListService) {}
  ngOnInit() {
    this.tasks$ = this.todoListService.getTasks();
    this.todoListService
      .getCategories()
      .subscribe((res) => (this.categories = res));
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Ожидает':
        return 'warning';
      case 'Выполено':
        return 'success;';
    }
    return;
  }
}
