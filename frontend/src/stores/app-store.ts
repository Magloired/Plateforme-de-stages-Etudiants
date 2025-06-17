/**
 * Store Zustand centralisé pour la gestion de l'état global de l'application
 */

import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { type User } from "@/types/user"
import { type Entreprise } from "@/types/entreprise"
import { type OffreDeStage } from "@/types/offre-de-stage"
import { type Candidature, StatutCandidature } from "@/types/candidature"
import { type Validation } from "@/types/validation"
import { APP_CONFIG } from "@/config/app-config"
import { mockUsers } from "@/data/mock-users"
import { mockEntreprises } from "@/data/mock-entreprises"
import { mockOffresDeStage } from "@/data/mock-offres-de-stage"
import { mockCandidatures } from "@/data/mock-candidatures"
import { mockValidations } from "@/data/mock-validations"
import { mockDashboardStats } from "@/data/mock-dashboard-stats"
import { apiService } from "@/services/api"

// Interface pour l'état global de l'application
interface AppState {
  // Configuration
  isMockMode: boolean
  isLoading: boolean
  error: string | null

  // UI State
  sidebarOpen: boolean
  theme: "light" | "dark" | "system"

  // User preferences
  tablePageSize: number
  tableColumns: string[]

  // Données
  users: User[]
  entreprises: Entreprise[]
  offresDeStage: OffreDeStage[]
  candidatures: Candidature[]
  validations: Validation[]
  dashboardStats: {
    totalCandidatures: number
    totalOffres: number
    totalEntreprises: number
    totalValidations: number
    candidaturesParStatut: Record<StatutCandidature, number>
    offresParVille: Record<string, number>
    offresParType: Record<string, number>
  }

  // Actions
  setMockMode: (isMock: boolean) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: "light" | "dark" | "system") => void
  setTablePageSize: (size: number) => void
  setTableColumns: (columns: string[]) => void
  reset: () => void
  setUsers: (users: User[]) => void
  setEntreprises: (entreprises: Entreprise[]) => void
  setOffresDeStage: (offres: OffreDeStage[]) => void
  setCandidatures: (candidatures: Candidature[]) => void
  setValidations: (validations: Validation[]) => void
  setDashboardStats: (stats: typeof mockDashboardStats) => void
  loadUsers: () => Promise<void>
  loadEntreprises: () => Promise<void>
  loadOffresDeStage: () => Promise<void>
  loadCandidatures: () => Promise<void>
  loadValidations: () => Promise<void>
  loadDashboardStats: () => Promise<void>
}

// État initial
const initialState = {
  isMockMode: APP_CONFIG.IS_MOCK_MODE,
  isLoading: false,
  error: null,
  sidebarOpen: true,
  theme: "system" as const,
  tablePageSize: 10,
  tableColumns: [
    "nom",
    "email",
    "role",
    "filiere",
    "niveauEtude",
    "telephone",
    "dateInscription",
    "isActif",
    "candidatures",
  ],
}

const initialDashboardStats = {
  totalCandidatures: 0,
  totalOffres: 0,
  totalEntreprises: 0,
  totalValidations: 0,
  candidaturesParStatut: {
    [StatutCandidature.EnAttente]: 0,
    [StatutCandidature.Acceptee]: 0,
    [StatutCandidature.EnCours]: 0,
    [StatutCandidature.Refusee]: 0,
    [StatutCandidature.Validee]: 0,
    [StatutCandidature.Annulee]: 0,
  },
  offresParVille: {},
  offresParType: {},
}

// Store principal de l'application
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // État initial avec les données mock si en mode mock
        users: APP_CONFIG.IS_MOCK_MODE ? mockUsers : [],
        entreprises: APP_CONFIG.IS_MOCK_MODE ? mockEntreprises : [],
        offresDeStage: APP_CONFIG.IS_MOCK_MODE ? mockOffresDeStage : [],
        candidatures: APP_CONFIG.IS_MOCK_MODE ? mockCandidatures : [],
        validations: APP_CONFIG.IS_MOCK_MODE ? mockValidations : [],
        dashboardStats: APP_CONFIG.IS_MOCK_MODE ? mockDashboardStats : initialDashboardStats,

        // Actions
        setMockMode: (isMock) => {
          set({ isMockMode: isMock }, false, "setMockMode")
        },

        setLoading: (loading) => {
          set({ isLoading: loading }, false, "setLoading")
        },

        setError: (error) => {
          set({ error }, false, "setError")
        },

        setSidebarOpen: (open) => {
          set({ sidebarOpen: open }, false, "setSidebarOpen")
        },

        setTheme: (theme) => {
          set({ theme }, false, "setTheme")
        },

        setTablePageSize: (size) => {
          set({ tablePageSize: size }, false, "setTablePageSize")
        },

        setTableColumns: (columns) => {
          set({ tableColumns: columns }, false, "setTableColumns")
        },

        reset: () => {
          set(initialState, false, "reset")
        },

        setUsers: (users) => set({ users }),
        setEntreprises: (entreprises) => set({ entreprises }),
        setOffresDeStage: (offres) => set({ offresDeStage: offres }),
        setCandidatures: (candidatures) => set({ candidatures }),
        setValidations: (validations) => set({ validations }),
        setDashboardStats: (stats) => set({ dashboardStats: stats }),

        // Actions pour charger les données
        loadUsers: async () => {
          const { isMockMode, setLoading, setError } = get()
          setLoading(true)
          try {
            if (isMockMode) {
              set({ users: mockUsers })
            } else {
              const data = await apiService.users.getAll()
              set({ users: data })
            }
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Erreur lors du chargement des utilisateurs')
          } finally {
            setLoading(false)
          }
        },

        loadEntreprises: async () => {
          const { isMockMode, setLoading, setError } = get()
          setLoading(true)
          try {
            if (isMockMode) {
              set({ entreprises: mockEntreprises })
            } else {
              const data = await apiService.entreprises.getAll()
              set({ entreprises: data })
            }
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Erreur lors du chargement des entreprises')
          } finally {
            setLoading(false)
          }
        },

        loadOffresDeStage: async () => {
          const { isMockMode, setLoading, setError } = get()
          setLoading(true)
          try {
            if (isMockMode) {
              set({ offresDeStage: mockOffresDeStage })
            } else {
              const data = await apiService.offresDeStage.getAll()
              set({ offresDeStage: data })
            }
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Erreur lors du chargement des offres de stage')
          } finally {
            setLoading(false)
          }
        },

        loadCandidatures: async () => {
          const { isMockMode, setLoading, setError } = get()
          setLoading(true)
          try {
            if (isMockMode) {
              set({ candidatures: mockCandidatures })
            } else {
              const data = await apiService.candidatures.getAll()
              set({ candidatures: data })
            }
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Erreur lors du chargement des candidatures')
          } finally {
            setLoading(false)
          }
        },

        loadValidations: async () => {
          const { isMockMode, setLoading, setError } = get()
          setLoading(true)
          try {
            if (isMockMode) {
              set({ validations: mockValidations })
            } else {
              const data = await apiService.validations.getAll()
              set({ validations: data })
            }
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Erreur lors du chargement des validations')
          } finally {
            setLoading(false)
          }
        },

        loadDashboardStats: async () => {
          const { isMockMode, setLoading, setError } = get()
          setLoading(true)
          try {
            if (isMockMode) {
              set({ dashboardStats: mockDashboardStats })
            } else {
              const data = await apiService.dashboard.getStats()
              set({ dashboardStats: data })
            }
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Erreur lors du chargement des statistiques')
          } finally {
            setLoading(false)
          }
        },
      }),
      {
        name: "app-store",
        partialize: (state) => ({
          isMockMode: state.isMockMode,
          theme: state.theme,
          tablePageSize: state.tablePageSize,
          tableColumns: state.tableColumns,
          sidebarOpen: state.sidebarOpen,
        }),
      },
    ),
    {
      name: "app-store",
    },
  ),
)

// Sélecteurs pour optimiser les re-renders
export const useIsMockMode = () => useAppStore((state) => state.isMockMode)
export const useIsLoading = () => useAppStore((state) => state.isLoading)
export const useError = () => useAppStore((state) => state.error)
export const useTheme = () => useAppStore((state) => state.theme)
export const useTablePreferences = () =>
  useAppStore((state) => ({
    pageSize: state.tablePageSize,
    columns: state.tableColumns,
  }))
