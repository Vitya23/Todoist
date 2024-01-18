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
  FormBuilder,
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
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DeleteMods } from '../../delete/enums/deleteMods.enum';

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
  DelCategoryInsertionPoint!: ViewContainerRef;

  category = signal<CategoryI>({ id: null, title: null });
  categories: WritableSignal<CategoryI[] | null> = this.appState.categories;

  @Input() active: boolean = false;
  @Input() mode: string | null = null;
  @Input() categoryId: number | null = null;
  filteredCategories: string[] | undefined;
  form!: FormGroup<CategoryFormI>;
  backendError: string | null = null;

  items!: MenuItem[];
  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private appState: AppState
  ) {
    toSignal(toObservable(this.categories).pipe(tap(() => this.patchForm())));
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeMenu();
  }
  initializeForm(): void {
    this.form = this.fb.group<CategoryFormI>({
      id: this.fb.control(null),
      title: this.fb.control(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
    if (this.mode === 'add') {
      this.form.addControl(
        'setAll',
        new FormControl(false, { nonNullable: true })
      );
    }
  }

  patchForm() {
    if (this.categories()) {
      const category = this.categories()?.find(
        (category) => category.id === this.categoryId
      );
      this.category.set(category ? category : { id: null, title: null });
      this.form.patchValue(category ? category : { id: null, title: null });
      console.log(this.category());
    }
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
    const { title, setAll } = this.form.value;
    if (this.mode === 'add') {
      this.categoryService
        .addCategory({ title: title as string, setAll: setAll as boolean })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageServiceAdd('success');
          },
          error: (err) => {
            this.backendError = err.error.message;
            this.messageServiceAdd('error');
          },
        });
      this.form.patchValue({ title: null });
    } else {
      this.categoryService
        .editCategory(this.form.value as CategoryI)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageServiceAdd('success');
          },
          error: (err) => {
            this.backendError = err.error.message;
            this.messageServiceAdd('error');
          },
        });
    }

    this.active = false;
    console.log(this.categories());
  }

  messageServiceAdd(severity: string) {
    this.messageService.clear();
    if (severity === 'success') {
      this.messageService.add({
        severity: severity,
        summary: 'Категория',

        detail: this.form.controls['title'].value
          ? 'Успешно изменена'
          : 'Успешно добавлена',
      });
    }
    if (severity === 'error')
      this.messageService.add({
        severity: severity,
        summary: 'Категория',

        detail: this.backendError as string,
      });
    {
    }
  }

  deleteCategory(): void {
    const categoryId = this.form.controls['id'].value;
    if (categoryId !== null) {
      this.DelCategoryInsertionPoint.clear();
      let componentRef =
        this.DelCategoryInsertionPoint.createComponent(DeleteComponent);
      componentRef.instance.id = categoryId;
      componentRef.instance.mode = DeleteMods.Category;
    }
  }

  filterCategory(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    const categories = this.categories();
    let filteredCategory: string[] = [];
    if (categories) {
      categories.forEach((category: CategoryI) => {
        if (category.title) {
          if (category.title.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filteredCategory.push(category.title);
          }
        }
      });
    }
    this.filteredCategories = filteredCategory;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete;
  }
}
