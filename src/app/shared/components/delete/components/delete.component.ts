import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeleteService } from '../services/delete.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DeleteMods } from '../enums/deleteMods.enum';
import {
  MessageDetail,
  MessageSeverity,
  MessageSummary,
} from 'src/app/shared/enums/message.enum';
import {
  ConfirmationButtonStyle,
  ConfirmationHeader,
  ConfirmationLabel,
  ConfirmationMessage,
} from 'src/app/shared/enums/confirmation.enum';
import { Icon } from 'src/app/shared/enums/icon.enum';

@Component({
  standalone: true,
  selector: 'app-delete',
  template: '<p-confirmDialog></p-confirmDialog>',
  imports: [ButtonModule, ConfirmDialogModule],
  providers: [DeleteService, ConfirmationService],
})
export class DeleteComponent implements OnInit, OnDestroy {
  @Input() id: number | null = null;
  @Input() mode: DeleteMods = DeleteMods.TASK;
  destroy$ = new Subject<void>();

  constructor(
    private deleteService: DeleteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.confirmationService.confirm({
      message:
        this.mode === DeleteMods.TASK
          ? ConfirmationMessage.DELETE_TASK
          : ConfirmationMessage.DELETE_CATEGORY,
      header: ConfirmationHeader.DELETE_HEADER,
      icon: Icon.INFO_CIRCLE,
      acceptLabel: ConfirmationLabel.ACCEPT,
      rejectLabel: ConfirmationLabel.REJECT,
      acceptButtonStyleClass: ConfirmationButtonStyle.ACCEPT,
      rejectButtonStyleClass: ConfirmationButtonStyle.REJECT,
      acceptIcon: Icon.NONE,
      rejectIcon: Icon.NONE,

      accept: () => {
        this.messageService.clear();
        this.messageService.add({
          severity: MessageSeverity.SUCCESS,
          summary:
            this.mode === DeleteMods.TASK
              ? MessageSummary.TASK
              : MessageSummary.CATEGORY,
          detail: MessageDetail.DEL_SUCCESS,
        });
        if (this.mode === DeleteMods.TASK && this.id) {
          this.deleteService
            .deleteTask(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
        }
        if (this.mode === DeleteMods.CATEGORY && this.id) {
          this.deleteService
            .deleteCategory(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
        }
      },
      reject: () => {
        this.messageService.clear();
        this.messageService.add({
          severity: MessageSeverity.ERROR,
          summary:
            this.mode === DeleteMods.TASK
              ? MessageSummary.TASK
              : MessageSummary.CATEGORY,
          detail: MessageDetail.DEL_ERROR,
        });
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
