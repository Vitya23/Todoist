import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { TodoStatusService } from '../services/todo-status.service';
import { Subject, takeUntil } from 'rxjs';
import { TaskStatus } from '../enums/taskStatus.enum';

@Component({
  standalone: true,
  selector: 'app-todo-status',
  templateUrl: './todo-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagModule],
  providers: [TodoStatusService],
})
export class TodoStatus implements OnDestroy {
  TaskStatus = TaskStatus;
  @Input() id: number | null = null;
  @Input() status: TaskStatus = TaskStatus.await;
  destroy$ = new Subject<void>();

  constructor(private todoStatusService: TodoStatusService) {}

  changeStatus(): void {
    if (this.status === TaskStatus.completed) {
      this.status = TaskStatus.await;
    } else {
      this.status = TaskStatus.completed;
    }
    if (this.status && this.id) {
      this.todoStatusService
        .changeStatus({ id: this.id, status: this.status })
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
