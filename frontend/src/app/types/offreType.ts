export interface Entreprise {
  id: number;
  nom: string;
  description?: string;
  siteWeb?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  telephone?: string;
  emailContact?: string;
  specialite?: string;
  dateCreation?: string;
}

export interface Stage {
  id: number;
  titre: string;
  description?: string;
  datePublication?: string;
  dureeMois?: number;
  lieu?: string;
  typeStage?: string;
  remuneration?: number;
  dateLimiteCandidature?: string;
  isActive: boolean;
  entreprise: Entreprise;
}
