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
  readonly awaitStatus = TaskStatus.AWAIT;
  @Input() id: number | null = null;
  @Input() status: TaskStatus = TaskStatus.AWAIT;
  destroy$ = new Subject<void>();

  constructor(private todoStatusService: TodoStatusService) {}

  changeStatus(): void {
    if (this.status === TaskStatus.COMPLETED) {
      this.status = TaskStatus.AWAIT;
    } else {
      this.status = TaskStatus.COMPLETED;
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
      case TaskStatus.AWAIT:
        return 'success';
      case TaskStatus.COMPLETED:
        return 'danger';
    }
    return;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
