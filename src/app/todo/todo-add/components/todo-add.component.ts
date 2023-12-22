import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TodoAddService } from '../services/todo-add.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CategoriesI } from '../../todo-list/types/categories.interface';
@Component({
  standalone: true,
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
  ],
  providers: [TodoAddService],
})
export class TodoAddComponent implements OnInit {
  visible: boolean = true;
  @Input() category!: number;
  form!: FormGroup;
  priorities: object[] = [
    { title: 'Priority 1', priority: 1 },
    { title: 'Priority 2', priority: 2 },
    { title: 'Priority 3', priority: 3 },
    { title: 'Priority 4', priority: 4 },
  ];
  constructor(
    private fb: FormBuilder,
    private todoAddService: TodoAddService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    console.log(this.category);
  }
  initializeForm() {
    let a = [...this.priorities];
    this.form = this.fb.group({
      description: '',
      date: '',
      selectedPriority: '',
      category: this.category,
    });
  }
  onSubmit() {
    this.todoAddService.addTask(this.form.value).subscribe();
    this.visible = false;
  }
}
