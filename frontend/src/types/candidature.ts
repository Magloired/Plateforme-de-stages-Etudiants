// types/candidature.ts

/**
 * Enum représentant le statut d'une candidature.
 * Exemple de valeurs possibles (à adapter selon ton enum C#) :
 * - EnAttente
 * - Acceptee
 * - Refusee
 */


export enum StatutCandidature {
  EnAttente = "EnAttente",
  Acceptee = "Acceptee",
  Refusee = "Refusee",
  EnCours = "EnCours",
  Validee = "Validee",
  Annulee = "Annulee",
}

/**
 * DTO utilisé lors de la création d'une candidature (requête POST).
 * Ce type correspond aux données envoyées à l'API pour créer une nouvelle candidature.
 */
export interface CandidatureCreateDTO {
  userId: number;
  offreDeStageId: number;
  documentUrl?: string;
}

/**
 * DTO utilisé pour lire les données d'une candidature (réponse GET).
 * Ce type correspond aux données retournées par l'API lors de la récupération d'une candidature.
 */
export interface CandidatureReadDTO {
  id: number;
  userId: number;
  nomCandidat: string;
  offreDeStageId: number;
  titreOffre: string;
  dateSoumission: string; // Date au format ISO
  statut: StatutCandidature;
  documentUrl?: string;
}

/**
 * DTO utilisé lors de la mise à jour d'une candidature (requête PUT/PATCH).
 * Ce type est utilisé pour modifier le statut ou le document d'une candidature existante.
 */
export interface CandidatureUpdateDTO {
  statut: StatutCandidature;
  documentUrl?: string;
}
