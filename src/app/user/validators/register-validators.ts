import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  // Static methods will allow us to call it on the class itself (e.g. RegisterValidators.match()),
  // and it won't be available on its instances. They also can't access to properties or methods of the class
  // So basically they can't use this.propInThisClass
  // This way we can pass it to new FormGroup({form fields here}, [validatorsArr]) as [RegisterValidators.confirmPasswordMatch]
  // If it wasn't static, we'd have to do it like this: [new RegisterValidators().confirmPasswordMatch]
  static confirmPasswordMatch(
    passControlName: string,
    confirmPassControlName: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(passControlName);
      const matchingControl = group.get(confirmPassControlName);

      if (!control || !matchingControl) {
        console.error('Form controls cannot be found in the control group');
        return { controlNotFound: false };
      }

      const error =
        control.value === matchingControl.value ? null : { noMatch: true };

      matchingControl.setErrors(error);

      return error;
    };
  }
}
