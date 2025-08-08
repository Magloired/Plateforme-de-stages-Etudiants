# 🔐 Guide d'Authentification - Plateforme de Stages

## 📋 Système d'Authentification Disponible

La plateforme dispose d'un système d'authentification complet avec JWT qui fonctionne en mode **Mock** et **API Réelle**.

## 🚀 Compte Admin Disponible

### Compte Admin Principal
- **Email**: `admin@stages.com`
- **Mot de passe**: `Admin123!`
- **Rôle**: Administrateur
- **Source**: Créé automatiquement par `SeedData.cs` dans le backend
- **Compatible**: Mode API réelle + Mode Mock

## 🔧 Modes de Fonctionnement

### Mode Mock (par défaut)
- **Activé par**: `IS_MOCK_MODE: true` dans `app-config.ts`
- **Avantages**: Fonctionne sans backend démarré
- **Utilisation**: Pour développement frontend rapide
- **Comptes valides**: `admin@stages.com` uniquement

### Mode API Réelle
- **Activé par**: `IS_MOCK_MODE: false` dans `app-config.ts`
- **Prérequis**: Backend démarré sur `http://localhost:5196`
- **Avantages**: Authentification JWT complète
- **Comptes valides**: `admin@stages.com` uniquement (ou utilisateurs créés via API)

## 🛠️ Comment Tester

### 1. Test en Mode Mock
```bash
# Dans frontend/src/config/app-config.ts
IS_MOCK_MODE: true
```
- Utilisez le compte `admin@stages.com`
- Pas besoin de démarrer le backend

### 2. Test en Mode API Réelle
```bash
# 1. Démarrer le backend
cd backend
dotnet run

# 2. Dans frontend/src/config/app-config.ts
IS_MOCK_MODE: false

# 3. Utiliser le compte admin par défaut
# Email: admin@stages.com
# Password: Admin123!
```

## 📁 Fichiers Principaux

### Backend
- `Controllers/AuthController.cs` - Endpoints d'authentification
- `Services/AuthService.cs` - Logique d'authentification JWT
- `Data/SeedData.cs` - Création du compte admin par défaut
- `DTO/UserDTO/LoginDTO.cs` - Structure des données de connexion

### Frontend
- `components/studentLayouts/AdminLogin.tsx` - Formulaire de connexion
- `services/api-hybrid.ts` - Service API hybride (mock/réel)
- `config/app-config.ts` - Configuration des modes

## ✅ Fonctionnalités Implémentées

- ✅ **Authentification JWT** complète
- ✅ **Validation des formulaires** avec Zod + React Hook Form
- ✅ **Gestion des erreurs** avec messages d'erreur
- ✅ **Stockage des tokens** (localStorage/sessionStorage)
- ✅ **Option "Se souvenir de moi"**
- ✅ **Redirection automatique** vers `/dashboard`
- ✅ **Mode hybride** Mock/API réelle
- ✅ **Indication visuelle** du mode actuel
- ✅ **Comptes de test** pré-configurés

## 🔄 Flux d'Authentification

1. **Saisie des identifiants** dans le formulaire
2. **Validation côté client** (format email, longueur mot de passe)
3. **Appel API** (mock ou réelle selon configuration)
4. **Vérification des identifiants**
5. **Génération du token JWT** (en mode réel)
6. **Stockage du token** (localStorage ou sessionStorage)
7. **Redirection vers dashboard** avec données utilisateur

## 🔧 Configuration Avancée

Pour créer de nouveaux comptes admin, vous pouvez :

1. **Via l'API Register** (si endpoint ouvert)
2. **Directement en base** de données
3. **Modifier `SeedData.cs`** pour ajouter d'autres comptes par défaut

## 🐛 Troubleshooting

### Erreur "Échec de la connexion"
- Vérifiez que le backend est démarré (mode API réelle)
- Vérifiez l'URL de l'API dans `app-config.ts`
- Passez en mode mock pour tester l'interface

### Token non stocké
- Vérifiez la console pour les erreurs
- Assurez-vous que la réponse contient `result.token`

### Redirection ne fonctionne pas
- Vérifiez que `/dashboard` existe et est accessible
- Contrôlez les erreurs dans la console navigateur 