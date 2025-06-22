import { type Validation } from "@/types/validation"

/**
 * Données mock pour les validations de candidatures
 * Utilisé en mode développement ou lorsque l'API n'est pas disponible
 */
export const mockValidations: Validation[] = [
  {
    id: 1,
    enseignantId: 2,
    nomEnseignant: "Pierre Martin",
    candidatureId: 2,
    nomCandidat: "Emma Leroy",
    decision: "Accepte",
    dateValidation: "2024-06-16T10:30:00Z",
    commentaire: "Excellent profil technique, candidature validée.",
  },
  {
    id: 2,
    enseignantId: 8,
    nomEnseignant: "Lucas Garnier",
    candidatureId: 3,
    nomCandidat: "Léa Faure",
    decision: "En cours",
    dateValidation: "2024-06-17T14:20:00Z",
    commentaire: "Évaluation en cours des compétences techniques.",
  },
] 