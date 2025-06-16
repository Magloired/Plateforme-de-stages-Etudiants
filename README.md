# Plateforme de Stages Étudiants

Une application web développée avec **ASP.NET Core** qui permet :

- aux **étudiants** de consulter et postuler à des offres de stage,
- aux **enseignants** et **responsables pédagogiques** de suivre, valider et gérer les candidatures.

---

## Prérequis
Avant de lancer le projet, assure-toi d’avoir installé :

    .NET 8 SDK

Un IDE compatible comme Visual Studio Code ou Visual Studio

Un SGBD, par exemple : PostgreSQL (local ou Docker)


Swagger UI (déjà intégré) pour tester l'API

---
## Authentification

L'application utilise **ASP.NET Core Identity** couplée à **JWT (JSON Web Tokens)** pour sécuriser les accès et garantir l’authentification et l’autorisation des utilisateurs.

---

## Lancement du projet
Voici les étapes pour démarrer l’application en local :

```bash
# 1. Restaure les dépendances NuGet
dotnet restore

# 2. Applique les migrations (si la DB est prête)
dotnet ef database update

# 3. Compile le projet
dotnet build

# 4. Lance l'application
dotnet run --project backend

```

---

## Installation des packages requis

```bash
cd backend

dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Swashbuckle.AspNetCore

dotnet add package AutoMapper
dotnet add package BCrypt.Net-Next
dotnet add package System.IdentityModel.Tokens.Jwt

# Migration
dotnet ef migrations add InitialCreate

# Sans docker
dotnet ef database update

#Avec docker
docker-compose exec api dotnet ef database update

# Version Update 
dotnet tool update --global dotnet-ef

# Supprimer la config précédente de DB
dotnet ef migrations add UpdateModel

```
| Package                                           | Utilité principale                                                |
|---------------------------------------------------|-------------------------------------------------------------------|
| Microsoft.AspNetCore.Identity.EntityFrameworkCore | Authentification avec gestion utilisateurs et rôles via EF Core   |
| Microsoft.AspNetCore.Authentication.JwtBearer     | Sécurité des API via token JWT                                    |
| Npgsql.EntityFrameworkCore.PostgreSQL             | Connexion à PostGreSQL avec EF Core                               |
| Swashbuckle.AspNetCore                            | Documentation interactive de l’API avec Swagger                   |

--- 

# Architecture du Backend
/Controllers     → Contient les endpoints HTTP (API)
/Services        → Contient la logique métier (services injectés)
/Models          → Entités de base (User, Offre, etc.)
/DTOs            → Objets de transfert de données (Data Transfer Objects)
/Data            → Configuration EF Core, DbContext
/Middlewares     → Middleware personnalisés (log, auth, etc.)

--- 
# Entités principales
. User
    Représente les utilisateurs de l’application : étudiants, enseignants, responsables pédagogiques.

. OffreStage
    Représente les offres de stages publiées.

. Candidature
    Gère les postulations des étudiants aux offres disponibles.

. Validation
    Permet aux enseignants et responsables de suivre et valider les candidatures.

---