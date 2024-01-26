import { FormControl } from '@angular/forms';
import { PriorityI } from '../../todo-add-edit/types/priority.interface';

export interface FilterFormI {
  description: FormControl<string | null>;
  endDate: FormControl<Date | null>;
  priority: FormControl<PriorityI | null>;
  category: FormControl<number | null>;
  status: FormControl<string | null>;
}
