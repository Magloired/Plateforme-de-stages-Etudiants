// types/validation.ts

/**
 * Enum représentant la décision de validation.
 * Correspond à l'enum backend `DecisionValidation`.
 */
export enum DecisionValidation {
  Accepte = "Accepte",
  Refuse = "Refuse"
}

/**
 * DTO utilisé lors de la création d'une validation (requête POST).
 * Contient les IDs des entités concernées, la décision et un commentaire optionnel.
 */
export interface ValidationCreateDTO {
  enseignantId: number;
  candidatureId: number;
  decision: DecisionValidation;
  commentaire?: string;
}

/**
 * DTO utilisé pour lire les données d'une validation (réponse GET).
 * Contient les détails liés à la validation, avec noms et dates.
 */
export interface ValidationReadDTO {
  id: number;
  enseignantId: number;
  nomEnseignant: string;
  candidatureId: number;
  nomCandidat: string;
  decision: DecisionValidation;
  dateValidation: string; // Date au format ISO
  commentaire?: string;
}

/**
 * DTO utilisé lors de la mise à jour d'une validation (requête PUT/PATCH).
 * Permet de modifier la décision et/ou le commentaire.
 */
export interface ValidationUpdateDTO {
  decision: DecisionValidation;
  commentaire?: string;
}

