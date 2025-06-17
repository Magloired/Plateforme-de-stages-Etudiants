"use client"

import { useId, useMemo, useState } from "react"
import {
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import type { Candidature } from "@/types/candidature"
import { StatutCandidature } from "@/types/candidature"
import { columns } from "./candidature-table-columns"
import { CandidatureTableFilters, MobileCandidatureFiltersDropdown } from "./candidature-table-filters"
import { CandidatureTableActions } from "./candidature-table-actions"
import { CandidatureTablePagination } from "./candidature-table-pagination"

interface CandidatureTableProps {
  data: Candidature[]
  onDataChange: (data: Candidature[]) => void
}

export function CandidatureTable({ data, onDataChange }: CandidatureTableProps) {
  const id = useId()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "dateSoumission",
      desc: true,
    },
  ])

  const handleBulkAccept = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const updatedData = data.map((candidature) => {
      const isSelected = selectedRows.some((row) => row.original.id === candidature.id)
      if (
        isSelected &&
        (candidature.statut === StatutCandidature.EnAttente || candidature.statut === StatutCandidature.EnCours)
      ) {
        return { ...candidature, statut: StatutCandidature.Acceptee }
      }
      return candidature
    })
    onDataChange(updatedData)
    table.resetRowSelection()
    toast.success(`${selectedRows.length} candidature(s) acceptée(s)`)
  }

  const handleBulkReject = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const updatedData = data.map((candidature) => {
      const isSelected = selectedRows.some((row) => row.original.id === candidature.id)
      if (
        isSelected &&
        (candidature.statut === StatutCandidature.EnAttente || candidature.statut === StatutCandidature.EnCours)
      ) {
        return { ...candidature, statut: StatutCandidature.Refusee }
      }
      return candidature
    })
    onDataChange(updatedData)
    table.resetRowSelection()
    toast.success(`${selectedRows.length} candidature(s) refusée(s)`)
  }

  const handleExport = () => {
    const filteredData = table.getFilteredRowModel().rows.map((row) => row.original)
    // Ici vous pouvez implémenter l'export (CSV, PDF, etc.)
    toast.success(`Export de ${filteredData.length} candidatures`)
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  })

  // Get unique statut values and counts
  const uniqueStatutValues = useMemo(() => {
    const statutColumn = table.getColumn("statut")
    if (!statutColumn) return []
    const values = Array.from(statutColumn.getFacetedUniqueValues().keys())
    return values.sort()
  }, [table.getColumn("statut")?.getFacetedUniqueValues()])

  const statutCounts = useMemo(() => {
    const statutColumn = table.getColumn("statut")
    if (!statutColumn) return new Map()
    return statutColumn.getFacetedUniqueValues()
  }, [table.getColumn("statut")?.getFacetedUniqueValues()])

  const selectedStatuts = useMemo(() => {
    const filterValue = table.getColumn("statut")?.getFilterValue() as string[]
    return filterValue ?? []
  }, [table.getColumn("statut")?.getFilterValue()])

  const handleStatutChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("statut")?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table.getColumn("statut")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CandidatureTableFilters
          table={table}
          uniqueStatutValues={uniqueStatutValues}
          selectedStatuts={selectedStatuts}
          statutCounts={statutCounts}
          onStatutChange={handleStatutChange}
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          {/* Mobile filters dropdown */}
          <div className="sm:hidden">
            <MobileCandidatureFiltersDropdown
              table={table}
              uniqueStatutValues={uniqueStatutValues}
              selectedStatuts={selectedStatuts}
              statutCounts={statutCounts}
              onStatutChange={handleStatutChange}
              id={id}
            />
          </div>

          <CandidatureTableActions
            table={table}
            onBulkAccept={handleBulkAccept}
            onBulkReject={handleBulkReject}
            onExport={handleExport}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm">
        <div className="overflow-x-auto">
          <Table className="table-fixed min-w-[1000px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-b">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: `${header.getSize()}px` }}
                        className="h-12 bg-muted/50"
                      >
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <div
                            className={cn(
                              header.column.getCanSort() &&
                                "flex h-full cursor-pointer select-none items-center justify-between gap-2 hover:text-foreground",
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                            onKeyDown={(e) => {
                              if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
                                e.preventDefault()
                                header.column.getToggleSortingHandler()?.(e)
                              }
                            }}
                            tabIndex={header.column.getCanSort() ? 0 : undefined}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: (
                                <ChevronUp
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              ),
                              desc: (
                                <ChevronDown
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 last:py-0">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <div className="text-sm">Aucune candidature trouvée</div>
                      <div className="text-xs">Essayez de modifier vos filtres de recherche</div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <CandidatureTablePagination table={table} id={id} />
    </div>
  )
}
