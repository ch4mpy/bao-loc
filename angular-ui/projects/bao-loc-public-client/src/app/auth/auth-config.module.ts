import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  AuthInterceptor,
  AuthModule,
  LogLevel,
  OpenIdConfiguration,
} from 'angular-auth-oidc-client';

const solutionsBasePath = 'https://bao-loc.demo.c4-soft.com/api/v1/';

const secureRoutes = [`/api`];

export const openIdConfiguration: OpenIdConfiguration = {
  authority: 'https://oidc.c4-soft.com/auth/realms/spring-addons',
  secureRoutes,
  redirectUrl: window.location.origin + '/ui/public-client/',
  postLogoutRedirectUri: window.location.origin + '/ui/public-client/',
  clientId: 'bao-loc-public',
  scope: 'openid profile email offline_access',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  maxIdTokenIatOffsetAllowedInSeconds: 600,
  issValidationOff: false,
  autoUserInfo: false,
  logLevel: LogLevel.Debug,
  customParamsAuthRequest: {
    //this is where OpenAPI REST resource-server is located
    audience: solutionsBasePath,
  },
};

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: openIdConfiguration,
    }),
  ],
  exports: [AuthModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthConfigModule {}
