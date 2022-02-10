import { AuthConfig, OAuthModuleConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: 'https://dev-ch4mpy.eu.auth0.com/',
  redirectUri: 'https://bao-loc.c4-soft.com',
  postLogoutRedirectUri: 'https://bao-loc.c4-soft.com',
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
