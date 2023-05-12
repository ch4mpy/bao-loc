import { Injectable } from '@angular/core';
import { GatewayApi, LoginOptionDto, UserDto } from '@c4-soft/gateway-api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { UserService } from '@c4-soft/bao-loc-commons';
import { User } from '@c4-soft/bao-loc-domain';

@Injectable({
  providedIn: 'root',
})
export class BffUserService implements UserService {
  private user$ = new BehaviorSubject<User>(User.ANONYMOUS);
  private loginUri!: string

  constructor(private gatewayApi: GatewayApi) {
    this.refresh();
    this.gatewayApi.getLoginOptions().subscribe({
      next: options => {
        this.loginUri = options?.length ? options[0].loginUri : ''
      }
    })
  }

  refreshUserData(idClaims: UserDto): void {
    this.user$.next(
      idClaims.subject
        ? new User(idClaims.subject, idClaims.displayName || '', idClaims.email || '', idClaims.picture || '', idClaims.roles || [])
        : User.ANONYMOUS
    );
  }

  private refresh(): void {
    this.gatewayApi.getMe().subscribe({
      next: (user) => {
        this.refreshUserData(user);
      },
      error: (error) => {
        console.warn(error);
        this.user$.next(User.ANONYMOUS);
      },
    });
  }

  login() {
    window.location.href = this.loginUri;
  }

  async logout() {
    lastValueFrom(this.gatewayApi.logout('response'))
      .then((resp) => {
        const logoutUri = resp.headers.get('location') || '';
        if (logoutUri) {
          window.location.href = logoutUri;
        }
      })
      .finally(() => {
        this.user$.next(User.ANONYMOUS);
      });
  }

  get loginOptions(): Observable<Array<LoginOptionDto>> {
    return this.gatewayApi.getLoginOptions();
  }

  get valueChanges(): Observable<User> {
    return this.user$;
  }

  get current(): User {
    return this.user$.value;
  }
}
