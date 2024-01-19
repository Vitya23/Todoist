import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TodoAddEditComponent } from 'src/app/todo/todo-add-edit/components/todo-add-edit.component';
import { MenuItem } from 'primeng/api';
import { CategoryComponent } from '../../category/components/category.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { CategoryMods } from '../../category/enums/categoryMods.enum';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    TieredMenuModule,
    MenuModule,
  ],
})
export class MenuComponent implements OnInit {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint: ViewContainerRef | undefined;
  categoryMods = CategoryMods;
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.initializeMenu();
  }

  initializeMenu(): void {
    this.items = [
      {
        label: 'Добавить',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Задачу',
            icon: 'pi pi-book ',
            command: () => {
              this.generateTodoAddComponent();
            },
          },

          {
            label: 'Категорию',
            icon: 'pi pi-table',
            command: () => {
              this.generateCategoryAddComponent();
            },
          },
        ],
      },
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Категорию',
            icon: 'pi pi-table',
            command: () => {
              this.generateCategoryEditComponent();
            },
          },
        ],
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        items: [
          {
            label: 'Категорию',
            icon: 'pi pi-table',
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
