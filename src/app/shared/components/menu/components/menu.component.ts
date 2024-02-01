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
import { CategoryMods } from '../../category/enums/category.enum';
import {
  MainMenuLabel,
  SecondaryMenuLabel,
} from 'src/app/shared/enums/menu-item.enum';
import { Icon } from 'src/app/shared/enums/icon.enum';

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
  categoryMods = CategoryMods;
  items: MenuItem[] = [];
  buttonLabel = MainMenuLabel.MENU;

  ngOnInit(): void {
    this.initializeMenu();
  }

  initializeMenu(): void {
    this.items = [
      {
        label: MainMenuLabel.ADD,
        icon: Icon.ADD,
        items: [
          {
            label: SecondaryMenuLabel.TASK,
            icon: Icon.TASK,
            command: () => {
              this.generateTodoAddComponent();
            },
          },

          {
            label: SecondaryMenuLabel.CATEGORY,
            icon: Icon.CATEGORY,
            command: () => {
              this.generateCategoryAddComponent();
            },
          },
        ],
      },
      {
        label: MainMenuLabel.EDIT,
        icon: Icon.EDIT,
        items: [
          {
            label: SecondaryMenuLabel.CATEGORY,
            icon: Icon.CATEGORY,
            command: () => {
              this.generateCategoryEditComponent();
            },
          },
        ],
      },
      {
        label: MainMenuLabel.DELETE,
        icon: Icon.DELETE,
        items: [
          {
            label: SecondaryMenuLabel.CATEGORY,
            icon: Icon.CATEGORY,
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
      this.childInsertionPoint.createComponent(TodoAddEditComponent);
    }
  }
  generateCategoryAddComponent() {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(CategoryComponent);
      componentRef.instance.active = true;
      componentRef.instance.mode = this.categoryMods.ADD;
      componentRef.instance.label = 'Добавить';
      componentRef.instance.header = 'Добавить категорию';
    }
  }
  generateCategoryEditComponent() {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(CategoryComponent);
      componentRef.instance.active = true;
      componentRef.instance.mode = this.categoryMods.EDIT;
      componentRef.instance.label = 'Сохранить';
      componentRef.instance.header = 'Изменить категорию';
    }
  }
  generateCategoryDeleteComponent() {
    if (this.childInsertionPoint) {
      this.childInsertionPoint.clear();
      const componentRef =
        this.childInsertionPoint.createComponent(CategoryComponent);
      componentRef.instance.active = true;
      componentRef.instance.mode = this.categoryMods.DELETE;
      componentRef.instance.label = 'Удалить';
      componentRef.instance.header = 'Удалить категорию';
    }
  }
}
