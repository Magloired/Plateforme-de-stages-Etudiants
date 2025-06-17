import { StatutCandidature } from "@/types/candidature"
import { mockCandidatures } from "./mock-candidatures"
import { mockOffresDeStage } from "./mock-offres-de-stage"
import { mockEntreprises } from "./mock-entreprises"
import { mockValidations } from "./mock-validations"

/**
 * Statistiques mock pour le dashboard
 * Utilisé en mode développement ou lorsque l'API n'est pas disponible
 */
export const mockDashboardStats = {
  totalCandidatures: mockCandidatures.length,
  totalOffres: mockOffresDeStage.length,
  totalEntreprises: mockEntreprises.length,
  totalValidations: mockValidations.length,
  candidaturesParStatut: {
    [StatutCandidature.EnAttente]: mockCandidatures.filter(c => c.statut === StatutCandidature.EnAttente).length,
    [StatutCandidature.Acceptee]: mockCandidatures.filter(c => c.statut === StatutCandidature.Acceptee).length,
    [StatutCandidature.EnCours]: mockCandidatures.filter(c => c.statut === StatutCandidature.EnCours).length,
    [StatutCandidature.Refusee]: mockCandidatures.filter(c => c.statut === StatutCandidature.Refusee).length,
    [StatutCandidature.Validee]: mockCandidatures.filter(c => c.statut === StatutCandidature.Validee).length,
    [StatutCandidature.Annulee]: mockCandidatures.filter(c => c.statut === StatutCandidature.Annulee).length,
  },
  offresParVille: {
    "Lomé": mockOffresDeStage.filter(o => o.lieu === "Lomé").length,
    "Kara": mockOffresDeStage.filter(o => o.lieu === "Kara").length,
  },
  offresParType: {
    "Temps plein": mockOffresDeStage.filter(o => o.typeStage === "Temps plein").length,
    "Temps partiel": mockOffresDeStage.filter(o => o.typeStage === "Temps partiel").length,
  },
} 