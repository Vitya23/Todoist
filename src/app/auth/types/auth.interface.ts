import { FormControl } from '@angular/forms';

export interface AuthFormI {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword?: FormControl<string | null>;
}

export interface AuthRequestI {
  user: {
    email: string;
    password: string;
  };
}
export interface AuthResponseI {
  email: string;
  accessToken: string;
}
