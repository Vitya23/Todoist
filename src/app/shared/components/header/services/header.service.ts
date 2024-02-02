import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Icons } from 'src/app/constants/icons';
import { Label } from 'src/app/shared/enums/label.enum';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class HeaderService extends UserService {
  private readonly items: MenuItem[] = [
    {
      label: Label.MENU,
      items: [
        {
          label: Label.EXIT,
          icon: Icons.EXIT,
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
