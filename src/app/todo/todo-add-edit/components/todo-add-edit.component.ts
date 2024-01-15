import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { CategoryI } from 'src/app/shared/components/category/types/category.interface';
import { TaskFormI } from '../types/taskForm.interface';
import { PriorityI } from '../types/priority.interface';
import { TaskRequestI } from '../types/taskRequest.interface';
import { TrimOnBlurDirective } from 'src/app/shared/directives/trim-on-blur.directive';
import { AppState } from 'src/app/shared/services/appState.state';
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
  ],
  providers: [TodoAddService],
})
export class TodoAddEditComponent implements OnInit, OnDestroy {
  @Input() category?: CategoryI;
  @Input() task?: TaskI;
  categories: CategoryI[] | null = this.appState.categories();
  destroy$ = new Subject<void>();

  visible: boolean = true;
  minDate = new Date();
  priorities: PriorityI[] = this.todoAddService.priorityItems;
  form!: FormGroup<TaskFormI>;

  constructor(
    private fb: FormBuilder,
    private todoAddService: TodoAddService,
    private appState: AppState
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.form = this.fb.group<TaskFormI>({
      description: this.fb.control(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      endDate: this.fb.control(null, [Validators.required]),
      priority: this.fb.control(null, [Validators.required]),
      category: this.fb.control(null),
    });

    if (this.task) {
      const selectedPriority = this.priorities.find(
        (res) => res.priority === this.task!.priority
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
  onSubmit(): void {
    if (this.task && this.form.value) {
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
