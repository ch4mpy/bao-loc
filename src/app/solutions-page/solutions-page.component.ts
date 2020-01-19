import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageMeta } from '../page';
import { SolutionResponse, SolutionService } from '../solution.service';

@Component({
  selector: 'app-solutions-page',
  template: `
  <h2>Solutions</h2>
  <mat-card class="solutions-display">
    <mat-card-content>
      <app-solution-row *ngFor="let solution of solutions$ | async" [solution]="solution"></app-solution-row>
    </mat-card-content>
    <mat-card-actions fxLayout fxLayoutGap="5px">
      <button mat-icon-button fxFlex (click)="firstPage()" class = "first">
          <mat-icon>first_page</mat-icon>
      </button>
      <button mat-icon-button fxFlex (click)="prevPage()" class = "prev"><mat-icon>chevron_left</mat-icon></button>
      <span fxFlex fxLayoutAlign="center"> {{pageStatus() | async}} </span>
      <button mat-icon-button fxFlex (click)="nextPage()" class = "next"><mat-icon>chevron_right</mat-icon></button>
      <button mat-icon-button fxFlex (click)="lastPage()" class = "last"><mat-icon>last_page</mat-icon></button>
    </mat-card-actions>
  </mat-card>


  <mat-card class="solutions-actions">
    <mat-card-content>
      temps d'exécution en ms: {{executionTime$ | async}}
    </mat-card-content>
    <mat-card-actions fxLayout fxLayoutGap="5px">
      <button mat-icon-button fxFlex (click)="process()" class="restore-button">
        <mat-icon>restore</mat-icon>
      </button>

      <button mat-icon-button fxFlex (click)="deleteAll()" class="delete-button">
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
    if (this.pageMeta$.value.number < (this.pageMeta$.value.totalPages - 1)) {
      this.updatePage(this.pageMeta$.value.number + 1);
    }}

  lastPage() {
    this.updatePage(this.pageMeta$.value.totalPages - 1);
  }

  process() {
    this.deleteAll().add(() => this.firstPage());
  }

  deleteAll() {
    this.pageMeta$.next(new PageMeta(0, 0, 0, 0));
    this.solutions$.next(new Array<SolutionResponse>());
    return this.solutionService.deleteAll();
  }

  pageStatus(): Observable<string> {
    return this.pageMeta$.pipe(map(pm => pm.totalPages ? `${pm.number + 1} / ${pm.totalPages}` : '0 / 0'));
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
