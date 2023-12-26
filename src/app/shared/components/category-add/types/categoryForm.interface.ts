import { FormControl } from '@angular/forms';

export interface CategoryFormI {
  id: FormControl<number | null>;
  title: FormControl<string | null>;
}
