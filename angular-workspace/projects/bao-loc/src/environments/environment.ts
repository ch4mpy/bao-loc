// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client'

const solutionsBasePath = 'https://localhost:8080'

const secureRoutes = [
  `${solutionsBasePath}/solutions`,
]

export const authConfig: PassedInitialConfig  = {
  config: {
    authority: 'https://dev-ch4mpy.eu.auth0.com/',
    secureRoutes,
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'lRHwmwQr3bhkKZeezYD8UAaGna3KSnBB',
    scope: 'openid profile email offline_access solutions:manage',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    logLevel: LogLevel.Debug,
    customParamsAuthRequest: {
      //this is where OpenAPI REST resource-server is located
      audience: solutionsBasePath,
    },
  },
};

export const environment = {
  production: false,
  authConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
