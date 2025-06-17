"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ColumnDef, FilterFn, Row } from "@tanstack/react-table"
import { Ellipsis, Phone, Mail, Calendar, GraduationCap, Building } from "lucide-react"
import { type User, Role } from "@/types/user"
import { mockUsers } from "@/data/mock-users"
import { Toaster } from "sonner"
import { UserTable } from "@/components/user-table/user-table"

// Custom filter function for multi-column searching
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
      return "bg-red-100 text-red-800 border-red-200"
    case Role.Responsable:
      return "bg-blue-100 text-blue-800 border-blue-200"
    case Role.Enseignant:
      return "bg-green-100 text-green-800 border-green-200"
    case Role.Etudiant:
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner tout"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Nom",
    accessorKey: "nom",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("nom")} {row.original.prenom}
      </div>
    ),
    size: 200,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail size={14} className="text-muted-foreground" />
        <span className="text-sm">{row.getValue("email")}</span>
      </div>
    ),
    size: 250,
  },
  {
    header: "Rôle",
    accessorKey: "role",
    cell: ({ row }) => (
      <Badge className={cn("border", getRoleBadgeColor(row.getValue("role")))}>{row.getValue("role")}</Badge>
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
        <span className="text-sm">{row.getValue("telephone")}</span>
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
      <Badge variant={row.getValue("isActif") ? "default" : "secondary"}>
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

      // Seuls les étudiants ont des candidatures
      if (role !== Role.Etudiant) {
        return <div className="text-center text-muted-foreground">-</div>
      }

      return (
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
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
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
]

export default function UsersPage() {
  const [data, setData] = useState<User[]>(mockUsers)

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les étudiants, enseignants et administrateurs de votre établissement
          </p>
        </div>

        {/* Table */}
        <UserTable data={data} onDataChange={setData} />
      </div>

      <Toaster position="top-right" />
    </div>
  )
}

function RowActions({ row }: { row: Row<User> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button size="icon" variant="ghost" className="shadow-none" aria-label="Actions">
            <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Modifier</span>
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Dupliquer</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Voir les candidatures</span>
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Plus d&apos;options</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Changer de filière</DropdownMenuItem>
                <DropdownMenuItem>Modifier le niveau</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Options avancées</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>{row.original.isActif ? "Désactiver" : "Activer"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>Envoyer un email</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <span>Supprimer</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
