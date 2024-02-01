import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil, tap } from 'rxjs';
import { DeleteComponent } from 'src/app/shared/components/delete/components/delete.component';
import { TrimOnBlurDirective } from 'src/app/shared/directives/trim-on-blur.directive';
import { AppState } from 'src/app/shared/services/appState.state';
import { DeleteMods } from '../../delete/enums/deleteMods.enum';
import { CategoryMods } from '../enums/categoryMods.enum';
import { CategoryService } from '../services/category.service';
import {
  AddCategoryI,
  CategoryFormI,
  CategoryI,
} from '../types/category.interface';
import { initializeCategoryForm } from '../utils/category.utils';

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
    InputTextModule,
    TrimOnBlurDirective,
    CheckboxModule,
    DropdownModule,
  ],
  providers: [CategoryService],
})
export class CategoryComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('DelCategoryInsertionPoint', { read: ViewContainerRef })
  DelCategoryInsertionPoint: ViewContainerRef | undefined;

  @Input() active: boolean = false;
  @Input() mode: string | null = null;
  @Input() categoryId: number | null = null;
  @Input() label: string = 'Добавить';
  @Input() header?: string;

  readonly mods = CategoryMods;

  category = signal<CategoryI>({ id: null, title: null });
  categories: WritableSignal<CategoryI[] | null> = this.appState.categories;

  form: FormGroup<CategoryFormI> = initializeCategoryForm();
  backendError: string | null = null;

  destroy$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private appState: AppState
  ) {
    toSignal(
      toObservable(this.categories).pipe(
        tap(() => {
          if (!this.mode) {
            this.setCategory();
          }
        })
      )
    );
  }

  ngOnInit(): void {
    this.addFormControls();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['categoryId'].isFirstChange()) {
      this.setCategory();
    }
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
    const categories = this.categories();
    if (categories) {
      const category = categories.find(
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
      const componentRef =
        this.DelCategoryInsertionPoint.createComponent(DeleteComponent);
      componentRef.instance.id = id;
      componentRef.instance.mode = DeleteMods.CATEGORY;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete;
  }
}
