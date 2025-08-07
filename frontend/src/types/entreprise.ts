// types/entreprise.ts

/**
 * Enum représentant les différentes spécialités qu'une entreprise peut avoir.
 * Utilisé dans les champs `specialite` des DTO.
 */
export enum Specialite {
  Resau = "Resau",
  Developpement = "Developpement",
  Telecom = "Telecom",
  Marketing = "Marketing"
}

/**
 * DTO utilisé lors de la création d'une entreprise (requête POST).
 * Ce type correspond au corps de la requête envoyé à l'API pour créer une entreprise.
 */
export interface EntrepriseCreateDTO {
  nom: string;
  description?: string;
  siteWeb?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  telephone?: string;
  emailContact: string;
  specialite: Specialite;
}

/**
 * DTO utilisé pour lire les données d'une entreprise (réponse GET).
 * Ce type correspond aux données renvoyées par l'API lorsqu'on récupère une entreprise.
 */
export interface EntrepriseReadDTO {
  id: number;
  nom: string;
  description?: string;
  siteWeb?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  telephone?: string;
  emailContact: string;
  specialite: Specialite;
  dateCreation: string; // Date au format ISO (ex: "2025-08-07T10:00:00Z")
}

/**
 * DTO utilisé lors de la mise à jour d'une entreprise (requête PUT/PATCH).
 * Ce type correspond au corps de la requête envoyé à l'API pour modifier une entreprise existante.
 */
export interface EntrepriseUpdateDTO {
  nom: string;
  description?: string;
  siteWeb?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  telephone?: string;
  emailContact: string;
  specialite: Specialite;
}
