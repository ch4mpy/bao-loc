import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client'

const solutionsBasePath = 'https://bravo-ch4mp:8080'

const secureRoutes = [
  `${solutionsBasePath}/solutions`,
]

export const authConfig: PassedInitialConfig  = {
  config: {
    authority: 'https://bravo-ch4mp:8443/realms/master',
    secureRoutes,
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'bao-loc-public',
    scope: 'openid profile email offline_access',
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
