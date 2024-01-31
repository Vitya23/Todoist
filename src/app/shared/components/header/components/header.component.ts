import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { HeaderService } from '../services/header.service';

import { MenuItem } from 'primeng/api';

import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, AvatarModule, MenuModule, MenubarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeaderService],
})
export class HeaderComponent {
  headerService = inject(HeaderService);
  currentUser$ = this.headerService.getCurrentUser();
  items: MenuItem[] = this.headerService.userItems;
}
