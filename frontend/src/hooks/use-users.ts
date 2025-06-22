"use client"

/**
 * Hooks React Query pour la gestion des utilisateurs
 * Intègre le store Zustand pour basculer entre mock et API
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { APP_CONFIG, QUERY_KEYS } from "@/config/app-config"
import { userService } from "@/services/user-service"
import { useAppStore } from "@/stores/app-store"
import type {
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  DeleteMultipleUsersRequest,
  UserFilters,
} from "@/types"

/**
 * Hook pour récupérer tous les utilisateurs
 */
export function useUsers(filters?: UserFilters) {
  const { isMockMode, setLoading, setError } = useAppStore()

  return useQuery({
    queryKey: [...QUERY_KEYS.USERS, filters],
    queryFn: () => userService.getUsers(filters),
    staleTime: APP_CONFIG.QUERY_STALE_TIME,
    gcTime: APP_CONFIG.QUERY_CACHE_TIME,
    retry: APP_CONFIG.QUERY_RETRY_COUNT,
    retryDelay: APP_CONFIG.QUERY_RETRY_DELAY,
    onError: (error: Error) => {
      setError(error.message)
      toast.error("Erreur lors du chargement des utilisateurs")
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

/**
 * Hook pour récupérer un utilisateur par ID
 */
export function useUser(id: number) {
  const { setError } = useAppStore()

  return useQuery({
    queryKey: QUERY_KEYS.USER(id),
    queryFn: () => userService.getUserById(id),
    staleTime: APP_CONFIG.QUERY_STALE_TIME,
    gcTime: APP_CONFIG.QUERY_CACHE_TIME,
    enabled: !!id,
    onError: (error: Error) => {
      setError(error.message)
      toast.error("Erreur lors du chargement de l'utilisateur")
    },
  })
}

/**
 * Hook pour créer un utilisateur
 */
export function useCreateUser() {
  const queryClient = useQueryClient()
  const { setError } = useAppStore()

  return useMutation({
    mutationFn: (userData: CreateUserRequest) => userService.createUser(userData),
    onSuccess: (newUser) => {
      // Invalider et refetch les requêtes utilisateurs
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })

      // Ajouter le nouvel utilisateur au cache
      queryClient.setQueryData(QUERY_KEYS.USER(newUser.id), newUser)

      toast.success("Utilisateur créé avec succès")
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      toast.error("Erreur lors de la création de l'utilisateur")
    },
  })
}

/**
 * Hook pour mettre à jour un utilisateur
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { setError } = useAppStore()

  return useMutation({
    mutationFn: (userData: UpdateUserRequest) => userService.updateUser(userData),
    onSuccess: (updatedUser) => {
      // Mettre à jour le cache
      queryClient.setQueryData(QUERY_KEYS.USER(updatedUser.id), updatedUser)

      // Invalider les requêtes de liste
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })

      toast.success("Utilisateur mis à jour avec succès")
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      toast.error("Erreur lors de la mise à jour de l'utilisateur")
    },
  })
}

/**
 * Hook pour supprimer un utilisateur
 */
export function useDeleteUser() {
  const queryClient = useQueryClient()
  const { setError } = useAppStore()

  return useMutation({
    mutationFn: (request: DeleteUserRequest) => userService.deleteUser(request),
    onSuccess: (_, variables) => {
      // Supprimer du cache
      queryClient.removeQueries({ queryKey: QUERY_KEYS.USER(variables.id) })

      // Invalider les requêtes de liste
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })

      toast.success("Utilisateur supprimé avec succès")
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      toast.error("Erreur lors de la suppression de l'utilisateur")
    },
  })
}

/**
 * Hook pour supprimer plusieurs utilisateurs
 */
export function useDeleteMultipleUsers() {
  const queryClient = useQueryClient()
  const { setError } = useAppStore()

  return useMutation({
    mutationFn: (request: DeleteMultipleUsersRequest) => userService.deleteMultipleUsers(request),
    onSuccess: (_, variables) => {
      // Supprimer du cache
      variables.ids.forEach((id) => {
        queryClient.removeQueries({ queryKey: QUERY_KEYS.USER(id) })
      })

      // Invalider les requêtes de liste
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })

      toast.success(`${variables.ids.length} utilisateur(s) supprimé(s) avec succès`)
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      toast.error("Erreur lors de la suppression des utilisateurs")
    },
  })
}

/**
 * Hook pour récupérer les statistiques des utilisateurs
 */
export function useUserStats() {
  const { setError } = useAppStore()

  return useQuery({
    queryKey: [...QUERY_KEYS.USERS, "stats"],
    queryFn: () => userService.getUserStats(),
    staleTime: APP_CONFIG.QUERY_STALE_TIME,
    gcTime: APP_CONFIG.QUERY_CACHE_TIME,
    onError: (error: Error) => {
      setError(error.message)
      toast.error("Erreur lors du chargement des statistiques")
    },
  })
}

/**
 * Hook pour basculer entre mode mock et API
 */
export function useToggleMockMode() {
  const queryClient = useQueryClient()
  const { isMockMode, setMockMode } = useAppStore()

  const toggleMockMode = () => {
    const newMode = !isMockMode
    setMockMode(newMode)

    // Invalider toutes les requêtes pour forcer le rechargement avec le nouveau mode
    queryClient.invalidateQueries()

    toast.success(`Mode ${newMode ? "Mock" : "API"} activé`)
  }

  return { isMockMode, toggleMockMode }
}
