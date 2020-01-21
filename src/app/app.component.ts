import { Component } from '@angular/core';

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
    <span class="header-title">Problème de "Bao-Loc"</span>
  </mat-toolbar>

  <h1>Contexte</h1>
  <p>
    Vous regardez le livrable d'une <a href="https://github.com/ch4mpy/Bao-Loc">évaluation technique</a> comportant quatre étapes:
  </p>
  <ol>
    <li>écriture d'un algorithme trouvant les solutions au problème de math</li>
    <li>enregistrer les résultats dans une base de données H2 en utilisant JPA</li>
    <li>exposer une API REST avec spring-webmvc pour récupérer, modifier et supprimer les résultats</li>
    <li>créer une interface graphique avec Angular pour consulter, modifier et supprimer les résultats
      ainsi que de relancer la recherche de solutions</li>
  </ol>
  <p>
    L'énoncé stipulant que <i>&laquo; Des mathématiciens européens chevronnés n’ont pas été en mesure de le
    résoudre &raquo;</i>, je n'ai pas cherché de solution mathématique élégante et me suis contenté d'un algorithme de "force brute",
    c'est à dire explorant systématiquement les 9! (soit 362 880) combinaisons candidates de 9 entiers différents compris entre 1 et 9
  </p>
  <p>
    Je suis allé un peu plus loin que l'énoncé en mettant en place une
    <a href="https://github.com/ch4mpy/Bao-Loc/actions">intégration continue</a> qui
    compile, package dans un conteneur Docker et déploie sur le cloud Azure.
  </p>
  <p>
    J'ai également configuré Maven pour packager quelques ressources complémentaires:
  </p>
  <ul>
    <li><a href="http://bao-loc.azurewebsites.net/api.html">documentation de l'API REST</a></li>
    <li><a href="http://bao-loc.azurewebsites.net/ut/jacoco/index.html"></a></li>
    <li><a href="http://bao-loc.azurewebsites.net/ut/angular/index.html">couverture du code Angular par les tests unitaires</a></li>
  </ul>

  <h1>Résultat</h1>
  Sélectionnez une solution (à gauche) pour pouvoir l'éditer (à droite).
  <div>
    <app-solutions-page class="widget solutions-page-widget"></app-solutions-page>
    <app-solution-edit-form class="widget edit-widget"></app-solution-edit-form>
  </div>
  `,
  styles: [
    '.widget { display: inline-block; vertical-align:top; padding: 2em 2em; }',
    '.solutions-page-widget { max-width: 420px; }',
    '.edit-widget { width: 510px; }']
})
export class AppComponent {

  constructor() {
  }

}
