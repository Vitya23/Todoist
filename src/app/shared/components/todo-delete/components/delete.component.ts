import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeleteService } from '../services/delete.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
  imports: [CommonModule, ButtonModule, ConfirmDialogModule],
  providers: [DeleteService, ConfirmationService, MessageService],
})
export class DeleteComponent implements OnDestroy {
  @Input() id!: number;
  @Input() mode: string = 'task';
  deleteSubs!: Subscription;

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
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
        if (this.mode === 'task') {
          this.deleteSubs = this.deleteService.deleteTask(this.id).subscribe();
        }
        if (this.mode === 'category') {
          this.deleteSubs = this.deleteService
            .deleteCategory(this.id)
            .subscribe();
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
  ngOnDestroy(): void {
    if (this.deleteSubs) {
      this.deleteSubs.unsubscribe();
    }
  }
}
