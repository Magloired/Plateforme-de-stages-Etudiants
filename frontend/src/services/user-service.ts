/**
 * Service pour la gestion des utilisateurs
 * Gère les appels API et les données mock selon la configuration
 */

import { APP_CONFIG } from "@/config/app-config"
import { apiClient } from "./api-client"
import { mockUsers } from "@/data/mock-users"
import type {
  User,
  ApiResponse,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  DeleteMultipleUsersRequest,
  UserFilters,
  UserStats,
} from "@/types"

class UserService {
  /**
   * Récupère tous les utilisateurs
   */
  async getUsers(filters?: UserFilters): Promise<User[]> {
    if (APP_CONFIG.IS_MOCK_MODE) {
      return this.getMockUsers(filters)
    }

    const queryParams = new URLSearchParams()
    if (filters?.search) queryParams.append("search", filters.search)
    if (filters?.role?.length) queryParams.append("role", filters.role.join(","))
    if (filters?.filiere?.length) queryParams.append("filiere", filters.filiere.join(","))
    if (filters?.isActif !== undefined) queryParams.append("isActif", filters.isActif.toString())
    if (filters?.page) queryParams.append("page", filters.page.toString())
    if (filters?.limit) queryParams.append("limit", filters.limit.toString())
    if (filters?.sortBy) queryParams.append("sortBy", filters.sortBy)
    if (filters?.sortOrder) queryParams.append("sortOrder", filters.sortOrder)

    const endpoint = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    const response = await apiClient.get<ApiResponse<User[]>>(endpoint)

    return response.data
  }

  /**
   * Récupère un utilisateur par ID
   */
  async getUserById(id: number): Promise<User> {
    if (APP_CONFIG.IS_MOCK_MODE) {
      const user = mockUsers.find((u) => u.id === id)
      if (!user) {
        throw new Error(`Utilisateur avec l'ID ${id} non trouvé`)
      }
      return user
    }

    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
    return response.data
  }

  /**
   * Crée un nouvel utilisateur
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    if (APP_CONFIG.IS_MOCK_MODE) {
      const newUser: User = {
        id: Math.max(...mockUsers.map((u) => u.id)) + 1,
        ...userData,
        dateInscription: new Date().toISOString().split("T")[0],
        isActif: true,
        candidatures: [],
        role: userData.role as any,
      }
      mockUsers.push(newUser)
      return newUser
    }

    const response = await apiClient.post<ApiResponse<User>>("/users", userData)
    return response.data
  }

  /**
   * Met à jour un utilisateur
   */
  async updateUser(userData: UpdateUserRequest): Promise<User> {
    if (APP_CONFIG.IS_MOCK_MODE) {
      const index = mockUsers.findIndex((u) => u.id === userData.id)
      if (index === -1) {
        throw new Error(`Utilisateur avec l'ID ${userData.id} non trouvé`)
      }

      mockUsers[index] = { ...mockUsers[index], ...userData }
      return mockUsers[index]
    }

    const response = await apiClient.put<ApiResponse<User>>(`/users/${userData.id}`, userData)
    return response.data
  }

  /**
   * Supprime un utilisateur
   */
  async deleteUser(request: DeleteUserRequest): Promise<void> {
    if (APP_CONFIG.IS_MOCK_MODE) {
      const index = mockUsers.findIndex((u) => u.id === request.id)
      if (index === -1) {
        throw new Error(`Utilisateur avec l'ID ${request.id} non trouvé`)
      }
      mockUsers.splice(index, 1)
      return
    }

    await apiClient.delete<ApiResponse<void>>(`/users/${request.id}`)
  }

  /**
   * Supprime plusieurs utilisateurs
   */
  async deleteMultipleUsers(request: DeleteMultipleUsersRequest): Promise<void> {
    if (APP_CONFIG.IS_MOCK_MODE) {
      request.ids.forEach((id) => {
        const index = mockUsers.findIndex((u) => u.id === id)
        if (index !== -1) {
          mockUsers.splice(index, 1)
        }
      })
      return
    }

    await apiClient.delete<ApiResponse<void>>("/users/bulk", request)
  }

  /**
   * Récupère les statistiques des utilisateurs
   */
  async getUserStats(): Promise<UserStats> {
    if (APP_CONFIG.IS_MOCK_MODE) {
      return this.getMockUserStats()
    }

    const response = await apiClient.get<ApiResponse<UserStats>>("/users/stats")
    return response.data
  }

  /**
   * Méthodes privées pour les données mock
   */
  private getMockUsers(filters?: UserFilters): User[] {
    let filteredUsers = [...mockUsers]

    // Filtrage par recherche
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredUsers = filteredUsers.filter((user) =>
        `${user.nom} ${user.prenom} ${user.email}`.toLowerCase().includes(searchTerm),
      )
    }

    // Filtrage par rôle
    if (filters?.role?.length) {
      filteredUsers = filteredUsers.filter((user) => filters.role!.includes(user.role))
    }

    // Filtrage par filière
    if (filters?.filiere?.length) {
      filteredUsers = filteredUsers.filter((user) => filters.filiere!.includes(user.filiere))
    }

    // Filtrage par statut
    if (filters?.isActif !== undefined) {
      filteredUsers = filteredUsers.filter((user) => user.isActif === filters.isActif)
    }

    // Tri
    if (filters?.sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof User]
        const bValue = b[filters.sortBy as keyof User]

        if (filters.sortOrder === "desc") {
          return aValue < bValue ? 1 : -1
        }
        return aValue > bValue ? 1 : -1
      })
    }

    // Pagination
    if (filters?.page && filters?.limit) {
      const start = (filters.page - 1) * filters.limit
      const end = start + filters.limit
      filteredUsers = filteredUsers.slice(start, end)
    }

    return filteredUsers
  }

  private getMockUserStats(): UserStats {
    const byRole = mockUsers.reduce(
      (acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const byFiliere = mockUsers.reduce(
      (acc, user) => {
        acc[user.filiere] = (acc[user.filiere] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      total: mockUsers.length,
      byRole,
      byFiliere,
      active: mockUsers.filter((u) => u.isActif).length,
      inactive: mockUsers.filter((u) => !u.isActif).length,
    }
  }
}

// Instance singleton du service utilisateur
export const userService = new UserService()
