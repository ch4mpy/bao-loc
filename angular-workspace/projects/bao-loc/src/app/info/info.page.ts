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
          Vous consultez le livrable d'une
          <a href="https://github.com/ch4mpy/Bao-Loc">évaluation technique</a>
          comportant quatre étapes:
        </p>
        <ol>
          <li lines="none" detail="false">
            écriture d'un algorithme trouvant les solutions au problème de math
          </li>
          <li lines="none" detail="false">
            enregistrer les résultats dans une base de données H2 en utilisant
            JPA
          </li>
          <li lines="none" detail="false">
            exposer une API REST avec spring-webmvc pour récupérer, modifier et
            supprimer les résultats
          </li>
          <li lines="none" detail="false">
            créer une interface graphique avec Angular pour consulter, modifier
            et supprimer les résultats ainsi que de relancer la recherche de
            solutions
          </li>
        </ol>
        <p>
          L'énoncé stipulant que
          <i>
            &laquo; Des mathématiciens européens chevronnés n’ont pas été en
            mesure de le résoudre &raquo;
          </i>
          , je n'ai pas cherché de solution mathématique élégante et me suis
          contenté d'un algorithme de force brute, c'est à dire soumettant les
          9! (soit 362 880) combinaisons candidates à la formule du problème de
          Bao-Loc et ne retenant que celles donnant le résultat attendu.
        </p>
        <p>
          Je suis allé un peu plus loin que la demande en intégrant une
          identification OpenID de l'utilisateur (fournie par Auth0). <br />
          Celà permet d'avoir un jeu de solution par utilisateur : en s'appuyant
          sur son identité, on peut ne manipuler que ses solutions lors des
          appels d'API.<br />
          Les utilisateur avec un role <i>ADMIN</i> peuvent accéder aux
          solutions des autres, mais cette fonctionnalité n'est pas exploitée
          dans le client livré.
        </p>
        <p>En plus des frameworks imposés, jai utilisé:</p>
        <ul>
          <li>
            Ionic (avec Angular). L'application peut donc être assemblée pour un
            serveur web ou sous forme d'application native Android ou iOS.
          </li>
          <li>
            spring-native qui permet un démarrage de l'API en 0,5 seconde avec
            une empreinte mémoire minimale
          </li>
          <li>
            spring-security avec
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
          <li>spring-data-jpa pour l'ORM et la persistence en BDD</li>
          <li>
            springdoc-openapi pour la génération de la spec OpenAPI (Swagger)
          </li>
        </ul>
        <p>Je me suis également appuyé sur :</p>
        <ul>
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
            pour la génération d'APIs REST Spring (native, webmvc, jpa,
            security, openapi) sécurisées avec OpenID
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
      </div>
    </ion-content>`,
  styles: [],
})
export class InfoPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
