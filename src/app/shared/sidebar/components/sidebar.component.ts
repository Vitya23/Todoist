import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SideBarService } from '../services/sidebar.services';
import { CurrentUserI } from '../../types/currentUser.interface';
import { UserService } from '../../services/user.service';
import { AppState } from '../../services/appState.state';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

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
    MenuModule,
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
