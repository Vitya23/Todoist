import { FormControl } from '@angular/forms';

export interface CategoryFormI {
  id?: FormControl<number | null>;
  title?: FormControl<string | null>;
  setAll?: FormControl<boolean>;
}

export interface CategoryI {
  id: number | null;
  userId?: number;
  title: string | null;
}

export interface AddCategoryI {
  title: string;
  setAll: boolean;
}
