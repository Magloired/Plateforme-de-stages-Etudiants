/**
 * Client API centralisé avec gestion des erreurs et configuration
 */

import { APP_CONFIG } from "@/config/app-config"
import type { ApiError } from "@/types/api"

class ApiClient {
  private baseURL: string
  private timeout: number

  constructor() {
    this.baseURL = APP_CONFIG.API_BASE_URL
    this.timeout = APP_CONFIG.API_TIMEOUT
  }

  /**
   * Méthode générique pour les requêtes HTTP
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Timeout pour les requêtes
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          message: `HTTP Error: ${response.status} ${response.statusText}`,
          timestamp: new Date().toISOString(),
        }))

        throw new Error(errorData.message || `HTTP Error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout")
        }
        throw error
      }

      throw new Error("Unknown error occurred")
    }
  }

  /**
   * Méthodes HTTP
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

// Instance singleton du client API
export const apiClient = new ApiClient()
