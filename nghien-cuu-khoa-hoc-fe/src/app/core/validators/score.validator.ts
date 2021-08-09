/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { FormGroup } from '@angular/forms';

export function customScoreValidator(controlNameMin: string, controlNameMax: string) {
  return (formGroup: FormGroup) => {
    const min = formGroup.controls[controlNameMin];
    const max = formGroup.controls[controlNameMax];

    // set error if min score > max score
    if (min.value > max.value) {
      min.setErrors({ scoreError: true });
    } else {
      min.setErrors(null);
    }
  };
}
