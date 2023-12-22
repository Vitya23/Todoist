import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TodoAddService } from '../services/todo-add.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TaskI } from '../../todo-list/types/task.interface';
import { PriorityI } from '../types/priority.interface';
import { Subscription } from 'rxjs';
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
export class TodoAddComponent implements OnInit, OnDestroy {
  @Input() category!: number;
  @Input() task!: TaskI;

  addSubs!: Subscription;
  editSubs!: Subscription;
  visible: boolean = true;

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
      this.editSubs = this.todoAddService.editTask(this.form.value).subscribe();
    } else {
      this.addSubs = this.todoAddService.addTask(this.form.value).subscribe();
    }

    this.visible = false;
  }

  ngOnDestroy(): void {
    if (this.editSubs) {
      this.editSubs.unsubscribe();
    } else {
      this.addSubs.unsubscribe();
    }
  }
}
