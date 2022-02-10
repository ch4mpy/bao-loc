import { ChangeDetectorRef, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  name!: string;
  picture!: string;
  sub!: string;

  constructor(private oauthService: OAuthService) {
    this.refreshUserData(undefined);
    this.oauthService.configure(environment.authConfig);
    this.refresh();
  }

  get isAuthenticated(): boolean {
    return !!this.sub;
  }

  async refresh() {
    if (!this.oauthService.discoveryDocumentLoaded) {
      await this.oauthService.loadDiscoveryDocument();
    }
    if (
      !!this.oauthService.getIdentityClaims() &&
      this.oauthService.hasValidAccessToken()
    ) {
      this.refreshUserData(this.oauthService.getIdentityClaims());
    } else {
      await this.oauthService
        .tryLogin()
        .then(async (loginResp) => {
          console.log('loginResp: ', loginResp)
          if (!this.oauthService.hasValidAccessToken()) {
            await this.oauthService.silentRefresh();
          }
        })
        .then(() => {
          this.refreshUserData(this.oauthService.getIdentityClaims());
        });
    }
  }

  login() {
    this.oauthService.initLoginFlow();
    this.oauthService.tryLogin().then(
      (isSuccess) => {
        console.log('Login isSuccess: ', isSuccess);
        if (isSuccess) {
          this.refreshUserData(this.oauthService.getIdentityClaims());
        } else {
          this.refreshUserData(undefined);
        }
      },
      (error) => console.log('Login error: ', error)
    );
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
    this.refreshUserData(undefined);
  }

  private refreshUserData(idClaims: any) {
    console.log('refreshUserData: ', idClaims);
    this.name = idClaims?.name || '';
    this.sub = idClaims?.sub || '';
    this.picture = idClaims?.picture || '';
  }

  get idClaims() {
    return this.oauthService.getIdentityClaims();
  }
}
