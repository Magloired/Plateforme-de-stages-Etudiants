"use client"

import type { ColumnDef, FilterFn } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Phone, Mail, Calendar, GraduationCap, Building } from "lucide-react"
import { type User, Role } from "@/types/user"
import { UserAvatar } from "./user-avatar"
import { UserRowActions } from "./user-row-actions"

// Custom filter functions
const multiColumnFilterFn: FilterFn<User> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.nom} ${row.original.prenom} ${row.original.email}`.toLowerCase()
  const searchTerm = (filterValue ?? "").toLowerCase()
  return searchableRowContent.includes(searchTerm)
}

const roleFilterFn: FilterFn<User> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true
  const role = row.getValue(columnId) as string
  return filterValue.includes(role)
}

const getRoleBadgeColor = (role: Role) => {
  switch (role) {
    case Role.Admin:
      return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
    case Role.Responsable:
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
    case Role.Enseignant:
      return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
    case Role.Etudiant:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
  }
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner tout"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
        className="translate-y-[2px]"
      />
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Utilisateur",
    accessorKey: "nom",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <UserAvatar
          src={row.original.avatar_url}
          alt={`${row.original.prenom} ${row.getValue("nom")}`}
          fallback={`${row.original.prenom.charAt(0)}${row.getValue<string>("nom").charAt(0)}`}
          size="md"
        />
        <div className="flex flex-col">
          <div className="font-medium text-foreground">
            {row.original.prenom} {row.getValue("nom")}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Mail size={12} />
            {row.original.email}
          </div>
        </div>
      </div>
    ),
    size: 280,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Rôle",
    accessorKey: "role",
    cell: ({ row }) => (
      <Badge variant="outline" className={cn("font-medium", getRoleBadgeColor(row.getValue("role")))}>
        {row.getValue("role")}
      </Badge>
    ),
    size: 120,
    filterFn: roleFilterFn,
  },
  {
    header: "Filière",
    accessorKey: "filiere",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Building size={14} className="text-muted-foreground" />
        <span className="text-sm">{row.getValue("filiere")}</span>
      </div>
    ),
    size: 150,
  },
  {
    header: "Niveau",
    accessorKey: "niveauEtude",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <GraduationCap size={14} className="text-muted-foreground" />
        <span className="text-sm">{row.getValue("niveauEtude")}</span>
      </div>
    ),
    size: 130,
  },
  {
    header: "Téléphone",
    accessorKey: "telephone",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone size={14} className="text-muted-foreground" />
        <span className="text-sm font-mono">{row.getValue("telephone")}</span>
      </div>
    ),
    size: 150,
  },
  {
    header: "Date d'inscription",
    accessorKey: "dateInscription",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateInscription"))
      return (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-muted-foreground" />
          <span className="text-sm">{date.toLocaleDateString("fr-FR")}</span>
        </div>
      )
    },
    size: 150,
  },
  {
    header: "Statut",
    accessorKey: "isActif",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isActif") ? "default" : "secondary"} className="font-medium">
        {row.getValue("isActif") ? "Actif" : "Inactif"}
      </Badge>
    ),
    size: 100,
  },
  {
    header: "Candidatures",
    accessorKey: "candidatures",
    cell: ({ row }) => {
      const role = row.original.role
      const candidatures = row.original.candidatures

      if (role !== Role.Etudiant) {
        return <div className="text-center text-muted-foreground">-</div>
      }

      return (
        <div className="text-center">
          <Badge variant="outline" className="text-xs font-medium">
            {candidatures.length}
          </Badge>
        </div>
      )
    },
    size: 100,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <UserRowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
]
