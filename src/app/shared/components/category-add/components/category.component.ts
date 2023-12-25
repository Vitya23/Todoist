import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InplaceModule } from 'primeng/inplace';
import { CategoryService } from '../services/category.service';
import { CategoriesI } from '../types/categories.interface';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DeleteComponent } from '../../todo-delete/components/delete.component';

@Component({
  standalone: true,
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    MenuModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InplaceModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
  ],
  providers: [CategoryService, ConfirmationService, MessageService],
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('ChildInsertionPoint', { read: ViewContainerRef })
  childInsertionPoint!: ViewContainerRef;

  form!: FormGroup;
  active = false;
  items!: MenuItem[];
  destroy$ = new Subject();
  @Input() category: CategoriesI = { title: '' };
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeMenu();
  }
  initializeForm() {
    this.form = this.fb.group({
      category: this.category.title,
    });
  }
  initializeMenu() {
    {
      this.items = [
        {
          label: 'Редактировать',
          icon: 'pi pi-pencil',
          command: () => {
            this.active = true;
          },
        },
        {
          label: 'Удалить',
          icon: 'pi pi-times',
          command: () => {
            this.deleteCategory();
          },
        },
      ];
    }
  }
  onSubmit() {
    if (!this.category.title) {
      this.categoryService
        .addCategory(this.form.controls['category'].value)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
      this.active = false;
    } else {
      this.categoryService
        .editCategory({
          title: this.form.controls['category'].value,
          id: this.category.id,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  deleteCategory() {
    this.childInsertionPoint.clear();
    let componentRef =
      this.childInsertionPoint.createComponent(DeleteComponent);
    componentRef.instance.id = this.category.id!;
    componentRef.instance.mode = 'category';
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete;
  }
}
