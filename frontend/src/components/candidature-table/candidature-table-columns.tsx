"use client"

import type { ColumnDef, FilterFn } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Calendar, Building, FileText, Clock, CheckCircle, XCircle, AlertCircle, Download, Eye } from "lucide-react"
import { type Candidature, StatutCandidature } from "@/types/candidature"
import { CandidatureAvatar } from "./candidature-avatar"
import { CandidatureRowActions } from "./candidature-row-actions"

// Custom filter functions
const multiColumnFilterFn: FilterFn<Candidature> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.nomCandidat} ${row.original.titreOffre}`.toLowerCase()
  const searchTerm = (filterValue ?? "").toLowerCase()
  return searchableRowContent.includes(searchTerm)
}

const statutFilterFn: FilterFn<Candidature> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true
  const statut = row.getValue(columnId) as string
  return filterValue.includes(statut)
}

const getStatutBadgeColor = (statut: StatutCandidature) => {
  switch (statut) {
    case StatutCandidature.EnAttente:
      return "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
    case StatutCandidature.Acceptee:
      return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
    case StatutCandidature.Refusee:
      return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
    case StatutCandidature.EnCours:
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
    case StatutCandidature.Validee:
      return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
    case StatutCandidature.Annulee:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
  }
}

const getStatutIcon = (statut: StatutCandidature) => {
  switch (statut) {
    case StatutCandidature.EnAttente:
      return <Clock size={12} />
    case StatutCandidature.Acceptee:
      return <CheckCircle size={12} />
    case StatutCandidature.Refusee:
      return <XCircle size={12} />
    case StatutCandidature.EnCours:
      return <AlertCircle size={12} />
    case StatutCandidature.Validee:
      return <CheckCircle size={12} />
    case StatutCandidature.Annulee:
      return <XCircle size={12} />
    default:
      return <Clock size={12} />
  }
}

export const columns: ColumnDef<Candidature>[] = [
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
    header: "Candidat",
    accessorKey: "nomCandidat",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <CandidatureAvatar
          alt={row.getValue("nomCandidat")}
          fallback={row
            .getValue<string>("nomCandidat")
            .split(" ")
            .map((n) => n[0])
            .join("")}
          size="md"
        />
        <div className="flex flex-col">
          <div className="font-medium text-foreground">{row.getValue("nomCandidat")}</div>
          <div className="text-sm text-muted-foreground">ID: {row.original.userId}</div>
        </div>
      </div>
    ),
    size: 200,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Offre de stage",
    accessorKey: "titreOffre",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Building size={14} className="text-muted-foreground" />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{row.getValue("titreOffre")}</span>
          <span className="text-xs text-muted-foreground">ID: {row.original.offreDeStageId}</span>
        </div>
      </div>
    ),
    size: 250,
  },
  {
    header: "Date de soumission",
    accessorKey: "dateSoumission",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateSoumission"))
      return (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm">{date.toLocaleDateString("fr-FR")}</span>
            <span className="text-xs text-muted-foreground">
              {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      )
    },
    size: 150,
  },
  {
    header: "Statut",
    accessorKey: "statut",
    cell: ({ row }) => {
      const statut = row.getValue("statut") as StatutCandidature
      return (
        <Badge variant="outline" className={cn("font-medium flex items-center gap-1", getStatutBadgeColor(statut))}>
          {getStatutIcon(statut)}
          {statut}
        </Badge>
      )
    },
    size: 130,
    filterFn: statutFilterFn,
  },
  {
    header: "Document",
    accessorKey: "documentUrl",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileText size={14} className="text-muted-foreground" />
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => window.open(row.getValue("documentUrl"), "_blank")}
          >
            <Eye size={12} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => {
              const link = document.createElement("a")
              link.href = row.getValue("documentUrl")
              link.download = `cv-${row.original.nomCandidat.replace(/\s+/g, "-").toLowerCase()}.pdf`
              link.click()
            }}
          >
            <Download size={12} />
          </Button>
        </div>
      </div>
    ),
    size: 100,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <CandidatureRowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
]
