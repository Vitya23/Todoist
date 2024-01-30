import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): null | ValidationErrors => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static MatchValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;
    if (!confirmPassword?.length) {
      return null;
    }
    let error: ValidationErrors | null;
    if (confirmPassword.length < 8) {
      error = { minlength: true };
    } else {
      if (password !== confirmPassword) {
        error = { misMatch: true };
      } else {
        error = null;
      }
    }
    control.get('confirmPassword')?.setErrors(error);
    return error;
  }
}
