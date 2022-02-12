import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  template: `<ion-header>
      <ion-toolbar translucent color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Info</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div
        style="padding: 2em; max-width: 920px; margin-left: auto; margin-right: auto;"
      >
        <p>
          Application publiée en formats web et mobiles dont la fonction principale
          est d'être un démonstrateur technique pour :
        </p>
        <ul>
          <li>
            <a href="https://github.com/ch4mpy/spring-addons">
              une extension
            </a>
            que je maintiens en open-source et publie sur
            <a
              href="https://repo1.maven.org/maven2/com/c4-soft/springaddons/spring-security-oauth2-addons/"
            >
              maven-central
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ch4mpy/starter/tree/master/spring-webmvc-archetype"
            >
              un archetype maven
            </a>
            également publié sur
            <a
              href="https://repo1.maven.org/maven2/com/c4-soft/springaddons/spring-webmvc-archetype/"
            >
              maven-central
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ch4mpy/starter/tree/master/angular-workspace-template"
            >
              la création scriptée de workspaces Angular
            </a>
            contenant une application Ionic minimale (identification OpenID,
            pages de compte utilisateur et de configuration) ainsi qu'une
            librairie cliente de l'API générée à partir de la spec OpenAPI
          </li>
        </ul>
        <p>Le cas d'utilisation est le problème dit de "Bao-Loc". Il permet de mettre en application entre autres :</p>
        <ul>
          <li>architecture logicielle modulaire</li>
          <li>échanges client / serveur REST</li>
          <li>génération de code client à partir du code serveur (par l'intermédiaire d'une spec OpenAPI)
          <li>identification des utilisateurs et sécurisation des échanges avec Open ID Connect</li>
          <li>validation des saisies utilisateurs (Angular & javax.validation)</li>
          <li>navigation entre "écrans" d'une Single Page Application (chacun dans un module avec chargement différé)</li>
          <li>intercepteur HTTP et garde Angular</li>
          <li>mapping domaine &lt;-&gt; DTOs avec mapstruct</li>
          <li>ORM avec JPA et utilisation de JpaRepository Spring</li>
          <li>tests unitaires Java incluant la sécurité OpenID</li>
        </ul>
      </div>
    </ion-content>`,
  styles: [],
})
export class InfoPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
