import { Entreprise } from '@/app/types/offreType';

export interface Stage {
  id: string;
  titre: string;
  entreprise: Entreprise;
  description: string;
  dureeMois: string;
  datePublication: string;
  dateLimiteCandidature: string;
  lieu: string;
  typeStage: string;
  competencesRequises: string[];
  remuneration?: string;
  niveau: string;
  secteur: string;
  statut: 'Ouvert' | 'Urgent' | 'Bientôt fermé';
  isActive: boolean;
}

export interface CandidatureForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motivation: File | null;
  cv: File | null;
}