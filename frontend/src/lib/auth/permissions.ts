/**
 * Système de gestion des permissions basé sur les rôles (RBAC)
 * Ce fichier définit les ressources, actions et permissions disponibles pour chaque rôle
 */

// lib/auth/permissions.ts
import { Role } from "./roles";

/**
 * Liste des ressources disponibles dans l'application
 * Chaque ressource représente une entité ou une fonctionnalité qui peut être protégée
 */
export const resources = {
  OFFRE: "offre",
  ENTREPRISE: "entreprise",
  CANDIDATURE: "candidature",
  VALIDATION: "validation",
  USER: "user",
  SETTINGS: "settings",
} as const;

export type Resource = keyof typeof resources;
/* 

*/
/**
 * Liste des actions possibles sur les ressources
 * CREATE: Créer une nouvelle ressource
 * READ: Lire/voir une ressource
 * UPDATE: Modifier une ressource existante
 * DELETE: Supprimer une ressource
 * MANAGE: Gérer tous les aspects d'une ressource (inclut toutes les autres actions)
 */
export const actions = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
  MANAGE: "manage",
} as const;

export type Action = keyof typeof actions;

/**
 * Matrice de permissions définissant les actions autorisées pour chaque rôle sur chaque ressource
 * SUPER_ADMIN: Accès total à toutes les ressources
 * ADMIN: Accès étendu mais limité sur certaines ressources
 * TEACHER: Accès en lecture et validation
 * STUDENT: Accès limité aux offres et candidatures
 * GUEST: Aucun accès
 */
export const rolePermissions: Record<
  Role,
  Record<Resource, Action[]>
> = {
  SUPER_ADMIN: {
    OFFRE: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"],
    ENTREPRISE: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"],
    CANDIDATURE: ["READ", "MANAGE"],
    VALIDATION: ["READ", "MANAGE"],
    USER: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"],
    SETTINGS: ["READ", "UPDATE"],
  },
  ADMIN: {
    OFFRE: ["CREATE", "READ", "UPDATE", "DELETE"],
    ENTREPRISE: ["CREATE", "READ", "UPDATE", "DELETE"],
    CANDIDATURE: ["READ"],
    VALIDATION: ["READ"],
    USER: ["READ", "UPDATE"],
    SETTINGS: ["READ", "UPDATE"],
  },
  TEACHER: {
    OFFRE: ["READ"],
    ENTREPRISE: ["READ"],
    CANDIDATURE: ["READ"],
    VALIDATION: ["READ", "UPDATE"],
    USER: ["READ"],
    SETTINGS: [],
  },
  STUDENT: {
    OFFRE: ["READ"],
    ENTREPRISE: ["READ"],
    CANDIDATURE: ["CREATE", "READ"],
    VALIDATION: [],
    USER: ["READ"],
    SETTINGS: [],
  },
  GUEST: {
    OFFRE: [],
    ENTREPRISE: [],
    CANDIDATURE: [],
    VALIDATION: [],
    USER: [],
    SETTINGS: [],
  },
};

/**
 * Vérifie si un rôle a la permission d'effectuer une action sur une ressource
 * @param role - Le rôle de l'utilisateur
 * @param resource - La ressource sur laquelle l'action est effectuée
 * @param action - L'action à vérifier
 * @returns {boolean} True si l'action est autorisée, False sinon
 */
export function hasPermission(
  role: Role,
  resource: Resource,
  action: Action
): boolean {
  return rolePermissions[role]?.[resource]?.includes(action) ?? false;
}

