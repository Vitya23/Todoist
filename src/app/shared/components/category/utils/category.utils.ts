import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryFormI } from '../types/category.interface';

export function initializeCategoryForm(): FormGroup<CategoryFormI> {
  return new FormGroup<CategoryFormI>({
    id: new FormControl(null, Validators.required),
  });
}
