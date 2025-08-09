// types/validation.ts

import { Specialite } from "./entreprise"

/**
 * Enum pour représenter les décisions de validation
 */

export enum DecisionValidation {
  Accepte = "Accepte",
  Refuse = "Refuse"
}

/**
 * DTO utilisé lors de la création d'une validation (requête POST).
 * Contient les IDs des entités concernées, la décision et un commentaire optionnel.
 * IMPORTANT: Les noms des propriétés doivent correspondre exactement au DTO backend C# (PascalCase)
 */
export interface ValidationCreateDTO {
  EnseignantId: number;
  CandidatureId: number;
  Decision: DecisionValidation;
  Commentaire?: string;
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

