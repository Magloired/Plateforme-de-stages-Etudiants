

//types/user.ts

/**
 * Enum représentant les rôles possibles d'un utilisateur dans le système.
 * Doit correspondre à l'énumération backend `Role`.
 */
export enum Role {
  Etudiant = "Etudiant",
  Enseignant = "Enseignant",
  Responsable = "Responsable",
  Admin = "Admin",
}

/**
 * DTO utilisé pour représenter un utilisateur authentifié ou enregistré.
 * Il correspond au modèle retourné dans l'API ou utilisé dans les vues (profil, dashboard...).
 */
export interface UserDTO {
  id: number;
  nom?: string;
  prenom?: string;
  email: string;
  role: Role;
  isActif: boolean;
  dateInscription: string; // Date ISO
  filiere?: string;
  niveauEtude?: string;
  telephone?: string;
  specialite?: string; // Utilise l'enum Specialite depuis entreprise.ts
}

/**
 * DTO utilisé lors de la tentative de connexion d'un utilisateur (requête POST /login).
 */
export interface LoginDTO {
  email: string;
  password: string;
}

/**
 * DTO retourné après une authentification réussie.
 * Contient le token JWT et les données de l'utilisateur.
 */
export interface AuthResultDTO {
  token: string;
  user: UserDTO;
  message: string;
}

/**
 * DTO utilisé lors de l'inscription d'un nouvel utilisateur (requête POST /register).
 */
export interface RegisterDTO {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: Role;
  filiere?: string;
  niveauEtude?: string;
  telephone?: string;
}





