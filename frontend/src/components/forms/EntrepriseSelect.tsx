"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Building2, AlertCircle } from "lucide-react"
import { apiService } from "@/services/api"
import { EntrepriseReadDTO } from "@/types"
import { toast } from "sonner"

// Types pour les entreprises
interface EntrepriseOption {
  id: number
  nom: string
  specialite: string
}

interface EntrepriseSelectProps {
  value?: number
  onValueChange: (value: number) => void
  error?: string
  required?: boolean
}

export function EntrepriseSelect({ value, onValueChange, error, required = false }: EntrepriseSelectProps) {
  const [entreprises, setEntreprises] = useState<EntrepriseOption[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Chargement des entreprises depuis l'API
    const loadEntreprises = async () => {
      setLoading(true)
      setHasError(false)
      
      try {
        // Appel API pour récupérer toutes les entreprises
        const entreprisesData: EntrepriseReadDTO[] = await apiService.entreprises.getAll()
        
        // Transformation des données pour correspondre à l'interface EntrepriseOption
        const entreprisesOptions: EntrepriseOption[] = entreprisesData.map(entreprise => ({
          id: entreprise.id,
          nom: entreprise.nom,
          specialite: entreprise.specialite
        }))
        
        setEntreprises(entreprisesOptions)
      } catch (error) {
        console.error("Erreur lors du chargement des entreprises:", error)
        toast.error("Erreur lors du chargement des entreprises")
        setHasError(true)
        setEntreprises([])
      } finally {
        setLoading(false)
      }
    }

    loadEntreprises()
  }, [])

  // Gestion du cas où il n'y a pas de données
  const getPlaceholderText = () => {
    if (loading) return "Chargement..."
    if (hasError) return "Erreur de chargement"
    if (entreprises.length === 0) return "Aucune entreprise disponible"
    return "Sélectionner une entreprise"
  }

  const isDisabled = loading || hasError || entreprises.length === 0

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="entreprise-select">
        Entreprise {required && "*"}
      </Label>
      <Select 
        value={value?.toString()} 
        onValueChange={(val) => onValueChange(Number(val))}
        disabled={isDisabled}
      >
        <SelectTrigger id="entreprise-select" className="w-full">
          <SelectValue placeholder={getPlaceholderText()} />
        </SelectTrigger>
        <SelectContent>
          {entreprises.length > 0 ? (
            entreprises.map((entreprise) => (
              <SelectItem key={entreprise.id} value={entreprise.id.toString()}>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{entreprise.nom}</span>
                    <span className="text-xs text-muted-foreground">{entreprise.specialite}</span>
                  </div>
                </div>
              </SelectItem>
            ))
          ) : !loading && !hasError ? (
            <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Aucune entreprise disponible</span>
            </div>
          ) : hasError ? (
            <div className="flex items-center gap-2 p-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              <span>Erreur de chargement</span>
            </div>
          ) : null}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
} 