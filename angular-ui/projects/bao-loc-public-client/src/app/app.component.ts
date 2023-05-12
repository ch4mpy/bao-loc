import { Component, OnInit } from '@angular/core';
import { UserService } from '@c4-soft/bao-loc-commons';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'Bao-Loc Problem';

  constructor(
    private oidcService: OidcSecurityService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.oidcService.checkAuth().subscribe({
      next: ({ isAuthenticated, userData, accessToken, idToken }) => {
        this.user.refreshUserData(userData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
