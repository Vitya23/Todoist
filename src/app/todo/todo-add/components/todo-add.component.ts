import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TodoAddService } from '../services/todo-add.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TaskI } from '../../todo-list/types/task.interface';
import { PriorityI } from '../types/priority.interface';
@Component({
  standalone: true,
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
  ],
  providers: [TodoAddService],
})
export class TodoAddComponent implements OnInit {
  visible: boolean = true;
  @Input() category!: number;
  @Input() task!: TaskI;
  form!: FormGroup;
  priorities: PriorityI[] = [
    { title: 'Приоритет 1', priority: 1 },
    { title: 'Приоритет 2', priority: 2 },
    { title: 'Приоритет 3', priority: 3 },
    { title: 'Приоритет 4', priority: 4 },
  ];
  constructor(
    private fb: FormBuilder,
    private todoAddService: TodoAddService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    if (!this.task) {
      this.form = this.fb.group({
        description: '',
        date: '',
        selectedPriority: '',
        category: this.category,
      });
    } else {
      let priority = this.priorities.find(
        (priority) => priority.priority === this.task.priority
      );
      this.form = this.fb.group({
        id: this.task.id,
        description: this.task.description,
        date: new Date(this.task.endDate),
        selectedPriority: priority,
        category: this.task.category,
      });
    }
  }
  onSubmit() {
    if (this.task) {
      this.todoAddService.editTask(this.form.value).subscribe();
    } else {
      this.todoAddService.addTask(this.form.value).subscribe();
    }

    this.visible = false;
  }
}
