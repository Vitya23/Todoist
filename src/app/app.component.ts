import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { CommonModule } from '@angular/common';
import { AppState } from './shared/services/appState.state';
import { SideBarComponent } from './shared/components/sidebar/components/sidebar.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideBarComponent, MessagesModule],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Todoist';
  appState = inject(AppState);
  isLoggedIn!: boolean;
  constructor(private mess: MessageService) {
    effect(() => {
      this.isLoggedIn = this.appState.isLoggedInState();
    });
  }
  addSingle() {
    this.mess.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }
}
