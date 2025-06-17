"use client"

import { useId, useRef } from "react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CircleX, Columns3, Filter, ListFilter } from "lucide-react"
import type { User } from "@/types/user"

interface UserTableFiltersProps {
  table: Table<User>
  uniqueRoleValues: string[]
  selectedRoles: string[]
  roleCounts: Map<string, number>
  onRoleChange: (checked: boolean, value: string) => void
}

export function UserTableFilters({
  table,
  uniqueRoleValues,
  selectedRoles,
  roleCounts,
  onRoleChange,
}: UserTableFiltersProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden sm:flex sm:items-center sm:gap-3">
        {/* Search input */}
        <div className="relative">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className={cn("peer min-w-60 ps-9", Boolean(table.getColumn("nom")?.getFilterValue()) && "pe-9")}
            value={(table.getColumn("nom")?.getFilterValue() ?? "") as string}
            onChange={(e) => table.getColumn("nom")?.setFilterValue(e.target.value)}
            placeholder="Rechercher par nom, prénom ou email..."
            type="text"
            aria-label="Rechercher par nom, prénom ou email"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
          </div>
          {Boolean(table.getColumn("nom")?.getFilterValue()) && (
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Effacer le filtre"
              onClick={() => {
                table.getColumn("nom")?.setFilterValue("")
                if (inputRef.current) {
                  inputRef.current.focus()
                }
              }}
            >
              <CircleX size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Role filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-dashed">
              <Filter className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              Rôle
              {selectedRoles.length > 0 && (
                <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                  {selectedRoles.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-48 p-3" align="start">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Filtrer par rôle</div>
              <div className="space-y-3">
                {uniqueRoleValues.map((value, i) => (
                  <div key={value} className="flex items-center gap-2">
                    <Checkbox
                      id={`${id}-${i}`}
                      checked={selectedRoles.includes(value)}
                      onCheckedChange={(checked: boolean) => onRoleChange(checked, value)}
                    />
                    <Label htmlFor={`${id}-${i}`} className="flex grow justify-between gap-2 font-normal">
                      {value}{" "}
                      <span className="ms-2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {roleCounts.get(value)}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-dashed">
              <Columns3 className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              Colonnes
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Afficher/Masquer</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    onSelect={(event) => event.preventDefault()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile search */}
      <div className="sm:hidden">
        <div className="relative">
          <Input
            id={`${id}-mobile-input`}
            className={cn("peer w-full ps-9", Boolean(table.getColumn("nom")?.getFilterValue()) && "pe-9")}
            value={(table.getColumn("nom")?.getFilterValue() ?? "") as string}
            onChange={(e) => table.getColumn("nom")?.setFilterValue(e.target.value)}
            placeholder="Rechercher..."
            type="text"
            aria-label="Rechercher par nom, prénom ou email"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
          </div>
          {Boolean(table.getColumn("nom")?.getFilterValue()) && (
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Effacer le filtre"
              onClick={() => {
                table.getColumn("nom")?.setFilterValue("")
              }}
            >
              <CircleX size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

interface MobileFiltersDropdownProps {
  table: Table<User>
  uniqueRoleValues: string[]
  selectedRoles: string[]
  roleCounts: Map<string, number>
  onRoleChange: (checked: boolean, value: string) => void
  id: string
}

export function MobileFiltersDropdown({
  table,
  uniqueRoleValues,
  selectedRoles,
  roleCounts,
  onRoleChange,
  id,
}: MobileFiltersDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full border-dashed">
          <Filter className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
          Filtres & Options
          {selectedRoles.length > 0 && (
            <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
              {selectedRoles.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filtrer par rôle</DropdownMenuLabel>
        {uniqueRoleValues.map((value, i) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selectedRoles.includes(value)}
            onCheckedChange={(checked: boolean) => onRoleChange(checked, value)}
            onSelect={(event) => event.preventDefault()}
          >
            <div className="flex w-full justify-between">
              <span>{value}</span>
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {roleCounts.get(value)}
              </span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Colonnes</DropdownMenuLabel>
        {table
          .getAllColumns()
          .filter((column: any) => column.getCanHide())
          .map((column: any) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
              onSelect={(event) => event.preventDefault()}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
