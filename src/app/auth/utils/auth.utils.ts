import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFormI } from '../types/authForm.interface';
import { PasswordValidators } from 'src/app/shared/validators/passwordValidator';

export function initialAuthForm(): FormGroup<AuthFormI> {
  return new FormGroup<AuthFormI>(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          PasswordValidators.patternValidator(new RegExp('(?=.*[0-9])'), {
            requiresDigit: true,
          }),
          PasswordValidators.patternValidator(new RegExp('(?=.*[A-Z])'), {
            requiresUppercase: true,
          }),
          PasswordValidators.patternValidator(new RegExp('(?=.*[a-z])'), {
            requiresLowercase: true,
          }),
          PasswordValidators.patternValidator(new RegExp('(?=.*[!@#$%^&*])'), {
            requiresSpecialChars: true,
          }),
        ])
      ),
    },
    { validators: PasswordValidators.MatchValidator }
  );
}
