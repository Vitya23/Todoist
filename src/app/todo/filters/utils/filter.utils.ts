import { FormControl, FormGroup } from '@angular/forms';
import { FilterFormI } from '../types/filterForm.interface';

export function initialFilterForm(): FormGroup<FilterFormI> {
  return new FormGroup<FilterFormI>({
    description: new FormControl(null),
    endDate: new FormControl(null),
    priority: new FormControl(null),
    category: new FormControl(null),
    status: new FormControl(null),
  });
}
