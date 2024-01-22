import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';
import { CategoryI } from 'src/app/shared/components/category/types/category.interface';
import { PriorityDirective } from 'src/app/shared/directives/priority.directive';
import { TrimOnBlurDirective } from 'src/app/shared/directives/trim-on-blur.directive';
import { AppState } from 'src/app/shared/services/appState.state';
import { TaskI } from '../../todo-list/types/task.interface';
import { TodoAddService } from '../services/todo-add.service';
import { PriorityI } from '../types/priority.interface';
import { TaskFormI, TaskRequestI } from '../types/task.interface';
import { initialTodoForm } from '../utils/todo.utils';
@Component({
  standalone: true,
  selector: 'app-todo-add-edit',
  templateUrl: './todo-add-edit.component.html',
  styleUrl: './todo-add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TrimOnBlurDirective,
    PriorityDirective,
  ],
  providers: [TodoAddService],
})
export class TodoAddEditComponent implements OnInit, OnDestroy {
  @Input() task: TaskI | null = null;

  categories: CategoryI[] | null = this.appState.categories();
  priorities: PriorityI[] = this.appState.priorityItems;

  destroy$ = new Subject<void>();

  visible: boolean = true;
  minDate = new Date();

  form: FormGroup<TaskFormI> = initialTodoForm();

  constructor(
    private todoAddService: TodoAddService,
    private appState: AppState
  ) {}

  ngOnInit(): void {
    this.patchFormValue();
  }
  patchFormValue(): void {
    if (this.task) {
      const priority = this.task.priority;
      const selectedPriority = this.priorities.find(
        (res) => res.priority === priority
      );
      this.form.setValue({
        description: this.task.description,
        endDate: new Date(this.task.endDate),
        priority: selectedPriority ?? { title: 'Приоритет 1', priority: 1 },
        category: this.task.category,
      });
    }
  }
  onSubmit(): void {
    if (this.task && this.form.valid) {
      this.todoAddService
        .editTask({ id: this.task.id, ...this.form.value } as TaskRequestI)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
    if (!this.task && this.form.valid) {
      this.todoAddService
        .addTask(this.form.value as TaskRequestI)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }

    this.visible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
