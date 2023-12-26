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
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InplaceModule } from 'primeng/inplace';
import { CategoryService } from '../services/category.service';
import { CategoryI } from '../types/category.interface';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DeleteComponent } from '../../todo-delete/components/delete.component';
import { CategoryFormI } from '../types/categoryForm.interface';
import { TrimOnBlurDirective } from 'src/app/shared/directives/trim-on-blur.directive';
import { AppState } from 'src/app/shared/services/appState.state';

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
    TrimOnBlurDirective,
  ],
  providers: [CategoryService, ConfirmationService, MessageService],
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild('DelCategoryInsertionPoint', { read: ViewContainerRef })
  DelCategoryInsertionPoint!: ViewContainerRef;
  @Input() category: CategoryI = { title: null, id: null };

  categories: CategoryI[] | null = this.appState.categories();
  form!: FormGroup<CategoryFormI>;
  active = false;
  items!: MenuItem[];
  destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private appState: AppState,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeMenu();
  }
  initializeForm() {
    this.form = this.fb.group<CategoryFormI>({
      id: this.fb.control(this.category.id),
      title: this.fb.control(this.category.title, [
        Validators.required,
        Validators.maxLength(20),
      ]),
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
        .addCategory(this.form.controls['title'].value ?? '')
        .pipe(takeUntil(this.destroy$))
        .subscribe();
      this.active = false;
    } else {
      this.categoryService
        .editCategory(this.form.value as CategoryI)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
    this.form.patchValue({ title: '' });
  }

  deleteCategory() {
    this.DelCategoryInsertionPoint.clear();
    let componentRef =
      this.DelCategoryInsertionPoint.createComponent(DeleteComponent);
    componentRef.instance.id = this.category.id!;
    componentRef.instance.mode = 'category';
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete;
  }
}
