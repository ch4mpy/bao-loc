# Evaluation technique par Skazy.nc

Repo temporaire pour partager ma réponse à l'évaluation technique de Skazy.

## Pré-requis

Pour compiler ou exécuter le projet localement, leseul pré-requis est un JDK 11 ou suppérieur.
Un wrapper maven est embarqué dans le projet.
Des plugins maven se chargent de récupérer les outils nécessaires pour le build du projet Angular.

## Livrables

[L'intégration continue ](https://github.com/ch4mpy/skazy-wacongne-jerome/actions) package le projet dans un jar puis dans un conteneur Docker avant de le déployer sur le cloud [Azure](http://bao-loc.azurewebsites.net/).

Comme stipulé dans l'énnoncé, j'ai produit un application web `spring-boot` avec un front Angular.

J'ai choisi un build maven. Les commandes ordinaires pour ce type de projet s'appliquent donc. Examples:
  * `./mvnw spring-boot:run` permet d'exécuter le projet mais sans accès aux resource annexes telles que les rapports de test ou documentation de l'API
  * `./mvnw package` suffit à lancer le build (projet Angular compris)
  * `java -jar target/skazy-wacongne-jerome-0.0.1-SNAPSHOT.jar` exécute le projet (qu'il faut avoir packagé au préalable)

Les ressources disponibles sont :
  * [l'UI Angular 8](http://bao-loc.azurewebsites.net/)
  * l'API de manipulation des solutions qui peut être exploitée avec un client REST tel que Postman pointé sur l'URL http://bao-loc.azurewebsites.net/solutions
  * [la documentation de cette API](http://bao-loc.azurewebsites.net/api.html)
  * [les rapports de couverture du code java par les tests-unitaires](http://bao-loc.azurewebsites.net/ut/jacoco/index.html)
  * [les rapports de couverture du code Angular par les tests-unitaires](http://bao-loc.azurewebsites.net/ut/angular/index.html)

## Contraintes de qualité

Une [action Github](https://github.com/ch4mpy/skazy-wacongne-jerome/actions) assure l'intégration continue.

Le build échoue si la couverture du code par les tests passe en dessous de 80%, que ce soit pour la partie Spring ou Angular.
