import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SolutionService, SolutionUpdateRequest, SolutionResponse } from '../solution.service';

@Component({
  selector: 'app-solution-edit-form',
  template: `
    <h2>Grille de "Bao-Loc"</h2>
    <form [formGroup]="solutionForm" (ngSubmit)="save()" id="solution-form">
      <mat-grid-list cols="7" class="bao-loc-grid" rowHeight="70px">
      	<!--row 1-->
	      <mat-grid-tile class="problem-cell">
	        <mat-form-field required >
	          <input matInput type="number" matInput formControlName="x1" tabindex="1">
	          <mat-error *ngIf="solutionForm.get('x1').invalid">{{solutionForm.get('x1').errors | json}}</mat-error>
	        </mat-form-field>
	      </mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell">
		      <mat-form-field required>
		        <input matInput type="number" matInput formControlName="x5" tabindex="5">
		        <mat-error *ngIf="solutionForm.get('x5').invalid">{{solutionForm.get('x5').errors | json}}</mat-error>
		      </mat-form-field>
	      </mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>-</b></mat-grid-tile>
	      <mat-grid-tile class="problem-cell">
		      <mat-form-field required>
		        <input matInput type="number" matInput formControlName="x6" tabindex="6">
		        <mat-error *ngIf="solutionForm.get('x6').invalid">{{solutionForm.get('x6').errors | json}}</mat-error>
		      </mat-form-field>
	      </mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>{{result(solutionForm) | number : '1.0-6'}}</b></mat-grid-tile>
	    <!--row 2-->
	      <mat-grid-tile class="problem-cell"><b>+</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>*</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>-</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>=</b></mat-grid-tile>
	    <!--row 3-->
	      <mat-grid-tile class="problem-cell"><b>13</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>12</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>11</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>10</b></mat-grid-tile>
	    <!--row 4-->
	      <mat-grid-tile class="problem-cell"><b>*</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>+</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>+</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>-</b></mat-grid-tile>
	    <!--row 5-->
	      <mat-grid-tile class="problem-cell">
		      <mat-form-field required>
		        <input matInput type="number" matInput formControlName="x2" tabindex="2">
		        <mat-error *ngIf="solutionForm.get('x2').invalid">{{solutionForm.get('x2').errors | json}}</mat-error>
		      </mat-form-field>
	      </mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell">
		      <mat-form-field required>
		        <input matInput type="number" matInput formControlName="x4" tabindex="4">
		        <mat-error *ngIf="solutionForm.get('x4').invalid">{{solutionForm.get('x4').errors | json}}</mat-error>
		      </mat-form-field>
	      </mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell">
		      <mat-form-field required>
		        <input matInput type="number" matInput formControlName="x7" tabindex="7">
		        <mat-error *ngIf="solutionForm.get('x7').invalid">{{solutionForm.get('x7').errors | json}}</mat-error>
		      </mat-form-field>
	      </mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell">
		      <mat-form-field required>
		        <input matInput type="number" matInput formControlName="x9" tabindex="9">
		        <mat-error *ngIf="solutionForm.get('x9').invalid">{{solutionForm.get('x9').errors | json}}</mat-error>
		      </mat-form-field>
	      </mat-grid-tile>
	    <!--row 6-->
	      <mat-grid-tile class="problem-cell"><b>/</b></mat-grid-tile>
	      <mat-grid-tile class="problem-cell">
		      <mat-form-field required>
		        <input matInput type="number" matInput formControlName="x3" tabindex="3">
		        <mat-error *ngIf="solutionForm.get('x3').invalid">{{solutionForm.get('x3').errors | json}}</mat-error>
		      </mat-form-field>
	      </mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>+</b></mat-grid-tile>
	      <mat-grid-tile></mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>*</b></mat-grid-tile>
	      <mat-grid-tile class="problem-cell">
		      <mat-form-field required>
		        <input matInput type="number" matInput formControlName="x8" tabindex="8">
		        <mat-error *ngIf="solutionForm.get('x8').invalid">{{solutionForm.get('x8').errors | json}}</mat-error>
		      </mat-form-field>
	      </mat-grid-tile>
	      <mat-grid-tile class="problem-cell"><b>/</b></mat-grid-tile>
      </mat-grid-list>
      <button mat-icon-button fxFlex (click)="save()" [disabled]="!!solutionForm.errors">
        <mat-icon>save</mat-icon>
      </button>
      <mat-error *ngIf="solutionForm.errors">{{solutionForm.errors | json}}</mat-error>
    </form>
  `,
  styles: [
    '.problem-cell { border: solid 2px #000; }',
    'input { text-align: center; }',
    '.bao-loc-grid { display: block; margin: 10px 10px 10px 10px; max-width: 510px}',
    'mat-form-field { width: 60px; }']
})
export class SolutionEditFormComponent implements OnInit, OnDestroy {

  solutionForm = new FormGroup({
    x1: new FormControl(null, [Validators.required]),
    x2: new FormControl(null, [Validators.required]),
    x3: new FormControl(null, [Validators.required]),
    x4: new FormControl(null, [Validators.required]),
    x5: new FormControl(null, [Validators.required]),
    x6: new FormControl(null, [Validators.required]),
    x7: new FormControl(null, [Validators.required]),
    x8: new FormControl(null, [Validators.required]),
    x9: new FormControl(null, [Validators.required])
  }, [this.distinctValuesValidator(), this.valuesInRangeValidator(), this.resultEquals66Validator()]);

  private selectedSubscription: Subscription;

  constructor(private solutionService: SolutionService) {}

  private solution: SolutionResponse;

  ngOnInit() {
    this.selectedSubscription = this.solutionService.selected.subscribe(s => {
      this.solution = s;
      this.solutionForm.patchValue({ x1: s.x1, x2: s.x2, x3: s.x3, x4: s.x4, x5: s.x5, x6: s.x6, x7: s.x7, x8: s.x8, x9: s.x9 });
    });
  }

  ngOnDestroy() {
    if (this.selectedSubscription && !this.selectedSubscription.closed) {
      this.selectedSubscription.unsubscribe();
    }
  }

  save() {
    this.solutionService.update(this.solution, new SolutionUpdateRequest(
      +this.solutionForm.get('x1').value,
      +this.solutionForm.get('x2').value,
      +this.solutionForm.get('x3').value,
      +this.solutionForm.get('x4').value,
      +this.solutionForm.get('x5').value,
      +this.solutionForm.get('x6').value,
      +this.solutionForm.get('x7').value,
      +this.solutionForm.get('x8').value,
      +this.solutionForm.get('x9').value));
  }

  distinctValuesValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const errors = {};

      for (let i = 1; i < 9; ++i) {
        group.get('x' + i).setErrors(null);
        for (let j = i + 1; j < 10; ++j) {
          group.get('x' + j).setErrors(null);
        }
      }

      for (let i = 1; i < 9; ++i) {
        for (let j = i + 1; j < 10; ++j) {
          if (group.get('x' + i).value === group.get('x' + j).value) {
            group.get('x' + i).setErrors({ notDistinct: true });
            group.get('x' + j).setErrors({ notDistinct: true });
            errors[`x${i} equals x${j}`] = true;
          }
        }
      }

      return errors;
    };
  }

  valuesInRangeValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const errors = {};

      for (let i = 1; i < 9; ++i) {
        if (+group.get('x' + i).value < 1 || +group.get('x' + i).value > 9) {
          group.get('x' + i).setErrors({ notInRange: true });
          errors['notInRange'] = true;
        }
      }

      return errors;
    };
  }

  resultEquals66Validator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const errors = {};

      if (Math.abs(this.result(group) - 66) > 1.0e-9) {
        errors['badResult'] = true;
      }

      return errors;
    };
  }

  result(group: FormGroup): number {
    return +group.get('x1').value
    + 13
    * group.get('x2').value
    / group.get('x3').value
    + group.get('x4').value
    + 12
    * group.get('x5').value
    - group.get('x6').value
    - 11
    + group.get('x7').value
    * group.get('x8').value
    / group.get('x9').value
    - 10;
  }

}
