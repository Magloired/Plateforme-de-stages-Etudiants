

export interface RegisterFormData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  role: "Etudiant" | "Enseignant" | "Responsable";
}

export type PasswordStrength = {
  score: number;
  label: string;
  color: string;
};
