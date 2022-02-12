## Technical test

This repo was initiated during an hiring process as my answer to a technical test. It eveloved as a demonstrator for the [maven archetype](https://github.com/ch4mpy/spring-addons/tree/master/spring-webmvc-archetype) and [scripts](https://github.com/ch4mpy/starter/tree/master/angular-workspace-template) I maintain to easily initiate projects.

I was asked to produce an app related to the "Bao-Loc" problem:
provide and test solution for an equation of unique integers between 1 and 9 such as
x1 + 13 * x2 / x3 + x4 + 12 * x5 - x6 - 11 + x7 * x8 / x9 - 10 = 66

### Disclaimer

You should not copy code from this repo to answer a thecnical test: what is contained here is quite specific and you'll be spotted as copier rather than original solution finder.

### Domain model

A _Player_ can manipulate his own _Solution_ collection at `/solutions` end-point (CRUD).

`BaoLocProblemService` is in charge of defining the problem and testing proposed solutions.

Brute-force algorithm was initially implemented on the server and all valid solutions saved in database.
I now moved this algorithm in Angular app as "cheat" modal, server being limited to CRUD + validation and persistance.

### Architecture

I propose 
- a REST API
  - built with Spring boot (web, JPA, validation, security, native, actuator)
  - documented with OpenAPI (Swagger)
  - backed by a relational database (H2)
  - secured with OpenID: authentication enables the API to scope solutions to current user ones for all CRUD operations
- an Ionic-Angular front-end (desktop browser and mobile app) with an API client lib generated from OpenAPI spec

Security is managed by an OpenIDConnect authorization-server: an Auth0 free account.

### Build

#### From api folder
- `./mvnw clean verify -Popenapi` triggers OpenAPI spec file generation (`API_SPEC_FILE`)
- `./mvnw spring-boot:run` starts service on port 8080
- `./mvnw clean install -Pbuild-image -DskipTests` generates a regular "JVM" docker image
- `./mvnw clean install -Pbuild-native-image -DskipTests` generates a "native" docker image: 10x smaller, 10x faster to start, way longer to build

#### From angular-workspace folder
- `npm i -g @angular/cli @ionic/cli`
- `npm i`

### Run
- ```bash
docker run\
 --add-host $HOSTNAME:$HOST_IP\
 -e SERVER_SSL_KEY_PASSWORD=$SERVER_SSL_KEY_PASSWORD\
 -e SERVER_SSL_KEY_STORE_PASSWORD=$SERVER_SSL_KEY_STORE_PASSWORD\
 -p 8080:8080 -t solutions-api:1.0.0-SNAPSHOT
``` (or simply `./mvnw spring-boot:run` from api folder)
- `ionic serve` from angular-workspace folder

### SSL

OpenID requires HTTPS to prevent bearer tokens from transitting as clear text.

As a prerequisite, you should have SSL certificate for your host (assumed to be in `~/.ssh/` and named `${HOSTNAME}_self_signed.crt` and `${HOSTNAME}_req_key.pem`).

If you do not have SSL certificate for your host yet, you can follow [this tutorial](https://github.com/ch4mpy/starter#generating-self-signed-certificate) to generate one and then:
- `cp ~/.ssh/${HOSTNAME}_self_signed.jks api/src/main/resources/self_signed.jks`
- `cp ~/.ssh/${HOSTNAME}_self_signed.pem api/bindings/ca-certificates` (only required if your app consumes self-signed https services such as a local Keycloak authorization-server)

#### Serve Spring API over SSL

SSL is activated by default with certificate on classpath (`src/main/resources/self_signed.jks`). Activate `no-ssl` spring profile to serve over unsecured http.

#### Serve Ionic app over SSL

- Replace `bravo-ch4mp` with the value of your `$HOSTNAME` in `projects/bao-loc/package.json`
- Edit `angular.json`, for each app, under architect -> serve -> configurations -> `bravo-ch4mp` to replace `bravo-ch4mp` with `$HOSTNAME` and update, `host`, `sslCert` and `sslKey` properties
