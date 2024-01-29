import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { HeaderService } from '../services/header.service';

import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { MenubarModule } from 'primeng/menubar';
import { UserService } from 'src/app/shared/services/user.service';
import { CurrentUserI } from 'src/app/shared/types/currentUser.interface';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [AvatarModule, MenuModule, MenubarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeaderService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser = signal<CurrentUserI | null>(null);
  items: MenuItem[] = this.headerService.userItems;
  destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private headerService: HeaderService
  ) {}
  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.userService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (currentUser: CurrentUserI) => {
          this.currentUser.set(currentUser);
        },

        error: () => {
          this.headerService.logout();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
