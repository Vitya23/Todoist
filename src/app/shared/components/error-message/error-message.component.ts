import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { VALIDATOR_ERROR } from 'src/app/constants/validatorConstants';

@Component({
  standalone: true,
  selector: 'app-error-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<small>{{getValidationErrorMessage()}}</small>',
})
export class ErrorMessageComponent implements OnInit {
  @Input() errors: ValidationErrors | null = null;

  ngOnInit() {}
  getValidationErrorMessage(): string | null {
    const errorKey = Object.keys(this.errors || {})[0];
    const customError = VALIDATOR_ERROR.find(
      (validatorError) => validatorError.errorAssociation === errorKey
    );
    return customError?.errorMessage || null;
  }
}
