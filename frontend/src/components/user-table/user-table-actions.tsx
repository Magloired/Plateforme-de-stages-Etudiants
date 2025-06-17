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
import { CircleAlert, Plus, Trash } from "lucide-react"
import type { User } from "@/types/user"
import { ExportButtons } from "@/components/export-buttons"

interface UserTableActionsProps {
  table: Table<User>
  onDeleteRows: () => void
  visibleColumns: string[]
}

export function UserTableActions({ table, onDeleteRows, visibleColumns }: UserTableActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Delete button */}
      {table.getSelectedRowModel().rows.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              <span className="hidden sm:inline">Supprimer</span>
              <span className="-me-1 ms-1 sm:ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                {table.getSelectedRowModel().rows.length}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-destructive/10"
                aria-hidden="true"
              >
                <CircleAlert className="opacity-80 text-destructive" size={16} strokeWidth={2} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée. Cela supprimera définitivement{" "}
                  {table.getSelectedRowModel().rows.length}{" "}
                  {table.getSelectedRowModel().rows.length === 1
                    ? "utilisateur sélectionné"
                    : "utilisateurs sélectionnés"}
                  .
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDeleteRows}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Add user button */}
      <Button size="sm" className="bg-primary hover:bg-primary/90">
        <Plus className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        <span className="hidden sm:inline">Ajouter un utilisateur</span>
        <span className="sm:hidden">Ajouter</span>
      </Button>

      {/* Export buttons */}
      <ExportButtons
        users={table.getFilteredRowModel().rows.map((row) => row.original)}
        visibleColumns={visibleColumns}
      />
    </div>
  )
}
