import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskFormI } from '../types/taskForm.interface';

export function initialTodoForm(): FormGroup<TaskFormI> {
  return new FormGroup<TaskFormI>({
    description: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    endDate: new FormControl(null, Validators.required),
    priority: new FormControl(null, Validators.required),
    category: new FormControl(null),
  });
}
