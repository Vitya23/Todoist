import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TodoDeleteService } from '../services/todo-delete.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrl: './todo-delete.component.scss',
  imports: [CommonModule, ButtonModule, ConfirmDialogModule],
  providers: [TodoDeleteService, ConfirmationService, MessageService],
})
export class TodoDeleteComponent implements OnDestroy {
  @Input() id!: number;
  deleteSubs!: Subscription;

  constructor(
    private todoDeleteService: TodoDeleteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  deleteTask(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Вы действительно хотите удалить задачу?',
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
        this.deleteSubs = this.todoDeleteService
          .deleteTask(this.id)
          .subscribe();
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
