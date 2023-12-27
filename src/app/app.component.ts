import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { CommonModule } from '@angular/common';
import { AppState } from './shared/services/appState.state';
import { HeaderComponent } from './shared/components/header/components/header.component';
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, MessagesModule],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Todoist';
  appState = inject(AppState);
  isLoggedIn: boolean = false;
  constructor() {
    effect(() => {
      this.isLoggedIn = this.appState.isLoggedInState();
    });
  }
}
