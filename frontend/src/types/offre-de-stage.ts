import { EntrepriseReadDTO } from "./entreprise"



/**
 * DTO utilisé lors de la création d'une offre de stage (requête POST).
 * Ce type correspond aux données envoyées à l'API pour créer une nouvelle offre.
 */
export interface OffreStageCreateDTO {
  titre: string;
  description?: string;
  dureeMois: number;
  lieu?: string;
  typeStage?: string;
  remuneration?: number;
  dateLimiteCandidature?: string; // Date ISO (ex: "2025-08-07T10:00:00Z")
  entrepriseId: number;
}

/**
 * DTO utilisé pour lire les données d'une offre de stage (réponse GET).
 * Ce type correspond aux données retournées par l'API lorsqu'on récupère une offre.
 */
export interface OffreStageReadDTO {
  id: number;
  titre: string;
  description?: string;
  datePublication: string; // Date ISO
  dureeMois: number;
  lieu?: string;
  typeStage?: string;
  remuneration?: number;
  dateLimiteCandidature?: string; // Date ISO
  isActive: boolean;
  entreprise: EntrepriseReadDTO;
}

/**
 * DTO utilisé lors de la mise à jour d'une offre de stage (requête PUT/PATCH).
 * Ce type est utilisé pour modifier une offre de stage existante.
 */
export interface OffreStageUpdateDTO {
  titre: string;
  description?: string;
  dureeMois: number;
  lieu?: string;
  typeStage?: string;
  remuneration?: number;
  dateLimiteCandidature?: string; // Date ISO
  estActive: boolean;
  entrepriseId: number;
}


