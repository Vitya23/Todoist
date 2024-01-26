import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { Table } from 'primeng/table';
import { PriorityDirective } from 'src/app/shared/directives/priority.directive';
import { AppState } from 'src/app/shared/services/appState.state';
import { PriorityI } from '../../todo-add-edit/types/priority.interface';
import { FilterFormI } from '../types/filterForm.interface';
import { initialFilterForm } from '../utils/filter.utils';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    PriorityDirective,
    SidebarModule,
  ],
})
export class FilterComponent {
  @Input() table: Table | null = null;
  sidebarVisible: boolean = false;
  form: FormGroup<FilterFormI> = initialFilterForm();
  priorities: PriorityI[] = this.appState.priorityItems;
  categories = this.appState.categories;
  statuses = this.appState.statusItems;

  constructor(private appState: AppState) {}

  applyFilter() {
    Object.entries(this.form.controls).forEach(([field, control]) => {
      if (control.value && this.table) {
        this.table.filter(control.value, field, 'contains');
      }
    });
    this.sidebarVisible = false;
  }
  clearFilter() {
    if (this.table) {
      this.table.clear();
      this.form.reset();
    }
  }
}
