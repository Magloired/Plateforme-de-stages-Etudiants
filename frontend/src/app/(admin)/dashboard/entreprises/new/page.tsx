"use client"

import { ContentLayout } from '@/components/admin-panel/content-layout'
import { CreateEntrepriseForm } from '@/components/forms/CreateEntrepriseForm'

export default function NewCompanyPage() {
  return (
    <ContentLayout title="Nouvelle Entreprise">
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Créer une nouvelle entreprise</h1>
          <p className="text-muted-foreground">
            Ajoutez une nouvelle entreprise partenaire à la plateforme
          </p>
        </div>

        {/* Formulaire */}
        <CreateEntrepriseForm />
      </div>
    </ContentLayout>
  )
} 