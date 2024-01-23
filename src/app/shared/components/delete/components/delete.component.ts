import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeleteService } from '../services/delete.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DeleteMods } from '../enums/deleteMods.enum';

@Component({
  standalone: true,
  selector: 'app-delete',
  template: '<p-confirmDialog></p-confirmDialog>',
  imports: [ButtonModule, ConfirmDialogModule],
  providers: [DeleteService, ConfirmationService],
})
export class DeleteComponent implements OnInit, OnDestroy {
  @Input() id: number | null = null;
  @Input() mode: DeleteMods = DeleteMods.Task;
  destroy$ = new Subject<void>();

  constructor(
    private deleteService: DeleteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить ${
        this.mode === DeleteMods.Task ? 'задачу?' : 'категорию'
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
          summary: this.mode === DeleteMods.Task ? 'Задача' : 'Категория',
          detail: 'успешно удалена',
        });
        if (this.mode === DeleteMods.Task && this.id) {
          this.deleteService
            .deleteTask(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
        }
        if (this.mode === DeleteMods.Category && this.id) {
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
          summary: this.mode === DeleteMods.Task ? 'Задача' : 'Категория',
          detail: 'не удалена',
        });
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
