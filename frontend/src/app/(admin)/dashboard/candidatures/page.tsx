"use client"

import { useState } from "react"
import { CandidatureTable } from "@/components/candidature-table/candidature-table"
import { mockCandidatures } from "@/data/mock-candidatures"
import type { Candidature } from "@/types/candidature"
import { Toaster } from "sonner"

export default function CandidaturesPage() {
  const [data, setData] = useState<Candidature[]>(mockCandidatures)

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Candidatures</h1>
          <p className="text-muted-foreground">Gérez les demandes de stages et suivez leur progression</p>
        </div>

        {/* Table */}
        <CandidatureTable data={data} onDataChange={setData} />
      </div>

      <Toaster position="top-right" />
    </div>
  )
}
