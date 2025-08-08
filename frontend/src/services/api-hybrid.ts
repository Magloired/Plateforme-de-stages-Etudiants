import { APP_CONFIG } from "@/config/app-config"
import { mockApiService } from "./mock-data"
import {
  Role,
  type UserDTO,
  type EntrepriseReadDTO,
  type EntrepriseCreateDTO,
  type EntrepriseUpdateDTO,
  type OffreStageReadDTO,
  type OffreStageCreateDTO,
  type OffreStageUpdateDTO,
  type CandidatureReadDTO,
  type CandidatureCreateDTO,
  type CandidatureUpdateDTO,
  type StatutCandidature,
  type ValidationReadDTO,
  type ValidationCreateDTO,
  type ValidationUpdateDTO,
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

// Service API hybride qui bascule entre mock et réel
export const apiService = {
  // Routes pour l'authentification
  auth: {
    login: async (credentials: LoginDTO): Promise<AuthResultDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        // Vérification des identifiants en mode mock - uniquement compte admin principal
        if (credentials.email !== "admin@stages.com" || credentials.password !== "Admin123!") {
          throw new Error("Email ou mot de passe incorrect");
        }

        return mockApiService.auth?.login?.(credentials) || {
          token: "mock-token-123",
          user: {
            id: 1,
            nom: "Admin",
            prenom: "Super",
            email: credentials.email,
            role: Role.Admin,
            isActif: true,
            dateInscription: new Date().toISOString(),
            filiere: "Informatique",
            niveauEtude: "Master",
            telephone: "0123456789",
            specialite: "Developpement",
          },
          message: "Connexion réussie (mode mock)"
        }
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return {
          token: "mock-token-456",
          user: {
            id: Math.floor(Math.random() * 1000),
            nom: userData.nom,
            prenom: userData.prenom,
            email: userData.email,
            role: userData.role,
            isActif: true,
            dateInscription: new Date().toISOString(),
            filiere: userData.filiere,
            niveauEtude: userData.niveauEtude,
            telephone: userData.telephone,
            specialite: "Developpement",
          },
          message: "Inscription réussie (mode mock)"
        }
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.users.getAll()
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/User`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des utilisateurs")
      }
      return response.json()
    },

    getById: async (id: number): Promise<UserDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.users.getById(id)
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/User/${id}`)
      if (!response.ok) {
        throw new Error("Utilisateur non trouvé")
      }
      return response.json()
    },

    create: async (user: UserDTO): Promise<UserDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.users.create(user)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.users.update(id, user)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.users.delete(id)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.entreprises.getAll()
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Entreprise`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des entreprises")
      }
      return response.json()
    },

    getById: async (id: number): Promise<EntrepriseReadDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.entreprises.getById(id)
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Entreprise/${id}`)
      if (!response.ok) {
        throw new Error("Entreprise non trouvée")
      }
      return response.json()
    },

    create: async (entreprise: EntrepriseCreateDTO): Promise<EntrepriseReadDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.entreprises.create(entreprise)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.entreprises.update(id, entreprise)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.entreprises.delete(id)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.offresDeStage.getAll()
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des offres")
      }
      return response.json()
    },

    getById: async (id: number): Promise<OffreStageReadDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.offresDeStage.getById(id)
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres/${id}`)
      if (!response.ok) {
        throw new Error("Offre non trouvée")
      }
      return response.json()
    },

    create: async (offre: OffreStageCreateDTO): Promise<OffreStageReadDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.offresDeStage.create(offre)
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offre),
      })
      if (!response.ok) {
        throw new Error("Échec de la création de l'offre")
      }
      return response.json()
    },

    update: async (id: number, offre: OffreStageUpdateDTO): Promise<void> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.offresDeStage.update(id, offre)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.offresDeStage.delete(id)
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Offres/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Échec de la suppression de l'offre")
      }
    },

    getCount: async (): Promise<number> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.offresDeStage.getCount()
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.candidatures.getAll()
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Candidature`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des candidatures")
      }
      return response.json()
    },

    getById: async (id: number): Promise<CandidatureReadDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.candidatures.getById(id)
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Candidature/${id}`)
      if (!response.ok) {
        throw new Error("Candidature non trouvée")
      }
      return response.json()
    },

    create: async (candidature: CandidatureCreateDTO): Promise<CandidatureReadDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.candidatures.create(candidature)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.candidatures.update(id, candidature)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.candidatures.delete(id)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.validations.getAll()
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Validation`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des validations")
      }
      return response.json()
    },

    getById: async (id: number): Promise<ValidationReadDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.validations.getById(id)
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Validation/${id}`)
      if (!response.ok) {
        throw new Error("Validation non trouvée")
      }
      return response.json()
    },

    create: async (validation: ValidationCreateDTO): Promise<ValidationReadDTO> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.validations.create(validation)
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/Validation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation),
      })
      if (!response.ok) {
        throw new Error("Échec de la création de la validation")
      }
      return response.json()
    },

    update: async (id: number, validation: ValidationUpdateDTO): Promise<void> => {
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.validations.update(id, validation)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.validations.delete(id)
      }

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
      if (APP_CONFIG.IS_MOCK_MODE) {
        return mockApiService.dashboard.getStats()
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/HomePage`)
      if (!response.ok) {
        throw new Error("Échec de la récupération des statistiques")
      }
      return response.json()
    },
  },
} 