import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ColumnFilter, Table, TableModule } from 'primeng/table';
import { PriorityI } from '../../todo-add-edit/types/priority.interface';
import { PriorityDirective } from 'src/app/shared/directives/priority.directive';
import { CategoryI } from 'src/app/shared/components/category/types/category.interface';
import { ChangeStatusI } from '../../todo-status/types/changeStatus.interface';
import { taskFieldI } from '../types/taskField.interface';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MenubarModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    MenuModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    PriorityDirective,
  ],
})
export class FilterComponent {
  filterValue: string | null = null;
  taskField: string = 'description';

  @Output() onChangeField = new EventEmitter<any>();
  @Input() title: string | null = null;
  @Input() table: Table | null = null;
  @Input() field?: string;
  @Input() optionLabel?: string;
  @Input() optionValue?: string;
  @Input() dropDownOption?: CategoryI[] | PriorityI[] | ChangeStatusI[];

  taskFields: taskFieldI[] = [
    { label: 'Задачам', value: 'description' },
    { label: 'Дате окончания', value: 'endDate' },
    { label: 'Приоритету', value: 'priority' },
  ];

  applyFilter(filter: ColumnFilter) {
    if (this.table) {
      filter.overlayVisible = false;
      if (this.field) {
        this.table.filter(this.filterValue, this.field, 'contains');
      }
      if (!this.field) {
        this.table.filter(this.filterValue, this.taskField, 'contains');
        this.onChangeField.emit(this.taskField);
      }
    }
  }
  clearFilter() {
    if (this.table) {
      this.table.clear();
    }
  }
}
