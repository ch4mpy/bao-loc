import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SolutionResponse, SolutionsApi } from '@c4-soft/bao-loc-api';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-solutions-dialog',
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>Saved solutions</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-list>
        <mat-list-item *ngFor="let s of solutions">
          <table>
            <tr>
              <td>{{ s.x1 }}</td>
              <td>{{ s.x2 }}</td>
              <td>{{ s.x3 }}</td>
              <td>{{ s.x4 }}</td>
              <td>{{ s.x5 }}</td>
              <td>{{ s.x6 }}</td>
              <td>{{ s.x7 }}</td>
              <td>{{ s.x8 }}</td>
              <td>{{ s.x9 }}</td>
              <td>
                <button mat-icon-button (click)="edit(s)">
                  <mat-icon fontIcon="edit" aria-label="Edit"></mat-icon>
                </button>
              </td>
              <td>
                <button mat-icon-button (click)="trash(s)">
                  <mat-icon
                    fontIcon="delete_forever"
                    aria-label="Delete"
                  ></mat-icon>
                </button>
              </td>
            </tr>
          </table>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>`,
  styles: [],
})
export class SolutionsDialog implements OnInit {
  solutions: SolutionResponse[] = [];

  @Output()
  onSelected = new EventEmitter<SolutionResponse>();

  @Output()
  onDeleted = new EventEmitter<SolutionResponse>();

  constructor(
    private solutionsApi: SolutionsApi,
    private dialogRef: MatDialogRef<SolutionsDialog>,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const solutions = await lastValueFrom(
      this.solutionsApi.retrievePlayerSolutions()
    ).finally(() => {});
    this.solutions = solutions.sort((a, b) => b.id - a.id) || [];
    this.cdr.detectChanges();
  }

  edit(s: SolutionResponse) {
    this.onSelected.emit(s);
  }

  trash(trashed: SolutionResponse) {
    this.solutionsApi.deleteSolution(trashed.id).subscribe({
      next: () => {
        this.removeSolution(trashed);
      },
      error: (e) => {
        if (e.status === 404) {
          this.removeSolution(trashed);
        } else {
          console.warn(e);
        }
      },
    });
  }

  private removeSolution(trashed: SolutionResponse) {
    this.solutions.splice(
      this.solutions.findIndex((sol) => sol.id === trashed.id),
      1
    );
    this.onDeleted.emit(trashed)
    if(this.solutions.length === 0) {
      this.dialogRef.close()
    }
  }
}
