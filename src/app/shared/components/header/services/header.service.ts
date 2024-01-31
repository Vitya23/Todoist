import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class HeaderService extends UserService {
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
}
