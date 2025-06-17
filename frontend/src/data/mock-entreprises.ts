import { type Entreprise } from "@/types/entreprise"

/**
 * Données mock pour les entreprises
 * Utilisé en mode développement ou lorsque l'API n'est pas disponible
 */
export const mockEntreprises: Entreprise[] = [
  {
    id: 1,
    nom: "Tech Innov",
    description: "Entreprise spécialisée dans le développement logiciel",
    siteWeb: "https://www.techinnov.com",
    adresse: "123 rue de l'Innovation",
    ville: "Lomé",
    pays: "Togo",
    telephone: "+22890112233",
    emailContact: "contact@techinnov.com",
    specialite: "Developpement",
    dateCreation: "2024-01-15T12:46:21.23494Z",
  },
  {
    id: 2,
    nom: "Digital Solutions",
    description: "Agence de transformation digitale",
    siteWeb: "https://www.digitalsolutions.tg",
    adresse: "456 Avenue du Numérique",
    ville: "Kara",
    pays: "Togo",
    telephone: "+22890223344",
    emailContact: "info@digitalsolutions.tg",
    specialite: "Marketing Digital",
    dateCreation: "2024-02-10T08:30:00Z",
  },
  {
    id: 3,
    nom: "SecureCloud",
    description: "Spécialiste en sécurité informatique et cloud",
    siteWeb: "https://www.securecloud.com",
    adresse: "789 Boulevard de la Sécurité",
    ville: "Lomé",
    pays: "Togo",
    telephone: "+22890334455",
    emailContact: "contact@securecloud.com",
    specialite: "Cybersécurité",
    dateCreation: "2024-03-20T14:15:00Z",
  },
] 