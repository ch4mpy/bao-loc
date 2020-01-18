import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <p>
      Le test comportait quatre étapes
    </p>
    <ol>
      <li>écrire un algorithme trouvant les sliutions au problème de math de "Bao-Loc"</li>
      <li>enregistrer les résultats dans une base de données H2 en utilisant JPA</li>
      <li>exposer une API REST avec spring-webmvc pour récupérer, modifier et supprimer les résultats</li>
      <li>créer une interface graphique avec Angular pour <a routerLink="/display">consulter et manipuler les résultats</a></li>
    </ol>
    <p>
      L'énoncé stipulant que &laquo; Des mathématiciens européens chevronnés n’ont pas été en mesure de le
      résoudre &raquo;, je n'ai pas cherché de solution mathématique élégante et me suis rabattu sur un algorithme de "force brute",
      c'est à dire explorant systématiquement les 9! (362 880) combinaisons candidates (9 entiers tous différents et compris entre 1 et 9)
    </p>
    <p>
      Pour faciliter le développement des client web, l'API crée en étape <i>3.</i> est
      <a href="/api.html">documentée avec spring-restdocs</a>.
      Maven s'occupe de générer cette doc à partir d'un template et des tests unitaires puis de l'iajouter à target/classes/static
    </p>
    <p>
      L'énoncé indiquait dans une note:
      &laquo; mettre le code du front-end dans un dossier nommé « static » dans le back-end (src/main/resources/static) &raquo;.
      J'ai n'ai pas suivi cette instruction: les racines des projets Angular et Spring sont fusionnées.
      Seule la sortie du build Angular est copiée dans target/classes/static, ce qui est suffisant pour permettre
      &laquo; au serveur d’embarquer le front &raquo;.
    </p>
    <app-solutions-page></app-solutions-page>
  `,
  styles: []
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
