import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppState } from './shared/services/appState.state';
import { HeaderComponent } from './shared/components/header/components/header.component';
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MessagesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Todoist';
  isLoggedIn = inject(AppState).isLoggedInState;
}
