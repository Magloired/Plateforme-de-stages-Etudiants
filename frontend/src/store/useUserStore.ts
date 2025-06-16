import { create } from "zustand";

/**
 * Enumération des rôles possibles dans l'application
 * @typedef {("SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "GUEST")} Role
 */
export type Role = "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "GUEST";

/**
 * Interface représentant un utilisateur dans l'application
 * @typedef {Object} User
 * @property {number} id - Identifiant unique de l'utilisateur
 * @property {string} name - Nom de l'utilisateur
 * @property {string} email - Adresse email de l'utilisateur
 * @property {string} [avatarUrl] - URL de l'avatar de l'utilisateur (optionnel)
 * @property {Role} role - Rôle de l'utilisateur dans l'application
 */
export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Role;
};

/**
 * Interface définissant le store Zustand pour la gestion des utilisateurs
 * @typedef {Object} UserStore
 * @property {User | null} user - L'utilisateur actuellement connecté ou null
 * @property {boolean} isAuthenticated - État d'authentification de l'utilisateur
 * @property {Function} setUser - Fonction pour définir l'utilisateur connecté
 * @property {Function} clearUser - Fonction pour déconnecter l'utilisateur
 * @property {Function} setIsAuthenticated - Fonction pour mettre à jour l'état d'authentification
 */
type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (state: boolean) => void;
};

/**
 * Store Zustand pour la gestion de l'état de l'utilisateur
 * @returns {UserStore} Le store avec les méthodes et états pour gérer l'utilisateur
 */
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  setIsAuthenticated: (state) => set({ isAuthenticated: state }),
}));
