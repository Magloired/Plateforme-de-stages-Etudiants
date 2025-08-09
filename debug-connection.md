# 🔧 Guide de diagnostic - Connexion Admin

## 📋 Problème identifié
Erreur lors de la connexion admin avec :
- **Email**: admin@stages.com  
- **Password**: Admin123!
- **Erreur**: `Fetch failed loading: POST "http://localhost:5196/api/Auth/login"`

## ✅ Corrections appliquées

### 1. **Erreurs TypeScript corrigées** 
- ❌ `mockApiService.auth?.login` → ✅ Retour direct des données mock
- ❌ Type `DashboardStats` incomplet → ✅ Ajout des propriétés manquantes
- ❌ Mode mock contre-intuitif → ✅ Logique corrigée

### 2. **Configuration mise à jour**
```typescript
// Avant (incorrect)
IS_MOCK_MODE: process.env.NEXT_PUBLIC_USE_MOCK === "false" || false

// Après (correct)  
IS_MOCK_MODE: process.env.NEXT_PUBLIC_USE_MOCK === "true" || false
```

## 🔧 Étapes de résolution

### Étape 1: Vérifier le backend
```bash
cd backend
dotnet run
```
**Attendu**: Serveur démarré sur `http://localhost:5196`

### Étape 2: Tester l'endpoint auth
```bash
curl -X POST http://localhost:5196/api/Auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@stages.com","password":"Admin123!"}'
```

### Étape 3: Vérifier la base de données
L'admin doit être créé automatiquement via `SeedData.cs`:
```csharp
Email = "admin@stages.com"
Password = "Admin123!" (hashé)
Role = Role.Admin
```

### Étape 4: Mode de fallback (Mock)
Si le backend ne fonctionne pas, utiliser le mode mock:
```bash
# Dans frontend/.env.local
NEXT_PUBLIC_USE_MOCK=true
```

## 🚀 Solutions de contournement

### Option A: Mode Mock activé
```typescript
// Configuration automatique en mode mock
IS_MOCK_MODE: true
// Données admin mock disponibles
```

### Option B: Création manuelle admin
```sql
-- Exécuter cette requête si l'admin n'existe pas
INSERT INTO Users (Nom, Prenom, Email, Password, Role, IsActif, DateInscription)
VALUES (
    'Admin', 
    'Super', 
    'admin@stages.com', 
    -- Hash de 'Admin123!' (à adapter selon votre système de hash)
    'hashed_password_here', 
    'Admin', 
    1, 
    GETDATE()
);
```

### Option C: Port différent
Si le port 5196 est occupé:
```bash
# Démarrer sur un autre port
dotnet run --urls="http://localhost:5197"

# Puis mettre à jour la config
NEXT_PUBLIC_API_URL=http://localhost:5197/api
```

## 📊 Tests de validation

### 1. Test API directe
```javascript
// Test dans la console du navigateur
fetch('http://localhost:5196/api/Auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@stages.com',
    password: 'Admin123!'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### 2. Test mode mock
```javascript
// Vérifier en mode mock dans la console
console.log('IS_MOCK_MODE:', APP_CONFIG.IS_MOCK_MODE)
```

## 🎯 Résultat attendu

Après correction, la connexion admin devrait :
1. ✅ Utiliser l'API réelle si le backend fonctionne
2. ✅ Fallback en mode mock si nécessaire  
3. ✅ Retourner un token et les données utilisateur
4. ✅ Rediriger vers le dashboard admin

## 📝 Notes importantes

- Les erreurs TypeScript sont maintenant corrigées
- Le mode mock fonctionne comme fallback
- Le SeedData crée automatiquement l'admin au démarrage
- Les logs dans la console aideront au diagnostic 