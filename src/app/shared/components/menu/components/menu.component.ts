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

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MenubarModule, ButtonModule, TieredMenuModule],
})
export class MenuComponent implements OnInit {
  @ViewChild('ChildAddInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint!: ViewContainerRef;

  items: MenuItem[] | null = null;

  ngOnInit(): void {
    this.initializeMenu();
  }

  initializeMenu(): void {
    this.items = [
      {
        label: 'Создать',
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
        icon: 'pi pi-plus',
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
    this.childInsertionPoint.clear();
    this.childInsertionPoint.createComponent(TodoAddEditComponent);
  }
  generateCategoryAddComponent() {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(CategoryComponent);
    componentRef.instance.active = true;
    componentRef.instance.mode = 'add';
  }
  generateCategoryEditComponent() {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(CategoryComponent);
    componentRef.instance.active = true;
    componentRef.instance.mode = 'edit';
  }
  generateCategoryDeleteComponent() {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(CategoryComponent);
    componentRef.instance.active = true;
    componentRef.instance.mode = 'delete';
  }
}
