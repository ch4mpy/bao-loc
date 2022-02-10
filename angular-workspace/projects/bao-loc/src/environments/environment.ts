// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

import { AuthConfig, OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://dev-ch4mpy.eu.auth0.com/',
  redirectUri: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  clientId: 'lRHwmwQr3bhkKZeezYD8UAaGna3KSnBB',
  responseType: 'code',
  //solutions:manage is a scope specific to specified audience (resource server at https://bravo-ch4mp:8080)
  scope: 'openid profile email offline_access solutions:manage',
  customQueryParams: {
    //this is where OpenAPI REST resource-server is located
    audience: 'https://bravo-ch4mp:8080',
  },
  showDebugInformation: true,
};

export const oAuthModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['https://bravo-ch4mp:8080/'],
    sendAccessToken: true,
  },
};

export const environment = {
  production: false,
  authConfig,
  oAuthModuleConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
