import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Subject, takeUntil } from 'rxjs';
import { TaskStatus } from '../enums/taskStatus.enum';
import { TodoStatusService } from '../services/todo-status.service';

@Component({
  standalone: true,
  selector: 'app-todo-status',
  templateUrl: './todo-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagModule],
  providers: [TodoStatusService],
})
export class TodoStatusComponent implements OnDestroy {
  readonly awaitStatus = TaskStatus.await;
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
      case TaskStatus.await:
        return 'success';
      case TaskStatus.completed:
        return 'danger';
    }
    return;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
