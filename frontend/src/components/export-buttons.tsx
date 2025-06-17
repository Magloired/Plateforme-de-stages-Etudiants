/**
 * Composant des boutons d'export
 * Interface utilisateur pour déclencher les exports avec prise en compte des filtres
 */

"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileText, FileSpreadsheet, FileJson, Printer, CheckCircle, XCircle } from "lucide-react"
import type { User } from "@/types/user"
import type { ExportType } from "@/types/export"
import { useExport } from "@/hooks/use-export"
import { toast } from "sonner"

interface ExportButtonsProps {
  /** Données utilisateur filtrées à exporter */
  users: User[]
  /** Colonnes visibles dans le tableau */
  visibleColumns: string[]
}

/**
 * Composant pour les boutons d'export avec gestion d'état
 */
export function ExportButtons({ users, visibleColumns }: ExportButtonsProps) {
  const { isExporting, lastExport, exportData, reset } = useExport()

  // Debug des props reçues
  useEffect(() => {
    console.log("ExportButtons - Props reçues:", {
      usersCount: users.length,
      visibleColumns: visibleColumns,
      sampleUser: users[0],
    })
  }, [users, visibleColumns])

  // Afficher les notifications de résultat
  useEffect(() => {
    if (lastExport) {
      if (lastExport.success) {
        toast.success(lastExport.message || "Export réussi")
      } else {
        toast.error(lastExport.error || "Échec de l'export")
      }
    }
  }, [lastExport])

  /**
   * Gestionnaire d'export unifié
   */
  const handleExport = async (type: ExportType) => {
    console.log(`Tentative d'export ${type}:`, {
      usersCount: users.length,
      visibleColumns: visibleColumns,
    })

    if (users.length === 0) {
      toast.warning("Aucune donnée à exporter")
      return
    }

    if (visibleColumns.length === 0) {
      toast.warning("Aucune colonne visible à exporter")
      return
    }

    await exportData(type, {
      data: users,
      visibleColumns,
      filename: "utilisateurs",
      title: "Rapport des Utilisateurs",
    })
  }

  /**
   * Configuration des options d'export
   */
  const exportOptions = [
    {
      type: "csv" as ExportType,
      label: "CSV",
      icon: FileSpreadsheet,
      description: "Format tableur (séparateur ;)",
    },
    {
      type: "json" as ExportType,
      label: "JSON",
      icon: FileJson,
      description: "Format de données structurées",
    },
    {
      type: "pdf" as ExportType,
      label: "PDF",
      icon: FileText,
      description: "Document PDF en paysage",
    },
    {
      type: "print" as ExportType,
      label: "Imprimer",
      icon: Printer,
      description: "Impression directe",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting !== null}>
          <Download className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
          <span className="hidden sm:inline">
            {isExporting ? `Export ${isExporting.toUpperCase()}...` : "Exporter"}
          </span>
          <span className="sm:hidden">{isExporting ? "..." : "Export"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Formats d&apos;export</span>
          {lastExport && (
            <span className="flex items-center gap-1 text-xs">
              {lastExport.success ? (
                <CheckCircle className="h-3 w-3 text-green-500" />
              ) : (
                <XCircle className="h-3 w-3 text-red-500" />
              )}
            </span>
          )}
        </DropdownMenuLabel>
        <div className="px-2 py-1 text-xs text-muted-foreground">
          {users.length} {users.length === 1 ? "utilisateur" : "utilisateurs"} • {visibleColumns.length} colonnes
        </div>
        <div className="px-2 py-1 text-xs text-muted-foreground">Colonnes: {visibleColumns.join(", ")}</div>
        <DropdownMenuSeparator />
        {exportOptions.map((option) => (
          <DropdownMenuItem
            key={option.type}
            onClick={() => handleExport(option.type)}
            disabled={isExporting !== null}
            className="flex flex-col items-start gap-1 py-3"
          >
            <div className="flex items-center gap-2 w-full">
              <option.icon className="h-4 w-4" />
              <span className="font-medium">{option.label}</span>
              {isExporting === option.type && <span className="ml-auto text-xs text-muted-foreground">...</span>}
            </div>
            <span className="text-xs text-muted-foreground pl-6">{option.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
