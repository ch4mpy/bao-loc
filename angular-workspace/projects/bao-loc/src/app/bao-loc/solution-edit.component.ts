import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SolutionResponse, SolutionsControllerApi } from '@c4-soft/solutions-api';
import { BaoLocForm } from './bao-loc-form';
import { Solution } from './solution';

@Component({
  selector: 'app-solution-edit',
  template: ` <ion-grid>
    <ion-row>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x1"
          [color]="form.x1.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x2"
          [color]="form.x2.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x3"
          [color]="form.x3.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x4"
          [color]="form.x4.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x5"
          [color]="form.x5.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x6"
          [color]="form.x6.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x7"
          [color]="form.x7.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x8"
          [color]="form.x8.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-input
          type="number"
          min="1"
          max="9"
          [formControl]="form.x9"
          [color]="form.x9.valid ? '' : 'danger'"
        ></ion-input>
      </ion-col>
      <ion-col>
        <ion-buttons>
          <ion-icon *ngIf="isExpectedResult === undefined" name=""></ion-icon>
          <ion-icon *ngIf="isExpectedResult !== undefined" [name]=" isExpectedResult ? 'checkmark' : 'close'" [color]="isExpectedResult ? 'success' : 'danger'"></ion-icon>
          <ion-button (click)="trash(solution)" color="danger">
            <ion-icon slot="icon-only" name="trash"></ion-icon>
          </ion-button>
          <ion-button (click)="save(solution)" [disabled]="form.group.invalid || form.group.untouched">
            <ion-icon slot="icon-only" name="save" color="primary"></ion-icon>
          </ion-button>
          <ion-button (click)="select(solution)">
            <ion-icon slot="icon-only" name="code-download" color="primary"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-col>
    </ion-row>
  </ion-grid>`,
  styles: ['ion-input { width: 2em; }'],
})
export class SolutionsEditComponent implements OnInit {
  @Input()
  solution!: SolutionResponse

  @Output()
  onSolutionTrashed = new EventEmitter<SolutionResponse>()

  @Output()
  onSolutionSelected = new EventEmitter<SolutionResponse>()

  form: BaoLocForm;

  isExpectedResult?: boolean

  constructor(private solutionsApi: SolutionsControllerApi, cdr: ChangeDetectorRef) {
    this.form = new BaoLocForm(cdr)
  }

  ngOnInit() {
    this.form.updateSolution(
      new Solution(
        this.solution.x1,
        this.solution.x2,
        this.solution.x3,
        this.solution.x4,
        this.solution.x5,
        this.solution.x6,
        this.solution.x7,
        this.solution.x8,
        this.solution.x9
      )
    )
    this.isExpectedResult = 66 === this.form.solution?.value
    this.form.group.valueChanges.subscribe(() => {
      this.solution.x1 = this.form.x1.value
      this.solution.x2 = this.form.x2.value
      this.solution.x3 = this.form.x3.value
      this.solution.x4 = this.form.x4.value
      this.solution.x5 = this.form.x5.value
      this.solution.x6 = this.form.x6.value
      this.solution.x7 = this.form.x7.value
      this.solution.x8 = this.form.x8.value
      this.solution.x9 = this.form.x9.value
      if (this.form.group.valid) {
        this.isExpectedResult = 66 === this.form.solution?.value
      } else {
        this.isExpectedResult = undefined;
      }
    })
  }

  save(s: SolutionResponse) {
    this.solutionsApi.updateSolution(s.id, s).subscribe()
    this.form.group.markAsUntouched()
  }

  trash(s: SolutionResponse) {
    this.solutionsApi.deleteSolution(s.id).subscribe(() => {
      this.onSolutionTrashed.emit(s)
    });
  }

  select(s: SolutionResponse) {
    this.onSolutionSelected.emit(s)
  }
}
