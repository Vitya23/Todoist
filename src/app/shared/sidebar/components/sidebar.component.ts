import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { SideBarService } from '../services/sidebar.services';
import { CurrentUserI } from '../../types/currentUser.interface';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [CommonModule, SidebarModule, ButtonModule, AvatarModule],
  providers: [SideBarService],
})
export class SideBarComponent implements OnInit {
  sideBarVisible = false;
  @Input() currentUser!: CurrentUserI;
  constructor() {}
  ngOnInit(): void {}
}
