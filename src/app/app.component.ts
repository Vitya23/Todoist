import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './shared/sidebar/components/sidebar.component';
import { UserService } from './shared/services/user.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CurrentUserI } from './shared/types/currentUser.interface';
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
  currentUser$: Observable<CurrentUserI> = inject(UserService).getCurrentUser();
}
