import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CategoryService } from '../services/category.service';
import { CategoryI } from '../types/category.interface';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subject, takeUntil, tap } from 'rxjs';
import { DeleteComponent } from 'src/app/shared/components/delete/components/delete.component';
import { CategoryFormI } from '../types/categoryForm.interface';
import { TrimOnBlurDirective } from 'src/app/shared/directives/trim-on-blur.directive';
import { AppState } from 'src/app/shared/services/appState.state';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DeleteMods } from '../../delete/enums/deleteMods.enum';
import { CategoryMods } from '../enums/categoryMods.enum';
import { initializeCategoryForm } from '../utils/category.utils';
import { AddCategoryI } from '../types/addCategory.interface';

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
    TrimOnBlurDirective,
    CheckboxModule,
    DropdownModule,
    AutoCompleteModule,
  ],
  providers: [CategoryService, ConfirmationService],
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('DelCategoryInsertionPoint', { read: ViewContainerRef })
  DelCategoryInsertionPoint: ViewContainerRef | undefined;

  mods = CategoryMods;

  category = signal<CategoryI>({ id: null, title: null });
  categories: WritableSignal<CategoryI[] | null> = this.appState.categories;

  @Input() active: boolean = false;
  @Input() mode: string | null = null;
  @Input() categoryId: number | null = null;
  @Input() label: string = 'Добавить';
  @Input() header: string | undefined;

  form: FormGroup<CategoryFormI> = initializeCategoryForm();
  backendError: string | null = null;

  destroy$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private appState: AppState
  ) {
    toSignal(toObservable(this.categories).pipe(tap(() => this.setCategory())));
  }

  ngOnInit(): void {
    this.addFormControls();
  }
  addFormControls(): void {
    if (this.mode === this.mods.ADD) {
      this.form.addControl(
        'setAll',
        new FormControl(false, { nonNullable: true })
      );
    } else {
      this.form.addControl('id', new FormControl(null, Validators.required));
    }
  }

  setCategory() {
    if (this.categories()) {
      const category = this.categories()?.find(
        (category) => category.id === this.categoryId
      );
      this.category.set(
        category
          ? { id: category.id, title: category.title }
          : { id: null, title: null }
      );
    }
  }

  onSubmit(): void {
    if (this.mode === this.mods.ADD) {
      this.categoryService
        .addCategory(this.form.value as AddCategoryI)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageServiceAdd('success', 'успешно добавлена');
          },
          error: (err) => {
            this.messageServiceAdd('error', err.error.message);
          },
        });
    }
    if (this.mode === this.mods.EDIT) {
      this.categoryService
        .editCategory(this.form.value as CategoryI)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageServiceAdd('success', 'успешно изменена');
          },
          error: (err) => {
            this.messageServiceAdd('error', err.error.message);
          },
        });
    }
    if (this.mode === this.mods.DELETE) {
      this.deleteCategory();
    }
    this.active = false;
  }

  messageServiceAdd(severity: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: severity,
      summary: 'Категория',
      detail: detail,
    });
  }

  deleteCategory(): void {
    const { id } = this.form.value;
    if (this.DelCategoryInsertionPoint && id) {
      this.DelCategoryInsertionPoint.clear();
      let componentRef =
        this.DelCategoryInsertionPoint.createComponent(DeleteComponent);
      componentRef.instance.id = id;
      componentRef.instance.mode = DeleteMods.Category;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete;
  }
}
