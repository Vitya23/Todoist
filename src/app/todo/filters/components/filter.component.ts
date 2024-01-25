import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { CardModule } from 'primeng/card';
import { AppState } from 'src/app/shared/services/appState.state';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MenubarModule,
    DropdownModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    MenuModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    PriorityDirective,
    TableModule,
    OverlayPanelModule,
    ScrollPanelModule,
    DividerModule,
  ],
})
export class FilterComponent {
  filterValue: string | null = null;
  taskField: string = 'description';
  form: FormGroup = new FormGroup({
    description: new FormControl(null),
    endDate: new FormControl(null),
    priority: new FormControl(null),
    category: new FormControl(null),
    status: new FormControl(null),
  });
  show = false;
  @Input() table: Table | null = null;
  priorities: PriorityI[] = this.appState.priorityItems;
  categories = this.appState.categories;
  status = this.appState.statusItems;

  constructor(private appState: AppState) {}

  taskFields: taskFieldI[] = [
    { label: 'Задачам', value: 'description' },
    { label: 'Дате окончания', value: 'endDate' },
    { label: 'Приоритету', value: 'priority' },
    { label: 'Категории', value: 'category' },
    { label: 'Статусу', value: 'status' },
  ];

  applyFilter(overlay: OverlayPanel) {
    Object.entries(this.form.controls).forEach(([key, control]) => {
      if (control.value && this.table) {
        this.table.filter(control.value, key, 'contains');
      }
    });
    overlay.hide();
  }
  clearFilter() {
    if (this.table) {
      this.table.clear();
    }
  }
}
