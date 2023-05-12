import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Solution } from '@c4-soft/bao-loc-domain';
import { SolutionService } from './solution.service';

@Component({
  selector: 'app-cheat-dialog',
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>
        Cheat: the {{ solutions.length }} solutions
      </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div style="height: .5em;">
        <mat-progress-bar
          *ngIf="isLoading"
          mode="indeterminate"
        ></mat-progress-bar>
      </div>
      <mat-list>
        <mat-list-item *ngFor="let s of solutions" (click)="selectSolution(s)">
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
            </tr>
          </table>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>`,
  styles: [],
})
export class CheatDialog implements AfterViewInit {
  isLoading = true
  solutions: Solution[] = [];

  @Output()
  onSolutionSelected = new EventEmitter<Solution>();

  constructor(
    private solutionsService: SolutionService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngAfterViewInit() {
    this.isLoading = true
    this.solutions = await this.solutionsService.getAllSolutions();
    this.isLoading = false
  }

  selectSolution(s: Solution) {
    this.onSolutionSelected.emit(s);
  }
}
