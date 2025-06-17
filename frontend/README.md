# Guide d'Utilisation des Données Mock et du Store

## Documentation Associée

- [Guide du Dashboard Admin](/frontend/src/app/(admin)/dashboard/README.md) - Documentation des pages administratives
- [Guide des Composants](/frontend/src/components/README.md) - Documentation des composants réutilisables
- [Guide des Types](/frontend/src/types/README.md) - Documentation des types et interfaces
- [Guide des Services](/frontend/src/services/README.md) - Documentation des services API

## Vue d'ensemble

Ce guide explique comment utiliser les données mock et le store Zustand dans l'application de gestion de stages. Il couvre la structure des données, l'utilisation du store, et la transition vers l'API.

## Structure des Données Mock

Les données mock sont organisées dans des fichiers séparés pour une meilleure maintenabilité :

```
frontend/src/data/
├── mock-users.ts           # Données des utilisateurs
├── mock-entreprises.ts     # Données des entreprises
├── mock-offres-de-stage.ts # Données des offres de stage
├── mock-candidatures.ts    # Données des candidatures
├── mock-validations.ts     # Données des validations
└── mock-dashboard-stats.ts # Statistiques du dashboard
```

## Store Zustand

Le store central (`app-store.ts`) gère l'état global de l'application avec les fonctionnalités suivantes :

### 1. Configuration

```typescript
// Configuration dans .env.local
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 2. Structure du Store

```typescript
interface AppState {
  // Configuration
  isMockMode: boolean
  isLoading: boolean
  error: string | null

  // Données
  users: User[]
  entreprises: Entreprise[]
  offresDeStage: OffreDeStage[]
  candidatures: Candidature[]
  validations: Validation[]
  dashboardStats: DashboardStats

  // Actions de chargement
  loadUsers: () => Promise<void>
  loadEntreprises: () => Promise<void>
  loadOffresDeStage: () => Promise<void>
  loadCandidatures: () => Promise<void>
  loadValidations: () => Promise<void>
  loadDashboardStats: () => Promise<void>

  // Actions de mise à jour
  setUsers: (users: User[]) => void
  setEntreprises: (entreprises: Entreprise[]) => void
  // ... autres setters
}
```

### 3. Utilisation dans les Composants

#### Exemple avec la Page des Candidatures

```typescript
"use client"

import { useEffect } from "react"
import { useAppStore } from "@/stores/app-store"
import { CandidatureTable } from "@/components/candidature-table/candidature-table"
import { Toaster } from "sonner"

export default function CandidaturesPage() {
  const { 
    loadCandidatures, 
    candidatures, 
    isLoading, 
    error 
  } = useAppStore()

  useEffect(() => {
    loadCandidatures()
  }, [])

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des Candidatures
          </h1>
          <p className="text-muted-foreground">
            Gérez les demandes de stages et suivez leur progression
          </p>
        </div>

        <CandidatureTable 
          data={candidatures} 
          onDataChange={(newData) => {
            // Mise à jour via le store
            useAppStore.getState().setCandidatures(newData)
          }} 
        />
      </div>

      <Toaster position="top-right" />
    </div>
  )
}
```

### 4. Service API

Le service API (`services/api.ts`) centralise tous les appels API :

```typescript
import { APP_CONFIG } from "@/config/app-config"

export const apiService = {
  users: {
    getAll: async () => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/users`)
      return response.json()
    },
    // ... autres méthodes
  },
  candidatures: {
    getAll: async () => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/candidatures`)
      return response.json()
    },
    // ... autres méthodes
  },
  // ... autres services
}
```

## Bonnes Pratiques

1. **Gestion des États de Chargement**
   ```typescript
   const { isLoading, error } = useAppStore()
   if (isLoading) return <LoadingSpinner />
   if (error) return <ErrorMessage message={error} />
   ```

2. **Optimisation des Performances**
   ```typescript
   // Utiliser des sélecteurs pour éviter les re-rendus inutiles
   const users = useAppStore(state => state.users)
   const loadUsers = useAppStore(state => state.loadUsers)
   ```

3. **Gestion des Erreurs**
   ```typescript
   try {
     await loadUsers()
   } catch (error) {
     console.error('Erreur lors du chargement:', error)
     // Le store gère automatiquement l'état d'erreur
   }
   ```

4. **Transition Mock vers API**
   - En développement : `NEXT_PUBLIC_USE_MOCK=true`
   - En production : `NEXT_PUBLIC_USE_MOCK=false`

## Relations entre les Données

Les données mock sont liées entre elles pour simuler des relations réelles :

- Une candidature est liée à :
  - Un étudiant (User)
  - Une offre de stage (OffreDeStage)
  - Une entreprise (Entreprise)
  - Des validations (Validation)

## Mise à Jour des Données Mock

Pour mettre à jour les données mock :

1. Modifier le fichier correspondant dans `frontend/src/data/`
2. S'assurer que les relations entre les données sont cohérentes
3. Mettre à jour les types si nécessaire dans `frontend/src/types/`

## Exemple Complet : Page de Dashboard

```typescript
"use client"

import { useEffect } from "react"
import { useAppStore } from "@/stores/app-store"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { CandidatureTable } from "@/components/candidature-table/candidature-table"

export default function DashboardPage() {
  const {
    loadDashboardStats,
    loadCandidatures,
    dashboardStats,
    candidatures,
    isLoading,
    error
  } = useAppStore()

  useEffect(() => {
    // Charger toutes les données nécessaires
    Promise.all([
      loadDashboardStats(),
      loadCandidatures()
    ])
  }, [])

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div className="container mx-auto py-8">
      <DashboardStats stats={dashboardStats} />
      <CandidatureTable 
        data={candidatures} 
        onDataChange={useAppStore.getState().setCandidatures} 
      />
    </div>
  )
}
``` 
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
