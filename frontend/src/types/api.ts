// Type générique pour les réponses API
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
  timestamp: string
}

// Type pour les réponses paginées
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message?: string
  success: boolean
  timestamp: string
}

// Type pour les erreurs API
export interface ApiError {
  message: string
  code?: string
  details?: Record<string, any>
  timestamp: string
}

// Types pour les opérations CRUD sur les utilisateurs
export interface CreateUserRequest {
  nom: string
  prenom: string
  email: string
  role: string
  filiere: string
  niveauEtude: string
  telephone: string
  avatar_url?: string
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number
  isActif?: boolean
}

export interface DeleteUserRequest {
  id: number
}

export interface DeleteMultipleUsersRequest {
  ids: number[]
}

// Types pour les filtres et la recherche
export interface UserFilters {
  search?: string
  role?: string[]
  filiere?: string[]
  isActif?: boolean
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// Type pour les statistiques utilisateur
export interface UserStats {
  total: number
  byRole: Record<string, number>
  byFiliere: Record<string, number>
  active: number
  inactive: number
}
