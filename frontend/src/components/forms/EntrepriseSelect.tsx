"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"

// Types pour les entreprises
interface EntrepriseOption {
  id: number
  nom: string
  specialite: string
}

// Données mock pour les entreprises
const mockEntreprises: EntrepriseOption[] = [
  { id: 1, nom: "TechCorp", specialite: "Developpement" },
  { id: 2, nom: "NetSolutions", specialite: "Resau" },
  { id: 3, nom: "TelecomPlus", specialite: "Telecom" },
  { id: 4, nom: "MarketingPro", specialite: "Marketing" },
  { id: 5, nom: "DataSoft", specialite: "Developpement" },
  { id: 6, nom: "CloudTech", specialite: "Resau" },
  { id: 7, nom: "MobileDev", specialite: "Developpement" },
  { id: 8, nom: "DigitalAgency", specialite: "Marketing" },
]

interface EntrepriseSelectProps {
  value?: number
  onValueChange: (value: number) => void
  error?: string
  required?: boolean
}

export function EntrepriseSelect({ value, onValueChange, error, required = false }: EntrepriseSelectProps) {
  const [entreprises, setEntreprises] = useState<EntrepriseOption[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulation de chargement des entreprises
    const loadEntreprises = async () => {
      setLoading(true)
      
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // TODO: Remplacer par l'appel API réel
      // const response = await apiService.entreprises.getAll()
      // setEntreprises(response.map(e => ({ id: e.id, nom: e.nom, specialite: e.specialite })))
      
      // Utilisation des données mock pour l'instant
      setEntreprises(mockEntreprises)
      
      setLoading(false)
    }

    loadEntreprises()
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="entreprise-select">
        Entreprise {required && "*"}
      </Label>
      <Select value={value?.toString()} onValueChange={(val) => onValueChange(Number(val))}>
        <SelectTrigger id="entreprise-select" className="w-full">
          <SelectValue placeholder={loading ? "Chargement..." : "Sélectionner une entreprise"} />
        </SelectTrigger>
        <SelectContent>
          {entreprises.map((entreprise) => (
            <SelectItem key={entreprise.id} value={entreprise.id.toString()}>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="font-medium">{entreprise.nom}</span>
                  <span className="text-xs text-muted-foreground">{entreprise.specialite}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
} 