"use client"

import type { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Eye, CheckCircle, XCircle, MessageSquare, Download, UserCheck, Clock } from "lucide-react"
import type { Candidature } from "@/types/candidature"
import { StatutCandidature } from "@/types/candidature"

interface CandidatureRowActionsProps {
  row: Row<Candidature>
}

export function CandidatureRowActions({ row }: CandidatureRowActionsProps) {
  const candidature = row.original
  const canAccept =
    candidature.statut === StatutCandidature.EnAttente || candidature.statut === StatutCandidature.EnCours
  const canReject =
    candidature.statut === StatutCandidature.EnAttente || candidature.statut === StatutCandidature.EnCours
  const canValidate = candidature.statut === StatutCandidature.Acceptee

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button size="icon" variant="ghost" className="h-8 w-8 shadow-none" aria-label="Actions">
            <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            <span>Voir les détails</span>
            <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" />
            <span>Télécharger CV</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {canAccept && (
            <DropdownMenuItem className="text-green-600 focus:text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Accepter</span>
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {canReject && (
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              <XCircle className="mr-2 h-4 w-4" />
              <span>Refuser</span>
              <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {canValidate && (
            <DropdownMenuItem className="text-blue-600 focus:text-blue-600">
              <UserCheck className="mr-2 h-4 w-4" />
              <span>Valider</span>
              <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Clock className="mr-2 h-4 w-4" />
            <span>Mettre en cours</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Ajouter commentaire</span>
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
