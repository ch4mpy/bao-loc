import { ChangeDetectorRef } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Solution } from "@c4-soft/bao-loc-domain";
import { SolutionUpdateRequest } from "@c4-soft/bao-loc-api";

export class BaoLocForm {
  readonly group: FormGroup;
  readonly x1 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);
  readonly x2 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);
  readonly x3 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);
  readonly x4 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);
  readonly x5 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);
  readonly x6 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);
  readonly x7 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);
  readonly x8 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);
  readonly x9 = new FormControl<number | null>(null, [Validators.required, this.inputValidator()]);

  constructor(private cdr: ChangeDetectorRef) {
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
    this.x1.patchValue(s.x1 || null);
    this.x2.patchValue(s.x2 || null);
    this.x3.patchValue(s.x3 || null);
    this.x4.patchValue(s.x4 || null);
    this.x5.patchValue(s.x5 || null);
    this.x6.patchValue(s.x6 || null);
    this.x7.patchValue(s.x7 || null);
    this.x8.patchValue(s.x8 || null);
    this.x9.patchValue(s.x9 || null);
    this.cdr.detectChanges()
  }

  get solution(): Solution {
    return new Solution(
      this.x1.value || 0,
      this.x2.value || 0,
      this.x3.value || 0,
      this.x4.value || 0,
      this.x5.value || 0,
      this.x6.value || 0,
      this.x7.value || 0,
      this.x8.value || 0,
      this.x9.value || 0,
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
