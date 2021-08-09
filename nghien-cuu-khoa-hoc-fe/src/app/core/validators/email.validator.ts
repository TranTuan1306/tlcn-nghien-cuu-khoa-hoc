/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ValidationErrors, FormControl } from '@angular/forms';

export function customEmailValidator(control: FormControl): ValidationErrors {
  if (control.pristine) {
    return null;
  }
  const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  control.markAsTouched();
  if (control.value === '' || control.value == null) {
    return null;
  }
  if (EMAIL_REGEXP.test(control.value)) {
    return null;
  }
  return {
    invalidEmail: true
  };
}
