/**
 * Types pour la gestion des exports de données
 * Définit les interfaces et types utilisés pour l'export des données utilisateur
 */

import type { User } from "./user"

/** Options de configuration pour l'export */
export interface ExportOptions {
  /** Données à exporter (déjà filtrées) */
  data: User[]
  /** Colonnes visibles dans le tableau */
  visibleColumns: string[]
  /** Nom du fichier (sans extension) */
  filename?: string
  /** Titre du document pour PDF */
  title?: string
}

/** Configuration des colonnes pour l'export */
export interface ColumnConfig {
  /** Clé de la colonne dans les données */
  key: keyof User | "statut" | "candidaturesCount"
  /** En-tête à afficher */
  header: string
  /** Largeur pour PDF (optionnel) */
  width?: number
  /** Fonction de formatage personnalisée */
  formatter?: (value: any, user: User) => string
}

/** Types d'export supportés */
export type ExportType = "csv" | "json" | "pdf" | "print"

/** Résultat d'une opération d'export */
export interface ExportResult {
  success: boolean
  message?: string
  error?: string
}
