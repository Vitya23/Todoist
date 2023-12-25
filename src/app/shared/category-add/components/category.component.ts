import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { InplaceModule } from 'primeng/inplace';
import { CategoryService } from '../services/category.service';
import { CategoriesI } from '../types/categories.interface';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

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
  ],
  providers: [CategoryService],
})
export class CategoryComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  active = false;
  items!: MenuItem[];
  destroy$ = new Subject();
  @Input() category: CategoriesI = { title: '' };
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
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
    console.log('del');
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete;
  }
}
