import { FormControl } from '@angular/forms';

export interface AuthFormI {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword?: FormControl<string | null>;
}
