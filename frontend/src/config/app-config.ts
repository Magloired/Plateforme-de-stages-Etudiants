/**
 * Configuration centralisée de l'application
 * Gère les paramètres d'environnement et les constantes globales
 */

// Configuration de l'application
export const APP_CONFIG = {
  // Mode de développement
  IS_MOCK_MODE: process.env.NEXT_PUBLIC_USE_MOCK === "true",

  // URL de l'API
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5196/api",

  // Configuration des timeouts
  API_TIMEOUT: 5000,

  // Configuration du cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

  // Configuration React Query
  QUERY_STALE_TIME: 2 * 60 * 1000, // 2 minutes
  QUERY_CACHE_TIME: 5 * 60 * 1000, // 5 minutes

  // Configuration de retry
  QUERY_RETRY_COUNT: 3,
  QUERY_RETRY_DELAY: 1000,
} as const

// Type pour la configuration
export type AppConfig = typeof APP_CONFIG

// Clés de requête pour React Query
export const QUERY_KEYS = {
  USERS: ["users"] as const,
  USER: (id: number) => ["users", id] as const,
  USER_CANDIDATURES: (userId: number) => ["users", userId, "candidatures"] as const,
} as const

// Types pour les clés de requête
export type QueryKeys = typeof QUERY_KEYS
