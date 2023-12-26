import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppState } from 'src/app/shared/services/appState.state';

@Injectable()
export class SideBarService {
  constructor(private appState: AppState, private router: Router) {}

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

  logout(): void {
    this.appState.isLoggedInState.set(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
