import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './shared/sidebar/components/sidebar.component';
import { UserService } from './shared/services/user.service';
import { CommonModule } from '@angular/common';
import { AuthState } from './shared/services/authState.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideBarComponent],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Todoist';
  authState = inject(AuthState);
  isLoggedIn!: boolean;
  constructor() {
    effect(() => {
      this.isLoggedIn = this.authState.isLoggedInState();
    });
  }
}
