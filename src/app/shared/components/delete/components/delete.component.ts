import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeleteService } from '../services/delete.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-delete',
  template: '<p-confirmDialog></p-confirmDialog>',
  imports: [CommonModule, ButtonModule, ConfirmDialogModule],
  providers: [DeleteService, ConfirmationService],
})
export class DeleteComponent implements OnDestroy {
  @Input() id!: number;
  @Input() mode: string = 'task';
  destroy$ = new Subject<void>();

  constructor(
    private deleteService: DeleteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить ${
        this.mode === 'task' ? 'задачу?' : 'категорию'
      }`,
      header: 'Информация',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Удаление',
          detail: 'Успешно удалено',
        });
        if (this.mode === 'task') {
          this.deleteService
            .deleteTask(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
        }
        if (this.mode === 'category') {
          this.deleteService
            .deleteCategory(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
        }
      },
      reject: () => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Удаление',
          detail: 'Не удалено',
        });
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
