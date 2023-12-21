import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TodoAddService } from '../services/todo-add.service';

@Component({
  standalone: true,
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss',
  imports: [CommonModule, ButtonModule],
  providers: [TodoAddService],
})
export class TodoAdd {
  constructor() {}
}
