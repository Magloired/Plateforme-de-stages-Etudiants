import { APP_CONFIG } from "@/config/app-config"
import type {
  UserDTO,
  Role,
  EntrepriseReadDTO,
  EntrepriseCreateDTO,
  EntrepriseUpdateDTO,
  OffreStageReadDTO,
  OffreStageCreateDTO,
  OffreStageUpdateDTO,
  CandidatureReadDTO,
  CandidatureCreateDTO,
  CandidatureUpdateDTO,
  StatutCandidature,
  ValidationReadDTO,
  ValidationCreateDTO,
  ValidationUpdateDTO,
} from "@/types"
import type { DashboardStats } from "@/types/dashboard"

// Types pour l'authentification
interface LoginDTO {
  email: string
  password: string
}

interface RegisterDTO {
  nom: string
  prenom: string
  email: string
  password: string
  role: Role
  filiere?: string
  niveauEtude?: string
  telephone?: string
}

interface AuthResultDTO {
  token: string
  user: UserDTO
  message: string
}

// Service API centralisé
export const apiService = {
  // Routes pour l'authentification
  auth: {
    login: async (credentials: LoginDTO): Promise<AuthResultDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
      if (!response.ok) {
        throw new Error("Échec de la connexion")
      }
      return response.json()
    },

    register: async (userData: RegisterDTO): Promise<AuthResultDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      if (!response.ok) {
        throw new Error("Échec de l'inscription")
      }
      return response.json()
    },
  },

  // Routes pour les utilisateurs
  users: {
    getAll: async (): Promise<UserDTO[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/User`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des utilisateurs")
      }
      return response.json()
    },

    getById: async (id: number): Promise<UserDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/User/${id}`)
      if (!response.ok) {
        throw new Error("Utilisateur non trouvé")
      }
      return response.json()
    },

    create: async (user: UserDTO): Promise<UserDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/User`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      if (!response.ok) {
        throw new Error("Échec de la création de l'utilisateur")
      }
      return response.json()
    },

    update: async (id: number, user: Partial<UserDTO>): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/User/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de l'utilisateur")
      }
    },

    delete: async (id: number): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/User/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Échec de la suppression de l'utilisateur")
      }
    },
  },

  // Routes pour les entreprises
  entreprises: {
    getAll: async (): Promise<EntrepriseReadDTO[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Entreprise`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des entreprises")
      }
      return response.json()
    },

    getById: async (id: number): Promise<EntrepriseReadDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Entreprise/${id}`)
      if (!response.ok) {
        throw new Error("Entreprise non trouvée")
      }
      return response.json()
    },

    create: async (entreprise: EntrepriseCreateDTO): Promise<EntrepriseReadDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Entreprise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entreprise),
      })
      if (!response.ok) {
        throw new Error("Échec de la création de l'entreprise")
      }
      return response.json()
    },

    update: async (id: number, entreprise: EntrepriseUpdateDTO): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Entreprise/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entreprise),
      })
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de l'entreprise")
      }
    },

    delete: async (id: number): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Entreprise/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Échec de la suppression de l'entreprise")
      }
    },
  },

  // Routes pour les offres de stage
  offresDeStage: {
    getAll: async (): Promise<OffreStageReadDTO[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des offres")
      }
      return response.json()
    },

    getById: async (id: number): Promise<OffreStageReadDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres/${id}`)
      if (!response.ok) {
        throw new Error("Offre non trouvée")
      }
      return response.json()
    },

    create: async (offre: OffreStageCreateDTO): Promise<OffreStageReadDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offre),
      })
      if (!response.ok) {
        console.error("Erreur API:", response.status, response.statusText)
        
        // Essayer de récupérer les détails de l'erreur
        try {
          const errorDetails = await response.json()
          console.error("Détails de l'erreur:", errorDetails)
          throw new Error(errorDetails.message || errorDetails.details || `Échec de la création de l'offre (${response.status})`)
        } catch (parseError) {
          console.error("Impossible de parser l'erreur:", parseError)
          throw new Error(`Échec de la création de l'offre (${response.status}: ${response.statusText})`)
        }
      }
      return response.json()
    },

    update: async (id: number, offre: OffreStageUpdateDTO): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offre),
      })
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de l'offre")
      }
    },

    delete: async (id: number): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Échec de la suppression de l'offre")
      }
    },

    getCount: async (): Promise<number> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres/count`)
      if (!response.ok) {
        throw new Error("Échec de la récupération du nombre d'offres")
      }
      return response.json()
    },
  },

  // Routes pour les candidatures
  candidatures: {
    getAll: async (): Promise<CandidatureReadDTO[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Candidature`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des candidatures")
      }
      return response.json()
    },

    getById: async (id: number): Promise<CandidatureReadDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Candidature/${id}`)
      if (!response.ok) {
        throw new Error("Candidature non trouvée")
      }
      return response.json()
    },

    create: async (candidature: CandidatureCreateDTO): Promise<CandidatureReadDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Candidature`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidature),
      })
      if (!response.ok) {
        throw new Error("Échec de la création de la candidature")
      }
      return response.json()
    },

    update: async (id: number, candidature: CandidatureUpdateDTO): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Candidature/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidature),
      })
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de la candidature")
      }
    },

    delete: async (id: number): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Candidature/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Échec de la suppression de la candidature")
      }
    },
  },

  // Routes pour les validations
  validations: {
    getAll: async (): Promise<ValidationReadDTO[]> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Validation`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des validations")
      }
      return response.json()
    },

    getById: async (id: number): Promise<ValidationReadDTO> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Validation/${id}`)
      if (!response.ok) {
        throw new Error("Validation non trouvée")
      }
      return response.json()
    },

    create: async (validation: ValidationCreateDTO): Promise<ValidationReadDTO> => {
      console.log("Envoi de validation:", validation)
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Validation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation),
      })
      if (!response.ok) {
        console.error("Erreur API Validation:", response.status, response.statusText)
        
        // Essayer de récupérer les détails de l'erreur
        try {
          const errorDetails = await response.json()
          console.error("Détails de l'erreur:", errorDetails)
          throw new Error(errorDetails.message || errorDetails.details || `Échec de la création de la validation (${response.status})`)
        } catch (parseError) {
          console.error("Impossible de parser l'erreur:", parseError)
          throw new Error(`Échec de la création de la validation (${response.status}: ${response.statusText})`)
        }
      }
      return response.json()
    },

    update: async (id: number, validation: ValidationUpdateDTO): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Validation/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation),
      })
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de la validation")
      }
    },

    delete: async (id: number): Promise<void> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Validation/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Échec de la suppression de la validation")
      }
    },
  },

  // Routes pour le dashboard
  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/HomePage`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des statistiques")
      }
      return response.json()
    },
  },
} 