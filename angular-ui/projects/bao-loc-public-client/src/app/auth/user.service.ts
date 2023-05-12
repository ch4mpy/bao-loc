import { Injectable } from '@angular/core';
import { UserService } from '@c4-soft/bao-loc-commons';
import { User } from '@c4-soft/bao-loc-domain';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicClientUserService implements UserService {
  private readonly _currentUser$ = new BehaviorSubject<User>(User.ANONYMOUS);

  constructor(private oidcService: OidcSecurityService) {
    this.refreshUserData(undefined);
  }

  async refreshUserData(idClaims?: any) {
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
    this.oidcService.logoff().subscribe(() => {});
    this.refreshUserData(undefined);
  }

  get valueChanges(): Observable<User> {
    return this._currentUser$;
  }

  get current(): User {
    return this._currentUser$.getValue();
  }
}
