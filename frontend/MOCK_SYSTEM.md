# 🎭 Système de Mock Data

## 📋 Vue d'ensemble

Le système de mock permet de tester l'application frontend sans dépendre du backend. Il fournit des données réalistes et simule les délais réseau pour une expérience de développement fluide.

## 🚀 Activation du Mode Mock

### **Configuration Automatique**
Le mode mock est activé par défaut en développement. Vous pouvez le contrôler via :

```bash
# Activer le mode mock
NEXT_PUBLIC_USE_MOCK=true npm run dev

# Désactiver le mode mock
NEXT_PUBLIC_USE_MOCK=false npm run dev
```

### **Toggle Visuel**
En mode développement, un toggle apparaît en bas à droite pour basculer entre :
- 🗄️ **Mode Mock** : Données locales
- 🌐 **Mode Réel** : API backend

## 📊 Données Mock Disponibles

### **👥 Utilisateurs (5 entrées)**
```typescript
{
  id: 1,
  nom: "Dupont",
  prenom: "Jean",
  email: "jean.dupont@email.com",
  role: Role.Etudiant,
  // ... autres champs
}
```

### **🏢 Entreprises (4 entrées)**
```typescript
{
  id: 1,
  nom: "TechCorp",
  description: "Entreprise leader dans le développement...",
  specialite: Specialite.Developpement,
  // ... autres champs
}
```

### **💼 Offres de Stage (4 entrées)**
```typescript
{
  id: 1,
  titre: "Développeur Full Stack",
  description: "Développement d'applications web...",
  remuneration: 1200,
  // ... autres champs
}
```

### **📝 Candidatures (4 entrées)**
```typescript
{
  id: 1,
  userId: 1,
  nomCandidat: "Jean Dupont",
  statut: StatutCandidature.EnAttente,
  // ... autres champs
}
```

### **✅ Validations (4 entrées)**
```typescript
{
  id: 1,
  enseignantId: 2,
  nomEnseignant: "Sophie Martin",
  decision: DecisionValidation.Accepte,
  // ... autres champs
}
```

## 🔧 Fonctionnalités du Mock

### **⏱️ Simulation de Délais**
- **GET requests** : 500ms de délai
- **POST/PUT/DELETE** : 500ms de délai
- **Erreurs simulées** : 5-10% de probabilité

### **🔄 Opérations CRUD Complètes**
- ✅ **Create** : Ajoute de nouvelles entrées
- ✅ **Read** : Récupère les données existantes
- ✅ **Update** : Modifie les entrées existantes
- ✅ **Delete** : Supprime les entrées

### **🎯 Validation des Données**
- ✅ **Types TypeScript** : Correspondance parfaite
- ✅ **Relations** : Entreprises liées aux offres
- ✅ **Cohérence** : IDs et références valides

## 📁 Structure des Fichiers

```
frontend/src/services/
├── mock-data.ts          # Données mock et service mock
├── api-hybrid.ts         # Service hybride (mock + réel)
└── api.ts               # Service API original

frontend/src/components/dev-tools/
└── mock-mode-toggle.tsx  # Toggle visuel

frontend/src/config/
└── app-config.ts        # Configuration du mode
```

## 🎮 Utilisation

### **1. Import du Service Hybride**
```typescript
import { apiService } from '@/services/api-hybrid'

// Utilisation identique au service réel
const users = await apiService.users.getAll()
```

### **2. Basculement Automatique**
Le service détecte automatiquement le mode :
```typescript
if (APP_CONFIG.IS_MOCK_MODE) {
  return mockApiService.users.getAll()
} else {
  return fetch('/api/User').then(r => r.json())
}
```

### **3. Toggle Visuel**
Le composant `MockModeToggle` apparaît en développement :
- Position : Bas à droite
- Affichage : Mode développement uniquement
- Fonction : Basculement en temps réel

## 🧪 Tests et Développement

### **Avantages du Mode Mock**
- ✅ **Développement rapide** : Pas de dépendance backend
- ✅ **Tests isolés** : Données prévisibles
- ✅ **Performance** : Pas de latence réseau
- ✅ **Fiabilité** : Pas d'erreurs de connexion

### **Scénarios d'Utilisation**
1. **Développement UI** : Tester les composants
2. **Tests d'intégration** : Vérifier les flux
3. **Démonstrations** : Présenter l'application
4. **Debugging** : Isoler les problèmes frontend

## 🔄 Migration vers l'API Réelle

### **Étapes de Migration**
1. **Désactiver le mock** : `NEXT_PUBLIC_USE_MOCK=false`
2. **Vérifier la connectivité** : Backend accessible
3. **Tester les endpoints** : Validation des réponses
4. **Ajuster les types** : Si nécessaire

### **Vérifications**
- ✅ Backend démarré sur le bon port
- ✅ Endpoints accessibles
- ✅ Types correspondants
- ✅ Gestion d'erreurs

## 🛠️ Personnalisation

### **Ajouter des Données Mock**
```typescript
// Dans mock-data.ts
export const mockUsers: UserDTO[] = [
  // Vos données personnalisées
  {
    id: 999,
    nom: "Votre Nom",
    // ... autres champs
  }
]
```

### **Modifier les Délais**
```typescript
const simulateNetworkDelay = (ms: number = 1000) => // 1 seconde
```

### **Ajuster les Erreurs**
```typescript
const simulateError = (probability: number = 0.2) => // 20% d'erreurs
```

## 📈 Statistiques Mock

Le dashboard affiche des statistiques réalistes :
- **Utilisateurs** : 5 (2 Étudiants, 1 Enseignant, 1 Admin, 1 Responsable)
- **Entreprises** : 4 (par spécialité)
- **Offres** : 4 (3 actives, 1 inactive)
- **Candidatures** : 4 (différents statuts)
- **Validations** : 4 (différentes décisions)

## 🎯 Bonnes Pratiques

1. **Utiliser le mode mock** pour le développement UI
2. **Tester avec l'API réelle** avant la production
3. **Maintenir la cohérence** des données mock
4. **Documenter les changements** dans les types
5. **Valider les relations** entre entités

## 🚨 Limitations

- **Pas de persistance** : Les données se réinitialisent
- **Pas de validation backend** : Logique métier limitée
- **Pas d'authentification réelle** : Tokens simulés
- **Pas de fichiers** : Uploads simulés

Le système de mock facilite grandement le développement frontend tout en permettant une transition fluide vers l'API réelle ! 🚀 