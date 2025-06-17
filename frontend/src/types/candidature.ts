export enum StatutCandidature {
  EnAttente = "EnAttente",
  Acceptee = "Acceptee",
  Refusee = "Refusee",
  EnCours = "EnCours",
  Validee = "Validee",
  Annulee = "Annulee",
}

export interface Candidature {
  id: number
  userId: number
  nomCandidat: string
  offreDeStageId: number
  titreOffre: string
  dateSoumission: string
  statut: StatutCandidature
  documentUrl: string
}
