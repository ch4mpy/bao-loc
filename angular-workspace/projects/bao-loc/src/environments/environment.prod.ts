import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client'

const solutionsBasePath = 'https://api.bao-loc.c4-soft.com'

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
