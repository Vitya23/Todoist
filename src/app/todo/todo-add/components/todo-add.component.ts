import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TodoAddService } from '../services/todo-add.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TaskI } from '../../todo-list/types/task.interface';
import { Subscription } from 'rxjs';
import { CategoryI } from 'src/app/shared/components/category-add/types/category.interface';
import { TaskFormI } from '../types/taskForm.interface';
import { PriorityI } from '../types/priority.interface';
import { TaskRequestI } from '../types/taskRequest.interface';
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
  @Input() category!: CategoryI;
  @Input() task!: TaskI;

  addSubs!: Subscription;
  editSubs!: Subscription;
  visible: boolean = true;
  priorities = this.todoAddService.priorities;
  form!: FormGroup<TaskFormI>;

  constructor(
    private fb: FormBuilder,
    private todoAddService: TodoAddService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.form = this.fb.group<TaskFormI>({
      description: this.fb.control(null, [
        Validators.required,
        Validators.maxLength(35),
      ]),
      endDate: this.fb.control(null, [Validators.required]),
      priority: this.fb.control(null, [Validators.required]),
      category: this.fb.control(null, [Validators.required]),
    });

    if (this.task) {
      const selectedPriority = this.priorities.find(
        (res) => res.priority === this.task.priority
      );
      this.form.setValue({
        description: this.task.description,
        endDate: new Date(this.task.endDate),
        priority: selectedPriority ?? { title: 'Приоритет 1', priority: 1 },
        category: this.task.category,
      });
    }
    if (this.category) {
      this.form.patchValue({ category: this.category.id });
    }
  }
  onSubmit() {
    if (this.task && this.form.value) {
      this.editSubs = this.todoAddService
        .editTask({ id: this.task.id, ...this.form.value } as TaskRequestI)
        .subscribe();
    }
    if (!this.task && this.form.controls.category.valid) {
      this.addSubs = this.todoAddService
        .addTask(this.form.value as TaskRequestI)
        .subscribe();
    }

    this.visible = false;
  }

  ngOnDestroy(): void {
    if (this.editSubs) {
      this.editSubs.unsubscribe();
    }
    if (this.addSubs) {
      this.addSubs.unsubscribe();
    }
  }
}
