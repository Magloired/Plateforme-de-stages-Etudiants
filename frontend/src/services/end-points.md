URL BASE = http://localhost:8080 


## 1. CandidatureController

Base route : `/api/Candidature`

| Méthode | URL                     | Description                       | Autorisation         |
| ------- | ----------------------- | --------------------------------- | -------------------- |
| GET     | `/api/Candidature`      | Récupérer toutes les candidatures | Publique             |
| GET     | `/api/Candidature/{id}` | Récupérer une candidature par id  | Publique             |
| POST    | `/api/Candidature`      | Créer une candidature             | Publique (commentée) |
| PUT     | `/api/Candidature/{id}` | Mettre à jour une candidature     | `Etudiant`           |
| DELETE  | `/api/Candidature/{id}` | Supprimer une candidature         | Publique (commentée) |

---

## 2. HomePageController

Base route : `/api/home/offres`

| Méthode | URL                | Description                         | Autorisation |
| ------- | ------------------ | ----------------------------------- | ------------ |
| GET     | `/api/home/offres` | Obtenir les offres actives filtrées | Publique     |

---

## 3. OffresController

Base route : `/api/Offres`

| Méthode | URL                 | Description                 | Autorisation      |
| ------- | ------------------- | --------------------------- | ----------------- |
| GET     | `/api/Offres`       | Récupérer toutes les offres | Publique          |
| GET     | `/api/Offres/{id}`  | Récupérer une offre par id  | Publique          |
| POST    | `/api/Offres`       | Ajouter une nouvelle offre  | Commentée (Admin) |
| PUT     | `/api/Offres/{id}`  | Mettre à jour une offre     | `Admin`           |
| DELETE  | `/api/Offres/{id}`  | Supprimer une offre         | `Admin`           |
| GET     | `/api/Offres/count` | Compter le nombre d’offres  | Publique          |

---

## 4. UserController

Base route : `/api/User`

| Méthode | URL              | Description                     | Autorisation      |
| ------- | ---------------- | ------------------------------- | ----------------- |
| GET     | `/api/User`      | Récupérer tous les utilisateurs | Publique          |
| GET     | `/api/User/{id}` | Récupérer un utilisateur par id | Publique          |
| POST    | `/api/User`      | Créer un utilisateur            | Commentée (Admin) |
| PATCH   | `/api/User/{id}` | Mettre à jour un utilisateur    | `Admin`           |
| DELETE  | `/api/User/{id}` | Supprimer un utilisateur        | `Admin`           |

---

## 5. ValidationController

Base route : `/api/Validation`

| Méthode | URL                    | Description                      | Autorisation                             |
| ------- | ---------------------- | -------------------------------- | ---------------------------------------- |
| GET     | `/api/Validation`      | Récupérer toutes les validations | Publique                                 |
| GET     | `/api/Validation/{id}` | Récupérer une validation par id  | Publique                                 |
| POST    | `/api/Validation`      | Créer une validation             | Commentée (Enseignant,Responsable,Admin) |
| PUT     | `/api/Validation/{id}` | Mettre à jour une validation     | `Enseignant, Responsable, Admin`         |
| DELETE  | `/api/Validation/{id}` | Supprimer une validation         | `Enseignant, Responsable, Admin`         |

---

### Remarques

* Les rôles `Authorize` sont indiqués quand ils sont actifs. Sinon, le endpoint est accessible publiquement.
* Certains `[Authorize]` sont commentés, donc sont accessibles sans authentification pour l’instant.


---
