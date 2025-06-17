"use client"

/**
 * Hook personnalisé pour la gestion des exports
 * Fournit une interface simple pour exporter les données avec gestion d'état
 */

import { useState, useCallback } from "react"
import { ExportService } from "@/services/export-service"
import type { ExportType, ExportOptions, ExportResult } from "@/types/export"

interface UseExportReturn {
  /** État de l'export en cours */
  isExporting: string | null
  /** Dernière opération d'export */
  lastExport: ExportResult | null
  /** Fonction pour lancer un export */
  exportData: (type: ExportType, options: ExportOptions) => Promise<ExportResult>
  /** Réinitialiser l'état */
  reset: () => void
}

/**
 * Hook pour gérer les exports avec état et notifications
 */
export function useExport(): UseExportReturn {
  const [isExporting, setIsExporting] = useState<string | null>(null)
  const [lastExport, setLastExport] = useState<ExportResult | null>(null)

  const exportData = useCallback(async (type: ExportType, options: ExportOptions): Promise<ExportResult> => {
    try {
      setIsExporting(type)
      setLastExport(null)

      const result = await ExportService.export(type, options)
      setLastExport(result)

      return result
    } catch (error) {
      const errorResult = {
        success: false,
        error: `Erreur inattendue lors de l'export ${type}`,
      }
      setLastExport(errorResult)
      return errorResult
    } finally {
      setIsExporting(null)
    }
  }, [])

  const reset = useCallback(() => {
    setIsExporting(null)
    setLastExport(null)
  }, [])

  return {
    isExporting,
    lastExport,
    exportData,
    reset,
  }
}
