export enum Role {
  Etudiant = "Etudiant",
  Enseignant = "Enseignant",
  Responsable = "Responsable",
  Admin = "Admin",
}

export interface Candidature {
  id: number
  titre: string
  statut: string
  datePostulation: string
}

export interface User {
  id: number
  nom: string
  prenom: string
  avatar_url: string
  email: string
  role: Role
  dateInscription: string
  isActif: boolean
  filiere: string
  niveauEtude: string
  telephone: string
  candidatures: Candidature[]
}
