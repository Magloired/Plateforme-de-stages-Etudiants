# Architecture du Système d'Export

## Vue d'ensemble

Le système d'export a été conçu de manière modulaire pour faciliter la maintenance et l'extension. Il respecte les filtres appliqués et la visibilité des colonnes.

## Structure des fichiers

### Types (`types/export.ts`)
- `ExportOptions` : Configuration pour les exports
- `ColumnConfig` : Configuration des colonnes
- `ExportType` : Types d'export supportés
- `ExportResult` : Résultat des opérations

### Service (`services/export-service.ts`)
- `ExportService` : Classe principale gérant tous les exports
- Méthodes spécialisées pour chaque format
- Gestion des erreurs et validation
- Configuration des colonnes centralisée

### Hook (`hooks/use-export.ts`)
- `useExport` : Hook React pour la gestion d'état
- Gestion des états de chargement
- Interface simple pour les composants

### Composant (`components/export-buttons.tsx`)
- Interface utilisateur pour les exports
- Intégration avec le hook useExport
- Notifications utilisateur avec Sonner

## Fonctionnalités

### Formats supportés
- **CSV** : Avec BOM UTF-8 pour Excel, échappement correct
- **JSON** : Structure avec métadonnées
- **PDF** : Mise en page paysage optimisée
- **Print** : Impression directe avec styles

### Filtrage intelligent
- Respect des filtres de rôle
- Prise en compte de la visibilité des colonnes
- Formatage spécialisé par colonne

### Gestion d'erreurs
- Validation des données d'entrée
- Messages d'erreur explicites
- États de chargement

## Utilisation

\`\`\`typescript
// Dans un composant
const { exportData, isExporting } = useExport()

await exportData('csv', {
  data: filteredUsers,
  visibleColumns: ['nom', 'email', 'role'],
  filename: 'export-utilisateurs'
})
\`\`\`

## Extension

Pour ajouter un nouveau format :

1. Ajouter le type dans `ExportType`
2. Implémenter la méthode dans `ExportService`
3. Ajouter l'option dans `ExportButtons`
