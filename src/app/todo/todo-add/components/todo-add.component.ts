import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TodoAddService } from '../services/todo-add.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
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
    { title: 'Приоритет 1', priority: 1 },
    { title: 'Приоритет 2', priority: 2 },
    { title: 'Приоритет 3', priority: 3 },
    { title: 'Приоритет 4', priority: 4 },
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
