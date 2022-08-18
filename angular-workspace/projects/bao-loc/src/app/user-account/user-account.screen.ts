import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-account',
  template: `<ion-header>
      <ion-toolbar translucent color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ userService.current.displayName || 'Compte' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div *ngIf="!userService.current.displayName">
        <ion-button (click)="login()">Login</ion-button>
      </div>
      <div *ngIf="!!userService.current.displayName">
        <ion-avatar>
          <img [src]="userService.current.picture" />
        </ion-avatar>
        <ion-button (click)="logout()">Logout</ion-button>
      </div>
    </ion-content>`,
  styles: [],
})
export class UserAccountScreen implements OnInit {
  constructor(readonly userService: UserService) {}

  ngOnInit() {}

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout();
  }
}
