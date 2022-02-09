import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _name!: string;
  private _sub!: string;
  private _picture!: string;

  constructor(private oauthService: OAuthService) {
    this.refreshUserData(undefined);
    this.oauthService.configure(environment.authConfig);
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin()
      .then(async () => {
        if (!oauthService.hasValidAccessToken()) {
          await oauthService.silentRefresh();
        }
      })
      .then(() => {
        this.refreshUserData(oauthService.getIdentityClaims());
      });
  }

  get name(): string {
    return this._name;
  }

  get pictureUri(): string {
    return this._picture;
  }

  get isAuthenticated(): boolean {
    return !!this._sub;
  }

  login() {
    this.oauthService.initLoginFlow();
    this.oauthService.tryLogin().then((isSuccess) => {
      if (isSuccess) {
        this.refreshUserData(this.oauthService.getIdentityClaims());
      } else {
        this.refreshUserData(undefined);
      }
    });
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
    this.refreshUserData(undefined);
  }

  private refreshUserData(idClaims: any) {
    this._name = idClaims?.name || '';
    this._sub = idClaims?.sub || '';
    this._picture = idClaims?.picture || '';
  }
}
