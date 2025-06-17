import { APP_CONFIG } from "@/config/app-config"
import type { User } from "@/types/user"
import type { Entreprise } from "@/types/entreprise"
import type { OffreDeStage } from "@/types/offre-de-stage"
import type { Candidature, StatutCandidature } from "@/types/candidature"
import type { Validation } from "@/types/validation"
import type { DashboardStats } from "@/types/dashboard"

// Types pour les réponses API
interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Service API centralisé
export const apiService = {
  // Routes pour les utilisateurs
  users: {
    getAll: async (): Promise<User[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/users`)
      const data: ApiResponse<User[]> = await response.json()
      return data.data
    },

    getById: async (id: number): Promise<User> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/users/${id}`)
      const data: ApiResponse<User> = await response.json()
      return data.data
    },

    create: async (user: Omit<User, "id">): Promise<User> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      const data: ApiResponse<User> = await response.json()
      return data.data
    },

    update: async (id: number, user: Partial<User>): Promise<User> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      const data: ApiResponse<User> = await response.json()
      return data.data
    },

    delete: async (id: number): Promise<void> => {
      await fetch(`${APP_CONFIG.API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      })
    },
  },

  // Routes pour les entreprises
  entreprises: {
    getAll: async (): Promise<Entreprise[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/entreprises`)
      const data: ApiResponse<Entreprise[]> = await response.json()
      return data.data
    },

    getById: async (id: number): Promise<Entreprise> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/entreprises/${id}`)
      const data: ApiResponse<Entreprise> = await response.json()
      return data.data
    },

    create: async (entreprise: Omit<Entreprise, "id">): Promise<Entreprise> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/entreprises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entreprise),
      })
      const data: ApiResponse<Entreprise> = await response.json()
      return data.data
    },

    update: async (id: number, entreprise: Partial<Entreprise>): Promise<Entreprise> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/entreprises/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entreprise),
      })
      const data: ApiResponse<Entreprise> = await response.json()
      return data.data
    },

    delete: async (id: number): Promise<void> => {
      await fetch(`${APP_CONFIG.API_BASE_URL}/entreprises/${id}`, {
        method: "DELETE",
      })
    },
  },

  // Routes pour les offres de stage
  offresDeStage: {
    getAll: async (): Promise<OffreDeStage[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/offres-de-stage`)
      const data: ApiResponse<OffreDeStage[]> = await response.json()
      return data.data
    },

    getById: async (id: number): Promise<OffreDeStage> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/offres-de-stage/${id}`)
      const data: ApiResponse<OffreDeStage> = await response.json()
      return data.data
    },

    create: async (offre: Omit<OffreDeStage, "id">): Promise<OffreDeStage> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/offres-de-stage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offre),
      })
      const data: ApiResponse<OffreDeStage> = await response.json()
      return data.data
    },

    update: async (id: number, offre: Partial<OffreDeStage>): Promise<OffreDeStage> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/offres-de-stage/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offre),
      })
      const data: ApiResponse<OffreDeStage> = await response.json()
      return data.data
    },

    delete: async (id: number): Promise<void> => {
      await fetch(`${APP_CONFIG.API_BASE_URL}/offres-de-stage/${id}`, {
        method: "DELETE",
      })
    },
  },

  // Routes pour les candidatures
  candidatures: {
    getAll: async (): Promise<Candidature[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/candidatures`)
      const data: ApiResponse<Candidature[]> = await response.json()
      return data.data
    },

    getById: async (id: number): Promise<Candidature> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/candidatures/${id}`)
      const data: ApiResponse<Candidature> = await response.json()
      return data.data
    },

    create: async (candidature: Omit<Candidature, "id">): Promise<Candidature> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/candidatures`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidature),
      })
      const data: ApiResponse<Candidature> = await response.json()
      return data.data
    },

    update: async (id: number, candidature: Partial<Candidature>): Promise<Candidature> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/candidatures/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidature),
      })
      const data: ApiResponse<Candidature> = await response.json()
      return data.data
    },

    updateStatus: async (id: number, status: StatutCandidature): Promise<Candidature> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/candidatures/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const data: ApiResponse<Candidature> = await response.json()
      return data.data
    },

    delete: async (id: number): Promise<void> => {
      await fetch(`${APP_CONFIG.API_BASE_URL}/candidatures/${id}`, {
        method: "DELETE",
      })
    },
  },

  // Routes pour les validations
  validations: {
    getAll: async (): Promise<Validation[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/validations`)
      const data: ApiResponse<Validation[]> = await response.json()
      return data.data
    },

    getById: async (id: number): Promise<Validation> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/validations/${id}`)
      const data: ApiResponse<Validation> = await response.json()
      return data.data
    },

    create: async (validation: Omit<Validation, "id">): Promise<Validation> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/validations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation),
      })
      const data: ApiResponse<Validation> = await response.json()
      return data.data
    },

    update: async (id: number, validation: Partial<Validation>): Promise<Validation> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/validations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation),
      })
      const data: ApiResponse<Validation> = await response.json()
      return data.data
    },

    delete: async (id: number): Promise<void> => {
      await fetch(`${APP_CONFIG.API_BASE_URL}/validations/${id}`, {
        method: "DELETE",
      })
    },
  },

  // Routes pour le dashboard
  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/dashboard/stats`)
      const data: ApiResponse<DashboardStats> = await response.json()
      return data.data
    },

    getRecentActivities: async (): Promise<any[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/dashboard/activities`)
      const data: ApiResponse<any[]> = await response.json()
      return data.data
    },
  },
} 