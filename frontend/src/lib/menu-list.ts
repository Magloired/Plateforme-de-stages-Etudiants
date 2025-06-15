/**
 * Configuration statique du menu de navigation du dashboard
 * Ce fichier définit la structure complète du menu sans prendre en compte les permissions
 * Utilisé principalement pour le développement et les tests
 * 
 * Note: Pour la version en production, utilisez plutôt le système de menu dynamique
 * basé sur les permissions (@/lib/auth/menu.ts)
 */

import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Building2,
  CheckCircle,
} from "lucide-react";

/**
 * Structure d'un sous-menu dans la navigation
 */
type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

/**
 * Structure d'un élément de menu dans la navigation
 */
type Menu = {
  href: string;
  label: string;
  active?: boolean;
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
 * Retourne la liste complète des menus du dashboard
 * Cette version statique inclut tous les menus possibles sans vérification des permissions
 * 
 * @param pathname - Le chemin actuel de l'URL (non utilisé dans cette version statique)
 * @returns {Group[]} Liste complète des groupes de menus
 */
export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    
    {
      groupLabel: "Contenus",
      menus: [
        {
          href: "",
          label: "Stages",
          icon: SquarePen,
          submenus: [
            {
              href: "/dashboard/stages/new",
              label: "Nouveau",
            },
            {
              href: "/dashboard/stages/listes",
              label: "Liste",
            },
          ],
        },
        {
          href: "",
          label: "Entreprises",
          icon: Building2,
          submenus: [
            {
              href: "/dashboard/entreprises/new",
              label: "Nouvelle",
            },
            {
              href: "/dashboard/entreprises/listes",
              label: "Liste",
            },
          ],
        },
        {
          href: "/dashboard/candidatures/mes",
          label: "Mes Candidatures",
          icon: Bookmark,
        },
        {
          href: "/dashboard/validations",
          label: "Validations",
          icon: CheckCircle,
        },
      ],
    },
    {
      groupLabel: "Paramètres",
      menus: [
        {
          href: "/dashboard/users",
          label: "Utilisateurs",
          icon: Users,
        },
        {
          href: "/account",
          label: "Compte",
          icon: Settings,
        },
      ],
    },
  ];
}
