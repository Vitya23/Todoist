import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ColumnFilter, Table, TableModule } from 'primeng/table';
import { PriorityI } from '../../todo-add-edit/types/priority.interface';
import { AppState } from 'src/app/shared/services/appState.state';
import { PriorityDirective } from 'src/app/shared/directives/priority.directive';

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
  providers: [AppState],
})
export class FilterComponent {
  filter: string | null = null;
  field: string = 'description';
  priority: PriorityI[] = inject(AppState).priorityItems;
  @Input() table: Table | null = null;
  fields: object[] = [
    { label: 'Задача', value: 'description' },
    { label: 'Дата окончания', value: 'endDate' },
    { label: 'Приоритет', value: 'priority' },
  ];

  constructor() {}

  applyFilter(filter: ColumnFilter) {
    this.table?.filterGlobal(
      this.filter,
      this.field === 'description' ? 'contains' : 'equals'
    );
    filter.overlayVisible = false;
  }
  clearFilter(filter: ColumnFilter) {
    this.table?.clear();
    filter.overlayVisible = false;
  }
}
