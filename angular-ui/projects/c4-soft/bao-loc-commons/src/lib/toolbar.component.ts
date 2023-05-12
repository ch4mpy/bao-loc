import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '@c4-soft/bao-loc-domain';

@Component({
  selector: 'app-toolbar',
  template: `<mat-toolbar>
      <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Menu">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="spacer"></span>
      <span>{{ title }}</span>
      <span class="spacer"></span>
      <button
        mat-button
        *ngIf="!currentUser.isAuthenticated"
        (click)="login()"
        aria-label="login"
      >
        <mat-icon>login</mat-icon>
        <span>Login</span>
      </button>
      <button
        mat-button
        *ngIf="currentUser.isAuthenticated"
        (click)="logout()"
        aria-label="logout"
      >
        <span>{{ currentUser.displayName }}</span>
        <mat-icon>logout</mat-icon>
      </button>
    </mat-toolbar>

    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        routerLink="/problem"
        aria-label="Go to Bao-Loc problem page"
      >
        <mat-icon>sports_esports</mat-icon>
        <span>Problem</span>
      </button>
      <button mat-menu-item routerLink="/about" aria-label="Go to About page">
        <mat-icon>info</mat-icon>
        <span>About</span>
      </button>
    </mat-menu>`,
  styles: [],
})
export class ToolbarComponent implements OnInit {
  @Input()
  title!: string;

  constructor(private user: UserService) {}

  ngOnInit() {
  }

  get currentUser(): User {
    return this.user.current;
  }

  login() {
    this.user.login();
  }

  logout() {
    this.user.logout();
  }
}
