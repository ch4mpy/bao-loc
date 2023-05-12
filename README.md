## Technical test

This repo was initiated during an hiring process as my answer to a technical test. It eveloved as a demonstrator for the BFF pattern and thin wrappers around `spring-boot-starter-oauth2-resource-server` and `spring-boot-starter-oauth2-client` I maintain [on Github](https://github.com/ch4mpy/spring-addons) and publish [on maven-central](https://repo1.maven.org/maven2/com/c4-soft/springaddons).

I was asked to produce an app related to the "Bao-Loc" problem:
provide the distinct integers between 1 and 9 such as
x1 + 13 * x2 / x3 + x4 + 12 * x5 - x6 - 11 + x7 * x8 / x9 - 10 = 66

### Disclaimer

You should not copy code from this repo to answer a similar test: what is contained here is quite specific and you'll be instantly spotted as cheater.

### Architecture

I propose:
- two options for OAuth2 security:
  - Angular application configured as an OAuth2 public client using [angular-auth-oidc-client](https://github.com/damienbod/angular-auth-oidc-client), where the browser application has access to OAuth2 tokens and authorizes its requests with JWTs.
  - **B**ackend **F**or **F**rontend pattern where the Angular application has not access to OAuth2 tokens. It is secured with sessions on the BFF. `spring-cloud-gateway` is configured as BFF (OAuth2 confidential client with `TokenRelay`filter) and replaces session cookies with access token Authorization header before forwarding a request from the browser to resource server.
- a multi-module maven project in `api` folder:
  - built with Spring boot (web, JPA, validation, security, native, actuator)
  - documented with OpenAPI (Swagger)
  - backed by a relational database (Postgresql)
  - secured with OpenID: authentication enables the API to scope solutions to current user ones for all CRUD operations
- an Angular workspace in `angular-ui` folder, which contains:
  - 2 Angular applications: one for each security implementations
  - 2 API client libs generated from OpenAPI specs: one for gateway endpoints for BFF client (login options, logout and user-info endpoints), and another for solutions REST API
  - 2 common libraries for domain classes as well as shared components (reduce code duplication between the two applications to a very few code lines)
- Github CI / CD with deployment to a K8s managed cluster at OVH:
  - application using BFF is available from [here](https://bao-loc.demo.c4-soft.com/ui/bff/problem)
  - application configured as OAuth2 public client is available from [there](https://bao-loc.demo.c4-soft.com/ui/public-client/problem)

Users registration and authentication is managed by a Keycloak instance deployed on the same K8s cluster.
