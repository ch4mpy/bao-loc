import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolutionsApi } from '@c4-soft/bao-loc-api';
import { Subscription } from 'rxjs/internal/Subscription';
import { BaoLocForm } from './bao-loc-form';
import { CheatDialog } from './cheat.dialog';
import { RulesDialog } from './rules.dialog';
import { SolutionsDialog } from './solutions.dialog';
import { UserService } from './user.service';

@Component({
  selector: 'app-bao-loc-problem',
  template: `<div
    style="margin-top: 2em; margin-left: auto; margin-right: auto; max-width: 920px;"
  >
    <div style="height: .5em;">
      <mat-progress-bar
        *ngIf="isLoading"
        mode="indeterminate"
      ></mat-progress-bar>
    </div>
    <div>
      <button mat-icon-button (click)="openRulesDialog()" matTooltip="Rules">
        <mat-icon fontIcon="help" aria-label="rules"></mat-icon>
      </button>
      <button
        mat-icon-button
        (click)="openCheatDialog()"
        matTooltip="Compute all possible solutions"
      >
        <mat-icon fontIcon="memory" aria-label="cheat"></mat-icon>
      </button>
      <button
        mat-icon-button
        [disabled]="!currentUser.isAuthenticated"
        (click)="openSolutionsDialog()"
        matTooltip="Load saved solution"
      >
        <mat-icon
          fontIcon="file_download"
          aria-label="stored results"
        ></mat-icon>
      </button>
    </div>
    <form [formGroup]="form.group">
      <table style="margin: auto;" cellspacing="0">
        <tr>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill" class="">
              <input
                matInput
                tabindex="1"
                type="number"
                min="1"
                max="9"
                autofocus
                size="1"
                [formControl]="form.x1"
                [class]="form.x1.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
          <td class=""></td>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill" class="">
              <input
                matInput
                tabindex="5"
                type="number"
                min="1"
                max="9"
                size="1"
                [formControl]="form.x5"
                [class]="form.x5.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
          <td class="bordered cell-content"><b>-</b></td>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill" class="">
              <input
                matInput
                tabindex="6"
                type="number"
                min="1"
                max="9"
                size="1"
                [formControl]="form.x6"
                [class]="form.x6.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
          <td class=""></td>
          <td class="bordered cell-content">
            <b [class]="isExpectedResult ? '' : 'danger'">{{ result }}</b>
          </td>
        </tr>
        <tr>
          <td class="bordered cell-content"><b>+</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>*</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>-</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>=</b></td>
        </tr>
        <tr>
          <td class="bordered cell-content"><b>13</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>12</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>11</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>10</b></td>
        </tr>
        <tr>
          <td class="bordered cell-content"><b>*</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>+</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>+</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>-</b></td>
        </tr>
        <tr>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill" class="">
              <input
                matInput
                tabindex="2"
                type="number"
                min="1"
                max="9"
                size="1"
                [formControl]="form.x2"
                [class]="form.x2.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
          <td class=""></td>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill" class="">
              <input
                matInput
                tabindex="4"
                type="number"
                min="1"
                max="9"
                size="1"
                [formControl]="form.x4"
                [class]="form.x4.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
          <td class=""></td>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill" class="">
              <input
                matInput
                tabindex="7"
                type="number"
                min="1"
                max="9"
                size="1"
                [formControl]="form.x7"
                [class]="form.x7.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
          <td class=""></td>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill" class="">
              <input
                matInput
                tabindex="9"
                type="number"
                min="1"
                max="9"
                size="1"
                [formControl]="form.x9"
                [class]="form.x9.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
        </tr>
        <tr>
          <td class="bordered cell-content"><b>/</b></td>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill" class="">
              <input
                matInput
                tabindex="3"
                type="number"
                min="1"
                max="9"
                size="1"
                [formControl]="form.x3"
                [class]="form.x3.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
          <td class="bordered cell-content"><b>+</b></td>
          <td class=""></td>
          <td class="bordered cell-content"><b>*</b></td>
          <td class="bordered cell-content">
            <mat-form-field appearance="fill">
              <input
                matInput
                tabindex="8"
                type="number"
                min="1"
                max="9"
                size="1"
                [formControl]="form.x8"
                [class]="form.x8.valid ? '' : 'danger'"
              />
            </mat-form-field>
          </td>
          <td class="bordered cell-content"><b>/</b></td>
        </tr>
      </table>
    </form>
    <div>
      <button
        mat-icon-button
        [disabled]="!currentUser.isAuthenticated"
        (click)="save()"
        matTooltip="Save current solution"
      >
        <mat-icon fontIcon="save" aria-label="stored results"></mat-icon>
      </button>
      <span *ngIf="!!currentSolutionId"
        >Editing solution n°{{ currentSolutionId }}</span
      >
    </div>
  </div>`,
  styles: [
    '.bordered { border: 1px solid; }',
    '.cell-content { text-align: center; width: 5em; height: 5em; font-size: 1.4em; }',
    '.danger { color: red}',
    'td input { text-align: center;  font-size: 1.4em; }',
    'table { border-collapse: collapse; }',
    'mat-form-field  { margin-top: 1em; width: 4em; }',
  ],
})
export class BaoLocProblemComponent implements OnInit {
  isLoading = false;

  form: BaoLocForm;

  formSucbscription?: Subscription;

  private formResult?: number;
  currentSolutionId: number | null = null;

  constructor(
    private user: UserService,
    private solutionsApi: SolutionsApi,
    private dialog: MatDialog,
    cdr: ChangeDetectorRef
  ) {
    this.form = new BaoLocForm(cdr);
  }

  ngOnInit() {
    this.formSucbscription = this.form.group.valueChanges.subscribe(() => {
      if (this.form.group.valid) {
        const tmp = this.form.solution?.value;
        this.formResult = Math.round(tmp * 100) / 100;
      } else {
        this.formResult = undefined;
      }
    });
  }

  get currentUser() {
    return this.user.current;
  }

  get result(): number | undefined {
    return this.formResult ? Math.round(this.formResult * 10) / 10 : undefined;
  }

  get isExpectedResult(): boolean {
    return this.formResult === 66;
  }

  async create() {
    this.isLoading = true;
    this.solutionsApi.createSolution(this.form.solution).subscribe({
      next: async () => {
        document.getElementById('solutions-trigger')?.click();
      },
      error: () => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  openRulesDialog() {
    this.dialog.open(RulesDialog);
  }

  openCheatDialog() {
    const dlgRef = this.dialog.open(CheatDialog, { maxHeight: 420 });
    dlgRef.componentInstance.onSolutionSelected.subscribe((solution) => {
      this.currentSolutionId = null;
      this.form.updateSolution(solution);
      dlgRef.close();
    });
  }

  openSolutionsDialog() {
    const dlgRef = this.dialog.open(SolutionsDialog);
    dlgRef.componentInstance.onSelected.subscribe((solution) => {
      this.currentSolutionId = solution.id >= 0 ? solution.id : null;
      this.form.updateSolution(solution);
      dlgRef.close();
    });
    dlgRef.componentInstance.onDeleted.subscribe((solution) => {
      if (solution.id === this.currentSolutionId) {
        this.currentSolutionId = null;
      }
    });
  }

  save() {
    this.isLoading = true;
    if (!this.currentSolutionId) {
      this.solutionsApi
        .createSolution(this.form.solution, 'response')
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            const locationParts =
              response.headers.get('location')?.split('/') || [];
            this.currentSolutionId =
              locationParts.length > 0
                ? +locationParts[locationParts.length - 1]
                : null;
          },
          error: () => {
            this.isLoading = false;
          },
        });
    } else {
      this.solutionsApi
        .updateSolution(this.currentSolutionId, this.form.solution)
        .subscribe({
          next: () => {
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          },
        });
    }
  }
}
