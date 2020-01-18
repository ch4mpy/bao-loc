import { Component, OnInit, Input } from '@angular/core';
import { SolutionResponse, SolutionService } from '../solution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solution-row',
  template: `
  <mat-card >
    <mat-card-content (click)="onClick()">
      <div fxLayout fxLayoutGap="10px">
        <div fxFlex>
          <div fxLayout fxLayoutGap="4px">
            <mat-chip-list (click)="onClick()">
              <mat-chip (click)="onClick()" >{{solution.x1}}</mat-chip>
              <mat-chip (click)="onClick()" >{{solution.x2}}</mat-chip>
              <mat-chip (click)="onClick()" >{{solution.x3}}</mat-chip>
              <mat-chip (click)="onClick()" >{{solution.x4}}</mat-chip>
              <mat-chip (click)="onClick()" >{{solution.x5}}</mat-chip>
              <mat-chip (click)="onClick()" >{{solution.x6}}</mat-chip>
              <mat-chip (click)="onClick()" >{{solution.x7}}</mat-chip>
              <mat-chip (click)="onClick()" >{{solution.x8}}</mat-chip>
              <mat-chip (click)="onClick()" >{{solution.x9}}</mat-chip>
            </mat-chip-list>
          </div>
        </div>
      </div>
    </mat-card-content>
  </mat-card>
  `,
  styles: []
})
export class SolutionRowComponent {

  @Input() solution: SolutionResponse;

  constructor(private router: Router, private solutionService: SolutionService) {}

  onClick() {
    this.solutionService.selected$.next(this.solution);
    this.router.navigate(['/edit']);
  }

}