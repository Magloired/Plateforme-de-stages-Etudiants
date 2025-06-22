import { type OffreDeStage } from "@/types/offre-de-stage"
import { mockEntreprises } from "./mock-entreprises"

/**
 * Données mock pour les offres de stage
 * Utilisé en mode développement ou lorsque l'API n'est pas disponible
 */
export const mockOffresDeStage: OffreDeStage[] = [
  {
    id: 1,
    titre: "Stage en développement web",
    description: "Participer au développement d'une application web avec ASP.NET et React.",
    datePublication: "2024-05-01T00:00:00Z",
    dureeMois: 3,
    lieu: "Lomé",
    typeStage: "Temps plein",
    remuneration: 150,
    dateLimiteCandidature: "2024-07-01T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[0],
  },
  {
    id: 2,
    titre: "Stage en Sécurité de Serveur cloud",
    description: "Mise en place et maintenance de solutions de sécurité cloud.",
    datePublication: "2024-05-15T00:00:00Z",
    dureeMois: 4,
    lieu: "Lomé",
    typeStage: "Temps plein",
    remuneration: 200,
    dateLimiteCandidature: "2024-08-01T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[2],
  },
  {
    id: 3,
    titre: "Stage Marketing Digital",
    description: "Gestion des campagnes publicitaires et analyse des performances.",
    datePublication: "2024-04-20T00:00:00Z",
    dureeMois: 2,
    lieu: "Kara",
    typeStage: "Temps partiel",
    remuneration: 100,
    dateLimiteCandidature: "2024-06-30T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[1],
  },
] 