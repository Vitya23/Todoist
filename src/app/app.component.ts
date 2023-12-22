import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './shared/sidebar/components/sidebar.component';
import { UserService } from './shared/services/user.service';
import { CommonModule } from '@angular/common';
import { AppState } from './shared/services/appState.state';

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
  appState = inject(AppState);
  isLoggedIn!: boolean;
  constructor() {
    effect(() => {
      this.isLoggedIn = this.appState.isLoggedInState();
    });
  }
}
