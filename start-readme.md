
# Lancement du Backend de la Plateforme de Stages

## 1. Prérequis

Avant toute exécution installés sur votre environnement de développement :

* **Docker Desktop** (pour Windows/Mac) ou **Docker Engine** (pour Linux)
* **Git** (pour cloner le dépôt)
* **Un éditeur de code** (Visual Studio Code recommandé)

---

## 2. Procédure de Lancement via Docker

### 2.1 Accès au projet

Ouvrir un terminal (PowerShell, CMD, ou bash) et exécuter la commande suivante ou acceder au répertoire principal :

```bash
cd Plateforme-de-stages-Etudiants
```

Ensuite, naviguer vers le dossier backend :

```bash
cd backend
```

### 2.2 Vérification de la configuration Docker

S'assurer de la présence des fichiers de configuration suivants dans le répertoire courant :

* `docker-compose.yml`
* `Dockerfile`
* `appsettings.json`

### 2.3 Démarrage des services

Lancer l’ensemble des services via la commande suivante :

```bash
docker-compose up --build
```

Cette commande effectuera les opérations suivantes :

* Construction de l’image Docker pour l’API backend (.NET 8.0)
* Démarrage du service PostgreSQL
* Application automatique des migrations
* Démarrage de l’API à l’adresse `http://localhost:5196`

### 2.4 Indicateurs de bon fonctionnement

Une fois le backend lancé, la présence des logs suivants confirme son bon démarrage :

```
backend-api-1  | info: Microsoft.Hosting.Lifetime[14]
backend-api-1  |       Now listening on: http://0.0.0.0:8080
backend-api-1  | info: Microsoft.Hosting.Lifetime[0]
backend-api-1  |       Application started.
```

---

## 3. Vérifications Fonctionnelles

### 3.1 API

Accéder à l’URL suivante via un navigateur :

```
http://localhost:5196/api/Entreprise
```

Une réponse au format JSON doit s’afficher, même vide.

### 3.2 Interface Swagger

La documentation interactive de l’API est disponible à l’adresse suivante :

```
http://localhost:5196/swagger
```

### 3.3 Connexion à la base de données PostgreSQL

Utiliser la commande ci-dessous pour accéder au shell de PostgreSQL :

```bash
docker exec -it backend-db-1 psql -U postgres -d StagePlatformDB
```

---

## 4. Services Accessibles

| Service         | URL                             | Port | Description                  |
| --------------- | ------------------------------- | ---- | ---------------------------- |
| API Backend     | `http://localhost:5196/api`     | 5196 | Points de terminaison REST   |
| Swagger         | `http://localhost:5196/swagger` | 5196 | Documentation de l'API       |
| Base de données | `localhost`                     | 5432 | PostgreSQL (StagePlatformDB) |

---

## 5. Commandes Utiles

| Action                        | Commande                                           |
| ----------------------------- | -------------------------------------------------- |
| Affichage des logs de l’API   | `docker-compose logs -f api`                       |
| Affichage des logs de la base | `docker-compose logs db`                           |
| Arrêt des services            | `docker-compose down`                              |
| Redémarrage des services      | `docker-compose restart`                           |
| Nettoyage complet             | `docker-compose down -v && docker system prune -f` |


# Voir les logs des conteneurs
docker-compose logs

# Arrêter les conteneurs
docker-compose down

# Redémarrer les conteneurs
docker-compose restart

# Voir le statut des conteneurs
docker-compose ps
---

## 6. Dépannage

### Port déjà utilisé

```bash
netstat -ano | findstr :5196
# ou
docker stop $(docker ps -a -q)
```

### Base de données ne démarre pas

```bash
docker-compose logs db
docker-compose restart db
```

### API inaccessible

```bash
docker-compose logs api
docker-compose restart api
```

---

## 7. Endpoints API

### Authentification

```
POST http://localhost:5196/api/Auth/login
POST http://localhost:5196/api/Auth/register
```

### Entreprises

```
GET    /api/Entreprise
GET    /api/Entreprise/{id}
POST   /api/Entreprise
PUT    /api/Entreprise/{id}
DELETE /api/Entreprise/{id}
```

### Offres de stage

```
GET    /api/Offres
GET    /api/Offres/{id}
POST   /api/Offres
PUT    /api/Offres/{id}
DELETE /api/Offres/{id}
GET    /api/Offres/count
```

### Candidatures

```
GET    /api/Candidature
GET    /api/Candidature/{id}
POST   /api/Candidature
PUT    /api/Candidature/{id}
DELETE /api/Candidature/{id}
```

### Validations

```
GET    /api/Validation
GET    /api/Validation/{id}
POST   /api/Validation
PUT    /api/Validation/{id}
DELETE /api/Validation/{id}
```

### Utilisateurs

```
GET    /api/User
GET    /api/User/{id}
POST   /api/User
PATCH  /api/User/{id}
DELETE /api/User/{id}
```

---

## 8. Vérifications Finales

Afin de valider que l’ensemble de l’infrastructure backend est opérationnelle, vérifier les points suivants :

* L’URL `http://localhost:5196/api/Entreprise` retourne une réponse valide
* L’interface Swagger est accessible à l’adresse `http://localhost:5196/swagger`
* Les migrations sont appliquées correctement sans erreur
* Aucun message d’erreur n’est présent dans les logs

---



Le backend est désormais prêt à être utilisé et peut recevoir des requêtes en provenance du frontend.

