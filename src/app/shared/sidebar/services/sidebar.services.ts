import { Injectable } from '@angular/core';
import { AuthState } from '../../services/authState.state';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Injectable()
export class SideBarService {
  private readonly items: MenuItem[] = [
    {
      label: 'Меню',
      items: [
        {
          label: 'Выйти',
          icon: 'pi pi-sign-out',
          command: () => {
            this.logout();
          },
        },
      ],
    },
  ];

  get userItems(): MenuItem[] {
    return this.items;
  }

  constructor(private authState: AuthState, private router: Router) {}
  logout(): void {
    this.authState.isLoggedInState.set(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
