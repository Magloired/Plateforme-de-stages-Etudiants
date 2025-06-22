export interface OffreDeStage {
  id: number
  titre: string
  description: string
  datePublication: string
  dureeMois: number
  lieu: string
  typeStage: string
  remuneration: number
  dateLimiteCandidature: string
  isActive: boolean
  entreprise: {
    id: number
    nom: string
    description: string
  }
}
