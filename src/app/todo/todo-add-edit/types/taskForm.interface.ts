import { FormControl } from '@angular/forms';
import { PriorityI } from './priority.interface';

export interface TaskFormI {
  description: FormControl<string | null>;
  endDate: FormControl<Date | null>;
  priority: FormControl<PriorityI | null>;
  category: FormControl<number | null>;
}
