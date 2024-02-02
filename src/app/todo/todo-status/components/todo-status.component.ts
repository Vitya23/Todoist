import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Subject, takeUntil } from 'rxjs';
import { TaskStatus } from 'src/app/shared/enums/todo.enum';
import { TodoStatusService } from '../services/todo-status.service';
import { Severity } from 'src/app/constants/severity';
import { Icons } from 'src/app/constants/icons';

@Component({
  standalone: true,
  selector: 'app-todo-status',
  templateUrl: './todo-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagModule],
  providers: [TodoStatusService],
})
export class TodoStatusComponent implements OnDestroy {
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

  get getSeverity() {
    return this.status === TaskStatus.AWAIT
      ? Severity.SUCCESS
      : Severity.DANGER;
  }
  get getIcon() {
    return this.status === TaskStatus.AWAIT ? Icons.CHECK : Icons.CLOSE;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
