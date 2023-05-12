import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `<app-toolbar title="About"></app-toolbar>
    <div
      style="padding: 2em; max-width: 920px; margin-left: auto; margin-right: auto;"
    >
      <p>
        Solution to the "Bao-Loc" problem. It is an opportunity to see in
        action:
      </p>
      <ul>
        <li>
          Spring Boot RESTful API with:
          <ul>
            <li>usage of HTTP vefbs and status codes</li>
            <li>ORM with JPA and Spring JpaRepository</li>
            <li>
              Java unit-testing, including security rules (ensure a user can
              access only his solutions)
            </li>
            <li>
              usage of spring-cloud-gateway (routing to Angular apps and various
              ways to access the API)
            </li>
          </ul>
        </li>
        <li>
          Angular workspaces with:
          <ul>
            <li>multiple applications sharing code in libraries</li>
            <li>
              client library generation from OpenAPI spec (DTOs and services
              wrapping requests are generated)
            </li>
            <li>user input validation</li>
            <li>
              navigation between "screens" of Single Page Application (each in a
              separate lazy-loaded module)
            </li>
            <li>
              web-worker: offload heavy process (brute-force solver for the
              Bao-Loc problem) to a separate "thread"
            </li>
          </ul>
        </li>
        <li>
          Two different ways to handle Javascript based application security
          with OAuth2:
          <ul>
            <li>
              Browser application configured as OAuth2 public client. This is
              the simplest soltuion when using an existing library like
              <a href="https://github.com/damienbod/angular-auth-oidc-client"
                >angular-auth-oidc-client</a
              >
              but requires to use a public client (applications running in a
              browser or on a mobile device cant keep a secret), and to expose
              OAuth2 tokens (access, refresh and ID) to Javascript code.
            </li>
            <li>
              Applying the <b>B</b>ackend <b>F</b>or <b>F</b>rontend pattern in
              which the OAuth2 client is a middleware on the server. The
              frontends (Angular applications in our case) are secured with
              sessions on the BFF (spring-cloud-gateway in our case) which
              replaces session cookies with OAuth2 access tokens before
              forwarding a request from the browser to the REST API.
            </li>
          </ul>
        </li>
        <li>
          CI / CD with github action building docker images for gateway, REST
          API, and Angular app, and then deploying to a Kubernetes cluster
          managed by OVH (a French cloud provider)
        </li>
      </ul>
      <p>
        Spring security configurations for gateway and REST API are handled by
        Spring Boot starters of mine, with sources hosted
        <a href="https://github.com/ch4mpy/spring-addons">on Github</a>
        and published
        <a
          href="https://repo1.maven.org/maven2/com/c4-soft/springaddons/spring-security-oauth2-addons/"
          >on maven-central</a
        >. Those starters are thin wrappers arrount
        spring-boot-starter-oauth2-client and
        spring-boot-starter-oauth2-resource-server. It greatly simplify
        configuration.
      </p>
      <p>
        The application secured with a BFF is available from
        <a href="https://bao-loc.demo.c4-soft.com/ui/bff/">here</a> and the one
        configured as an OAuth2 public client from
        <a href="https://bao-loc.demo.c4-soft.com/ui/public-client/">there</a>
      </p>
      <p>
        The source is available
        <a href="https://github.com/ch4mpy/bao-loc">on Github</a>
      </p>
    </div>`,
  styles: [],
})
export class AboutPage {}
