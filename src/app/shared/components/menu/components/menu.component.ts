import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TodoAddEditComponent } from 'src/app/todo/todo-add-edit/components/todo-add-edit.component';
import { CategoryComponent } from '../../category/components/category.component';
import {
  CategoryHeader,
  CategoryMods,
} from '../../category/enums/category.enum';

import { Label } from 'src/app/shared/enums/label.enum';
import { MenuLabel } from 'src/app/shared/enums/menu-item.enum';
import { TodoHeader } from 'src/app/shared/enums/todo.enum';
import { Severity } from 'src/app/constants/severity';
import { Icons } from 'src/app/constants/icons';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenubarModule, ButtonModule, TieredMenuModule, MenuModule],
})
export class MenuComponent implements OnInit {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint: ViewContainerRef | null = null;

  Icons = Icons;
  ButtonSeverity = Severity;
  categoryMods = CategoryMods;
  items: MenuItem[] = [];
  buttonLabel = Label.MENU;

  ngOnInit(): void {
    this.initializeMenu();
  }

  initializeMenu(): void {
    this.items = [
      {
        label: Label.ADD,
        icon: Icons.ADD,
        items: [
          {
            label: MenuLabel.TASK,
            icon: Icons.TASK,
            command: () => {
              this.generateTodoAddComponent();
            },
          },

          {
            label: MenuLabel.CATEGORY,
            icon: Icons.CATEGORY,
            command: () => {
              this.generateCategoryAddComponent();
            },
          },
        ],
      },
      {
        label: Label.EDIT,
        icon: Icons.EDIT,
        items: [
          {
            label: MenuLabel.CATEGORY,
            icon: Icons.CATEGORY,
            command: () => {
              this.generateCategoryEditComponent();
            },
          },
        ],
      },
      {
        label: Label.DELETE,
        icon: Icons.DELETE_MAIN,
        items: [
          {
            label: MenuLabel.CATEGORY,
            icon: Icons.CATEGORY,
            command: () => {
              this.generateCategoryDeleteComponent();
            },
          },
        ],
      },
    ];
  }

  generateTodoAddComponent() {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(TodoAddEditComponent);
      componentRef.instance.label = Label.ADD;
      componentRef.instance.header = TodoHeader.ADD;
    }
  }
  generateCategoryAddComponent() {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(CategoryComponent);
      componentRef.instance.active = true;
      componentRef.instance.mode = this.categoryMods.ADD;
      componentRef.instance.label = Label.ADD;
      componentRef.instance.header = CategoryHeader.ADD;
    }
  }
  generateCategoryEditComponent() {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(CategoryComponent);
      componentRef.instance.active = true;
      componentRef.instance.mode = this.categoryMods.EDIT;
      componentRef.instance.label = Label.EDIT;
      componentRef.instance.header = CategoryHeader.EDIT;
    }
  }
  generateCategoryDeleteComponent() {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(CategoryComponent);
      componentRef.instance.active = true;
      componentRef.instance.mode = this.categoryMods.DELETE;
      componentRef.instance.label = Label.DELETE;
      componentRef.instance.header = CategoryHeader.DELETE;
    }
  }
}
