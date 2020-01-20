import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
    <span class="header-title">Tests des compétences de Jérôme Wacongne par Skazy</span>
  </mat-toolbar>
  <p>
    Le test portait sur la résolution du problème dit de "Bao-Loc" et comportait quatre étapes:
  </p>
  <ol>
    <li>écrire un algorithme trouvant les solutions au problème de math</li>
    <li>enregistrer les résultats dans une base de données H2 en utilisant JPA</li>
    <li>exposer une API REST avec spring-webmvc pour récupérer, modifier et supprimer les résultats</li>
    <li>créer une interface graphique avec Angular pour consulter et manipuler les résultats</li>
  </ol>
  <p>
    L'énoncé stipulant que <i>&laquo; Des mathématiciens européens chevronnés n’ont pas été en mesure de le
    résoudre &raquo;</i>, je n'ai pas cherché de solution mathématique élégante et me suis contenté d'un algorithme de "force brute",
    c'est à dire explorant systématiquement les 9! (362 880) combinaisons candidates (9 entiers tous différents et compris entre 1 et 9)
  </p>
  <div >
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
