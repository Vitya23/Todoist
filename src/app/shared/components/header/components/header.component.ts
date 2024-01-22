import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { HeaderService } from '../services/header.services';

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
  imports: [CommonModule, AvatarModule, MenuModule, MenubarModule],
  providers: [HeaderService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserI | null = null;
  items: MenuItem[] = this.sidebarService.userItems;
  destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private sidebarService: HeaderService
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
          this.currentUser = currentUser;
        },

        error: () => {
          this.sidebarService.logout();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
