import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { SolutionUpdateRequest } from "@c4-soft/solutions-api";
import { Solution } from "./solution";

export class BaoLocForm {
  readonly group: FormGroup;
  readonly x1 = new FormControl('', [Validators.required, this.inputValidator()]);
  readonly x2 = new FormControl('', [Validators.required, this.inputValidator()]);
  readonly x3 = new FormControl('', [Validators.required, this.inputValidator()]);
  readonly x4 = new FormControl('', [Validators.required, this.inputValidator()]);
  readonly x5 = new FormControl('', [Validators.required, this.inputValidator()]);
  readonly x6 = new FormControl('', [Validators.required, this.inputValidator()]);
  readonly x7 = new FormControl('', [Validators.required, this.inputValidator()]);
  readonly x8 = new FormControl('', [Validators.required, this.inputValidator()]);
  readonly x9 = new FormControl('', [Validators.required, this.inputValidator()]);

  constructor() {
    this.group = new FormGroup(
      {
        x1: this.x1,
        x2: this.x2,
        x3: this.x3,
        x4: this.x4,
        x5: this.x5,
        x6: this.x6,
        x7: this.x7,
        x8: this.x8,
        x9: this.x9,
      },
      [this.formDistinctValuesValidator()]
    );
  }

  updateSolution(s: SolutionUpdateRequest) {
    this.x1.patchValue(s.x1);
    this.x2.patchValue(s.x2);
    this.x3.patchValue(s.x3);
    this.x4.patchValue(s.x4);
    this.x5.patchValue(s.x5);
    this.x6.patchValue(s.x6);
    this.x7.patchValue(s.x7);
    this.x8.patchValue(s.x8);
    this.x9.patchValue(s.x9);
  }

  get solution(): Solution {
    return new Solution(
      this.x1.value,
      this.x2.value,
      this.x3.value,
      this.x4.value,
      this.x5.value,
      this.x6.value,
      this.x7.value,
      this.x8.value,
      this.x9.value
    )
  }

  private inputValidator(): ValidatorFn {
    return (input: AbstractControl): ValidationErrors => {
      const errors = new Map<string, boolean>();

      if (input.value < 1 || input.value > 9) {
        errors.set('notInRange', true);
      }
      if (input.value !== Math.round(input.value)) {
        errors.set('notInteger', true);
      }

      return Object.fromEntries(errors.entries());
    };
  }

  private formDistinctValuesValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors => {
      const errors = new Map<string, boolean>();
      for (let i = 1; i <= 9; ++i) {
        if (!!form.get('x' + i)?.errors) {
          const errors = form.get('x' + i)?.errors as ValidationErrors;
          delete errors['notDistinct'];
          form
            .get('x' + i)
            ?.setErrors(
              Object.getOwnPropertyNames(errors).length === 0 ? null : errors
            );
        }
      }

      for (let i = 1; i < 9; ++i) {
        for (let j = i + 1; j < 10; ++j) {
          if (
            form.get('x' + i)?.value &&
            form.get('x' + i)?.value === form.get('x' + j)?.value
          ) {
            form.get('x' + i)?.setErrors({ notDistinct: true });
            form.get('x' + i)?.markAsTouched();
            form.get('x' + j)?.setErrors({ notDistinct: true });
            form.get('x' + j)?.markAsTouched();
            errors.set(`x${i} equals x${j}`, true);
          }
        }
      }

      return Object.fromEntries(errors.entries());
    };
  }
}
