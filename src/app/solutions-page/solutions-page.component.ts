import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageMeta } from '../page';
import { SolutionResponse, SolutionService } from '../solution.service';

@Component({
  selector: 'app-solutions-page',
  template: `
  <h2>Solutions</h2>
  <mat-card>
    <mat-card-content>
      <app-solution-row *ngFor="let solution of solutions$ | async" [solution]="solution"></app-solution-row>
    </mat-card-content>
    <mat-card-actions fxLayout fxLayoutGap="5px">
      <button mat-icon-button fxFlex (click)="firstPage()">
          <mat-icon>first_page</mat-icon>
      </button>
      <button mat-icon-button fxFlex (click)="prevPage()"><mat-icon>chevron_left</mat-icon></button>
      <span fxFlex fxLayoutAlign="center">{{(pageMeta$ | async).number}} / {{(pageMeta$ | async).totalPages}}</span>
      <button mat-icon-button fxFlex (click)="nextPage()"><mat-icon>chevron_right</mat-icon></button>
      <button mat-icon-button fxFlex (click)="lastPage()"><mat-icon>last_page</mat-icon></button>
    </mat-card-actions>
  </mat-card>


  <mat-card>
    <mat-card-content>
      temps d'exécution en ms: {{executionTime$ | async}}
    </mat-card-content>
    <mat-card-actions fxLayout fxLayoutGap="5px">
      <button mat-icon-button fxFlex (click)="process()">
        <mat-icon>restore</mat-icon>
      </button>

      <button mat-icon-button fxFlex (click)="deleteAll()">
        <mat-icon>delete</mat-icon>
      </button>
    </mat-card-actions>
  </mat-card>
  `,
  styles: []
})
export class SolutionsPageComponent {

  readonly pageMeta$ = new BehaviorSubject<PageMeta>(new PageMeta(0, 0, 0, 0));

  readonly solutions$ = new BehaviorSubject<Array<SolutionResponse>>(new Array<SolutionResponse>());

  readonly executionTime$ = new BehaviorSubject<number>(null);

  constructor(private solutionService: SolutionService) { }

  firstPage() {
    this.updatePage(0);
  }

  prevPage() {
    if (this.pageMeta$.value.number > 0) {
      this.updatePage(this.pageMeta$.value.number - 1);
    }
  }

  nextPage() {
    if (this.pageMeta$.value.number < this.pageMeta$.value.totalPages) {
      this.updatePage(this.pageMeta$.value.number + 1);
    }}

  lastPage() {
    this.updatePage(this.pageMeta$.value.totalPages);
  }

  process() {
    this.solutionService.deleteAll().add(() => this.firstPage());
  }

  deleteAll() {
    this.solutionService.deleteAll();
    this.pageMeta$.next(new PageMeta(0, 0, 0, 0));
    this.solutions$.next(new Array<SolutionResponse>());
  }

  private updatePage(pageNbr: number) {
    const startInstant = performance.now();
    this.solutionService.getPage(pageNbr).subscribe(page => {
      this.executionTime$.next(performance.now() - startInstant);
      this.pageMeta$.next(page.page);
      this.solutions$.next(page._embedded.solutionResponseList);
    });
  }
}
