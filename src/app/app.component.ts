import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
    <span class="header-title">Tests des compétences de Jérôme Wacongne par Skazy</span>
    <span class="fill-remaining-space"></span>
    <span>
      <mat-icon matTooltip="home" (click)="landing()">home</mat-icon>
    </span>
  </mat-toolbar>
  <router-outlet></router-outlet>
  `,
  styles: ['.fill-remaining-space { flex: 1 1 auto; }']
})
export class AppComponent {

  constructor(private router: Router) {
  }

  landing() {
    this.router.navigate(['']);
  }

}
