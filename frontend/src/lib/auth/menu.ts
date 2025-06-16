/**
 * Système de menu dynamique basé sur les permissions
 * Ce fichier gère la génération du menu de navigation en fonction du rôle de l'utilisateur
 * et de ses permissions sur les différentes ressources
 */

import {
  LayoutGrid,
  SquarePen,
  Bookmark,
  Building2,
  Users,
  Settings,
  CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Role } from "./roles";
import { hasPermission } from "./permissions";
import type { Resource, Action } from "./permissions";

/**
 * Structure d'un sous-menu dans la navigation
 */
type Submenu = {
  href: string;
  label: string;
};

/**
 * Structure d'un élément de menu dans la navigation
 */
type Menu = {
  href: string;
  label: string;
  icon: LucideIcon;
  submenus?: Submenu[];
};

/**
 * Structure d'un groupe de menus dans la navigation
 */
type Group = {
  groupLabel: string;
  menus: Menu[];
};

/**
 * Génère la liste des menus disponibles en fonction du rôle de l'utilisateur
 * @param role - Le rôle de l'utilisateur connecté
 * @returns {Group[]} Liste des groupes de menus accessibles
 */
export function getMenuList(role: Role): Group[] {
  // Fonction utilitaire pour vérifier les permissions
  const can = (resource: Resource, action: Action) =>
    hasPermission(role, resource, action);

  // Menu de base toujours accessible
  const menu: Group[] = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
        },
      ],
    },
  ];

  // Construction dynamique des menus de contenu basée sur les permissions
  const contentsMenus: Menu[] = [];

  if (can("OFFRE", "READ")) {
    const submenus: Submenu[] = [{ href: "/dashboard/stages/listes", label: "Liste" }];
    if (can("OFFRE", "CREATE")) {
      submenus.unshift({ href: "/dashboard/stages/new", label: "Nouveau" });
    }
    contentsMenus.push({ href: "", label: "Stages", icon: SquarePen, submenus });
  }

  if (can("ENTREPRISE", "READ")) {
    const submenus: Submenu[] = [{ href: "/dashboard/entreprises/listes", label: "Liste" }];
    if (can("ENTREPRISE", "CREATE")) {
      submenus.unshift({ href: "/dashboard/entreprises/new", label: "Nouvelle" });
    }
    contentsMenus.push({ href: "", label: "Entreprises", icon: Building2, submenus });
  }

  if (role === "STUDENT" && can("CANDIDATURE", "CREATE")) {
    contentsMenus.push({
      href: "/dashboard/candidatures/mes",
      label: "Mes Candidatures",
      icon: Bookmark,
    });
  }

  if ((role === "TEACHER" || role === "ADMIN" || role === "SUPER_ADMIN") && can("VALIDATION", "READ")) {
    contentsMenus.push({
      href: "/dashboard/validations",
      label: "Validations",
      icon: CheckCircle,
    });
  }

  if (contentsMenus.length > 0) {
    menu.push({ groupLabel: "Contenus", menus: contentsMenus });
  }

  const settingsMenus: Menu[] = [];

  if (can("USER", "READ")) {
    settingsMenus.push({
      href: "/dashboard/users",
      label: "Utilisateurs",
      icon: Users,
    });
  }

  if (can("SETTINGS", "READ")) {
    settingsMenus.push({
      href: "/account",
      label: "Paramètres",
      icon: Settings,
    });
  }

  if (settingsMenus.length > 0) {
    menu.push({ groupLabel: "Paramètres", menus: settingsMenus });
  }

  return menu;
}
