"use client"

import type { Table } from "@tanstack/react-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Download } from "lucide-react"
import type { Candidature } from "@/types/candidature"
import { StatutCandidature } from "@/types/candidature"

interface CandidatureTableActionsProps {
  table: Table<Candidature>
  onBulkAccept: () => void
  onBulkReject: () => void
  onExport: () => void
}

export function CandidatureTableActions({ table, onBulkAccept, onBulkReject, onExport }: CandidatureTableActionsProps) {
  const selectedRows = table.getSelectedRowModel().rows
  const hasSelection = selectedRows.length > 0

  // Vérifier si les candidatures sélectionnées peuvent être acceptées/refusées
  const canBulkAccept = selectedRows.some(
    (row) => row.original.statut === StatutCandidature.EnAttente || row.original.statut === StatutCandidature.EnCours,
  )

  const canBulkReject = selectedRows.some(
    (row) => row.original.statut === StatutCandidature.EnAttente || row.original.statut === StatutCandidature.EnCours,
  )

  return (
    <div className="flex items-center gap-2">
      {/* Bulk actions */}
      {hasSelection && (
        <>
          {canBulkAccept && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/50 text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  <CheckCircle className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                  <span className="hidden sm:inline">Accepter</span>
                  <span className="-me-1 ms-1 sm:ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {selectedRows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-green-50"
                    aria-hidden="true"
                  >
                    <CheckCircle className="opacity-80 text-green-600" size={16} strokeWidth={2} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Accepter les candidatures ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Vous êtes sur le point d'accepter {selectedRows.length}{" "}
                      {selectedRows.length === 1 ? "candidature" : "candidatures"}. Cette action peut être modifiée
                      ultérieurement.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={onBulkAccept} className="bg-green-600 text-white hover:bg-green-700">
                    Accepter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {canBulkReject && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <XCircle className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                  <span className="hidden sm:inline">Refuser</span>
                  <span className="-me-1 ms-1 sm:ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {selectedRows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-red-50"
                    aria-hidden="true"
                  >
                    <XCircle className="opacity-80 text-red-600" size={16} strokeWidth={2} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Refuser les candidatures ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Vous êtes sur le point de refuser {selectedRows.length}{" "}
                      {selectedRows.length === 1 ? "candidature" : "candidatures"}. Cette action peut être modifiée
                      ultérieurement.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={onBulkReject} className="bg-red-600 text-white hover:bg-red-700">
                    Refuser
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </>
      )}

      {/* Export button */}
      <Button variant="outline" size="sm" onClick={onExport} className="border-dashed">
        <Download className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        <span className="hidden sm:inline">Exporter</span>
        <span className="sm:hidden">Export</span>
      </Button>
    </div>
  )
}
