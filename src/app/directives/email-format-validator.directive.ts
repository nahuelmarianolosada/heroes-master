import { Directive } from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl, ValidationErrors, AbstractControl} from '@angular/forms';


@Directive({
  selector: '[emailInput]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailFormatValidatorDirective, multi: true}]
})
export class EmailFormatValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    /*const isValidEmail = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);*/
    const isValidEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(c.value);
    const message = {
      'emailPattern': {
        'message': 'Enter a valid email'
      }
    };
    return isValidEmail ? null : message;
  }

}
