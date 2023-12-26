import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SideBarService } from '../services/sidebar.services';

import { Subject, takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { CurrentUserI } from 'src/app/shared/types/currentUser.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { MenubarModule } from 'primeng/menubar';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [CommonModule, AvatarModule, MenuModule, MenubarModule],
  providers: [SideBarService],
})
export class SideBarComponent implements OnInit, OnDestroy {
  currentUser!: CurrentUserI;
  items: MenuItem[] = this.sidebarService.userItems;
  destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private sidebarService: SideBarService
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
