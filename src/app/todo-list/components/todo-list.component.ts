import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  imports: [CommonModule],
  providers: [TodoListService],
})
export class TodoList {
  constructor() {}
}
