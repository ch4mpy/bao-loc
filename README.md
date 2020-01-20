# Evaluation technique par Skazy.nc

Repo temporaire pour partager ma réponse à l'évaluation technique de Skazy.

## Pré-requis

JDK 11 ou suppérieur et c'est tout.
Un wrapper maven est embarqué dans le projet.
Des plugins maven se chargent de récupérer les outils nécessaires pour le build du projet Angular.

## Livrables

Comme stipulé dans l'énnoncé, j'ai produit un application web `spring-boot` avec un front Angular.

J'ai choisi un build maven. Les commandes ordinaires pour ce type de projet s'appliquent donc. Examples:
  * `./mvnw spring-boot:run` permet d'exécuter le projet mais sans accès aux resource annexes telles que les rapports de test ou documentation de l'API
  * `./mvnw package` suffit à lancer le build (projet Angular compris)
  * `java -jar target/skazy-wacongne-jerome-0.0.1-SNAPSHOT.jar` exécute le projet (qu'il faut avoir packagé au préalable)

Les ressources disponibles depuis une machine sur laquelle le projet est **en cours d'éxécution** :
  * [l'UI Angular 8](http://localhost:8080)
  * l'API de manipulation des solutions qui peut être exploitée avec un client REST tel que Postman pointé sur l'URL http://localhost:8080/solutions
  * [la documentation de cette API](http://localhost:8080/api.html)
  * [les rapports de couverture du code par les tests-unitaires](http://localhost:8080/jacoco-tu.index.html)

## Contraintes de qualité

Une [action Github](https://github.com/ch4mpy/skazy-wacongne-jerome/actions) assure l'intégration continue.

Le build échoue si la couverture du code par les tests passe en dessous de 80%, que ce soit pour la partie Spring ou Angular.
