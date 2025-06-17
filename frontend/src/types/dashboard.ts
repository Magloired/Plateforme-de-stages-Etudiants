import { StatutCandidature } from "./candidature"

export interface DashboardStats {
  totalUsers: number
  totalEntreprises: number
  totalOffres: number
  totalCandidatures: number
  totalValidations: number
  candidaturesParStatut: Record<StatutCandidature, number>
  offresParVille: Record<string, number>
  offresParType: Record<string, number>
} 