import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SideBarService } from '../services/sidebar.services';

import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { CurrentUserI } from 'src/app/shared/types/currentUser.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    MenuModule,
    InplaceModule,
    PanelMenuModule,
    TableModule,
  ],
  providers: [SideBarService],
})
export class SideBarComponent implements OnInit, OnDestroy {
  sideBarVisible = false;
  currentUser!: CurrentUserI;
  subscription!: Subscription;
  items: MenuItem[] = this.sidebarService.userItems;

  constructor(
    private userService: UserService,
    private sidebarService: SideBarService
  ) {}
  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.subscription = this.userService.getCurrentUser().subscribe({
      next: (currentUser: CurrentUserI) => {
        this.currentUser = currentUser;
      },
      error: () => {
        this.sidebarService.logout();
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
