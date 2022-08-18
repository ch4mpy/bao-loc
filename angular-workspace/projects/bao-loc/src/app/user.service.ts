import { Injectable } from '@angular/core';
import {
  OidcSecurityService,
  OpenIdConfiguration,
} from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

export class User {
  static readonly ANONYMOUS = new User('', '', '', '', '', []);

  constructor(
    readonly subject: string,
    readonly username: string,
    readonly displayName: string,
    readonly email: string,
    readonly picture: string,
    readonly roles: Array<string>
  ) {}

  get isAuthenticated(): boolean {
    return !!this.username;
  }

  static of(userData?: any): User {
    const realmRoles: string[] = userData?.realm_access?.roles || [];
    if (
      environment.authConfig.config?.constructor?.name ===
      'OpenIdConfiguration[]'
    ) {
      throw 'Update User class to pick clientId from the right configuration';
    }
    var clientId = (environment.authConfig.config as OpenIdConfiguration)
      ?.clientId;
    const clientRoles: string[] =
      userData?.resource_access && clientId
        ? userData.resource_access[clientId]?.roles || []
        : [];
    return userData?.preferred_username
      ? new User(
          userData.sub,
          userData.preferred_username,
          userData.name || userData.preferred_username,
          userData.email,
          userData.picture,
          realmRoles
            .concat(clientRoles)
            .map((r) => r?.trim()?.toUpperCase())
            .filter((r) => !!r?.length)
        )
      : User.ANONYMOUS;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _currentUser$ = new BehaviorSubject<User>(User.ANONYMOUS);

  constructor(private oidcService: OidcSecurityService) {
    this.refreshUserData(undefined);

  }

  async refreshUserData(idClaims: any) {
    console.log('refreshUserData: ', idClaims);
    if (!idClaims) {
      this._currentUser$.next(User.ANONYMOUS);
      return;
    }
    this._currentUser$.next(User.of(idClaims));
  }

  login() {
    this.oidcService.authorize();
  }

  logout() {
    this.oidcService.logoff();
    this.refreshUserData(undefined);
  }

  get valueChanges(): Observable<User> {
    return this._currentUser$;
  }

  get current(): User {
    return this._currentUser$.getValue();
  }
}
