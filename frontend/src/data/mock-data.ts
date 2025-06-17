import { type User, Role } from "@/types/user"
import { type Entreprise } from "@/types/entreprise"
import { type OffreDeStage } from "@/types/offre-de-stage"
import { type Candidature, StatutCandidature } from "@/types/candidature"
import { type Validation } from "@/types/validation"

// Données mock pour les entreprises
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

// Données mock pour les offres de stage
export const mockOffresDeStage: OffreDeStage[] = [
  {
    id: 1,
    titre: "Stage en développement web",
    description: "Participer au développement d'une application web avec ASP.NET et React.",
    datePublication: "2024-05-01T00:00:00Z",
    dureeMois: 3,
    lieu: "Lomé",
    typeStage: "Temps plein",
    remuneration: 150,
    dateLimiteCandidature: "2024-07-01T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[0],
  },
  {
    id: 2,
    titre: "Stage en Sécurité de Serveur cloud",
    description: "Mise en place et maintenance de solutions de sécurité cloud.",
    datePublication: "2024-05-15T00:00:00Z",
    dureeMois: 4,
    lieu: "Lomé",
    typeStage: "Temps plein",
    remuneration: 200,
    dateLimiteCandidature: "2024-08-01T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[2],
  },
  {
    id: 3,
    titre: "Stage Marketing Digital",
    description: "Gestion des campagnes publicitaires et analyse des performances.",
    datePublication: "2024-04-20T00:00:00Z",
    dureeMois: 2,
    lieu: "Kara",
    typeStage: "Temps partiel",
    remuneration: 100,
    dateLimiteCandidature: "2024-06-30T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[1],
  },
]

// Données mock pour les candidatures
export const mockCandidatures: Candidature[] = [
  {
    id: 1,
    userId: 1,
    nomCandidat: "Marie Dupont",
    offreDeStageId: 1,
    titreOffre: "Stage en développement web",
    dateSoumission: "2024-06-10T09:30:00Z",
    statut: StatutCandidature.EnAttente,
    documentUrl: "https://example.com/documents/cv-marie-dupont.pdf",
  },
  {
    id: 2,
    userId: 7,
    nomCandidat: "Emma Leroy",
    offreDeStageId: 2,
    titreOffre: "Stage en Sécurité de Serveur cloud",
    dateSoumission: "2024-06-15T13:09:22Z",
    statut: StatutCandidature.Acceptee,
    documentUrl: "https://example.com/documents/cv-emma-leroy.pdf",
  },
  {
    id: 3,
    userId: 9,
    nomCandidat: "Léa Faure",
    offreDeStageId: 1,
    titreOffre: "Stage en développement web",
    dateSoumission: "2024-06-12T14:20:00Z",
    statut: StatutCandidature.EnCours,
    documentUrl: "https://example.com/documents/cv-lea-faure.pdf",
  },
]

// Données mock pour les validations
export const mockValidations: Validation[] = [
  {
    id: 1,
    enseignantId: 2,
    nomEnseignant: "Pierre Martin",
    candidatureId: 2,
    nomCandidat: "Emma Leroy",
    decision: "Accepte",
    dateValidation: "2024-06-16T10:30:00Z",
    commentaire: "Excellent profil technique, candidature validée.",
  },
  {
    id: 2,
    enseignantId: 8,
    nomEnseignant: "Lucas Garnier",
    candidatureId: 3,
    nomCandidat: "Léa Faure",
    decision: "En cours",
    dateValidation: "2024-06-17T14:20:00Z",
    commentaire: "Évaluation en cours des compétences techniques.",
  },
]

// Statistiques pour le dashboard
export const mockDashboardStats = {
  totalCandidatures: mockCandidatures.length,
  totalOffres: mockOffresDeStage.length,
  totalEntreprises: mockEntreprises.length,
  totalValidations: mockValidations.length,
  candidaturesParStatut: {
    [StatutCandidature.EnAttente]: mockCandidatures.filter(c => c.statut === StatutCandidature.EnAttente).length,
    [StatutCandidature.Acceptee]: mockCandidatures.filter(c => c.statut === StatutCandidature.Acceptee).length,
    [StatutCandidature.EnCours]: mockCandidatures.filter(c => c.statut === StatutCandidature.EnCours).length,
    [StatutCandidature.Refusee]: mockCandidatures.filter(c => c.statut === StatutCandidature.Refusee).length,
    [StatutCandidature.Validee]: mockCandidatures.filter(c => c.statut === StatutCandidature.Validee).length,
    [StatutCandidature.Annulee]: mockCandidatures.filter(c => c.statut === StatutCandidature.Annulee).length,
  },
  offresParVille: {
    "Lomé": mockOffresDeStage.filter(o => o.lieu === "Lomé").length,
    "Kara": mockOffresDeStage.filter(o => o.lieu === "Kara").length,
  },
  offresParType: {
    "Temps plein": mockOffresDeStage.filter(o => o.typeStage === "Temps plein").length,
    "Temps partiel": mockOffresDeStage.filter(o => o.typeStage === "Temps partiel").length,
  },
} 