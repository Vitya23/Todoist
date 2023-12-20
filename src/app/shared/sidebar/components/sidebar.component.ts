import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { SideBarService } from '../services/sidebar.services';
import { CurrentUserI } from '../../types/currentUser.interface';
import { UserService } from '../../services/user.service';
import { AuthState } from '../../services/authState.state';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [CommonModule, SidebarModule, ButtonModule, AvatarModule],
  providers: [SideBarService],
})
export class SideBarComponent implements OnInit, OnDestroy {
  sideBarVisible = false;
  currentUser!: CurrentUserI;
  subscription!: Subscription;
  constructor(
    private userService: UserService,
    private authState: AuthState,
    private router: Router
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
        this.authState.isLoggedInState.set(false);
        this.router.navigateByUrl('/login');
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
