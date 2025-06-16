export interface Stage {
  id: string;
  titre: string;
  entreprise: string;
  description: string;
  duree: string;
  dateDebut: string;
  dateFin: string;
  ville: string;
  typeStage: string;
  competencesRequises: string[];
  remuneration?: string;
  niveau: string;
  secteur: string;
  statut: 'Ouvert' | 'Urgent' | 'Bientôt fermé';
}

export interface CandidatureForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motivation: File | null;
  cv: File | null;
}