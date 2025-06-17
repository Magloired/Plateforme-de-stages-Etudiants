export const roles = [
  "Admin",
  "Enseignant",
  "Etudiant",
  "Responsable",
] as const;

export type Role = (typeof roles)[number];