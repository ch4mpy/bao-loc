# Evaluation technique portant sur leproblème de "Bao-Loc"

Réponse à  une évaluation technique dans le cadre d'un processus de recrutement.

## Pré-requis pour compiler / assembler / exécuter localement

**JDK 11** ou suppérieur.

Un wrapper maven est embarqué dans le projet.
Des plugins se chargent de récupérer les outils nécessaires pour le build du projet Angular.

Le packaging Docker ainsi que le déploiement sur le cloud Azure sont fait depuis Github.

## Livrables

[edit] j'ai stoppé l'instance azure qui était devenue payante. Il faut donc packager (`./mvnw package`) puis exécuter localement (`java -jar target/bao-loc-0.0.1-SNAPSHOT.jar` ou depuis votre IDE préféré) pour voir le résultat.

[L'intégration continue](https://github.com/ch4mpy/Bao-Loc/actions) package le projet dans un jar puis dans un conteneur Docker avant de le déployer sur le cloud [Azure](http://bao-loc.azurewebsites.net/).

Comme stipulé dans l'énnoncé, j'ai produit une application web `spring-boot` avec un front Angular.

J'ai choisi un build maven. Les commandes ordinaires pour ce type de projet s'appliquent donc. Examples:
  * `./mvnw spring-boot:run` permet d'exécuter le projet mais sans accès aux resource annexes telles que les rapports de test ou documentation de l'API
  * `./mvnw package` suffit à lancer le build (projet Angular compris)
  * `java -jar target/bao-loc-0.0.1-SNAPSHOT.jar` exécute le projet (qu'il faut avoir packagé au préalable)

Les ressources disponibles sont :
  * [l'UI Angular 9](http://localhost:8000/)
  * l'API de manipulation des solutions qui peut être exploitée avec un client REST tel que Postman pointé sur l'URL http://localhost:8000/solutions
  * [la documentation de cette API](http://localhost:8000/api.html)
  * [les rapports de couverture du code java par les tests-unitaires](http://localhost:8000/ut/jacoco/index.html)
  * [les rapports de couverture du code Angular par les tests-unitaires](http://localhost:8000/ut/angular/index.html)

## Contraintes de qualité

Une [action Github](https://github.com/ch4mpy/Bao-Loc/actions) assure l'intégration continue.

Le build échoue si la couverture du code par les tests passe en dessous de 80%, que ce soit pour la partie Spring ou Angular.
