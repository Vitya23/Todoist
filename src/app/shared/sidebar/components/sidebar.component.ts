import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [CommonModule, SidebarModule, ButtonModule, AvatarModule],
})
export class SideBarComponent implements OnInit {
  sideBarVisible = false;
  user!: Observable<any>;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.user = this.authService.user;
    console.log(this.authService.user);
  }
}
