import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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

  static MatchValidator(control: any): ValidationErrors | null {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;
    if (!confirmPassword?.length) {
      return null;
    }
    if (confirmPassword.length < 8) {
      return control.get('confirmPassword')?.setErrors({ minLength: true });
    } else {
      if (password !== confirmPassword) {
        return control.get('confirmPassword')?.setErrors({ misMatch: true });
      } else {
        return null;
      }
    }
  }
}
