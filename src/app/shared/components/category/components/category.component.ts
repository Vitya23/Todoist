import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InplaceModule } from 'primeng/inplace';
import { CategoryService } from '../services/category.service';
import { CategoryI } from '../types/category.interface';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DeleteComponent } from 'src/app/shared/components/delete/components/delete.component';
import { CategoryFormI } from '../types/categoryForm.interface';
import { TrimOnBlurDirective } from 'src/app/shared/directives/trim-on-blur.directive';
import { AppState } from 'src/app/shared/services/appState.state';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  standalone: true,
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    MenuModule,
    InputTextModule,
    ConfirmPopupModule,
    InplaceModule,
    TrimOnBlurDirective,
    CheckboxModule,
    DropdownModule,
  ],
  providers: [CategoryService, ConfirmationService],
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('DelCategoryInsertionPoint', { read: ViewContainerRef })
  DelCategoryInsertionPoint!: ViewContainerRef;

  @Input() category: CategoryI = { title: null, id: null };
  @Input() taskId: number | null = null;

  categories: CategoryI[] | null = this.appState.categories();
  categoriesTitle: (string | null)[] = [];
  form!: FormGroup<CategoryFormI>;
  active = false;
  items!: MenuItem[];
  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private appState: AppState,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
    this.initializeMenu();
  }
  initializeForm(): void {
    this.form = this.fb.group<CategoryFormI>({
      id: this.fb.control(this.category.id),
      taskId: this.fb.control(this.taskId),
      title: this.fb.control(this.category.title, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      setAll: this.fb.nonNullable.control(false),
    });
  }

  initializeValues(): void {
    if (this.categories)
      this.categoriesTitle = this.categories.map((category) => category.title);
  }

  initializeMenu(): void {
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
  onSubmit(): void {
    if (!this.category.title) {
      this.categoryService
        .addCategory(this.form.controls['title'].value ?? '')
        .pipe(takeUntil(this.destroy$))
        .subscribe();
      this.form.patchValue({ title: '' });
    } else {
      this.categoryService
        .editCategory(this.form.value as CategoryI)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }

    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Категория',
      detail: this.category.title ? 'Успешно изменена' : 'Успешно добавлена',
    });
    this.active = false;
  }

  deleteCategory(): void {
    if (this.category) {
      this.DelCategoryInsertionPoint.clear();
      let componentRef =
        this.DelCategoryInsertionPoint.createComponent(DeleteComponent);
      componentRef.instance.id = this.category.id!;
      componentRef.instance.mode = 'category';
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete;
  }
}
