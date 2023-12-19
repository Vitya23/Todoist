import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { SideBarComponent } from './shared/sidebar/components/sidebar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Todoist';
  isAuth = true;
}
