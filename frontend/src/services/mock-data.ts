import {
  UserDTO,
  EntrepriseReadDTO,
  EntrepriseCreateDTO,
  OffreStageReadDTO,
  OffreStageCreateDTO,
  CandidatureReadDTO,
  CandidatureCreateDTO,
  ValidationReadDTO,
  ValidationCreateDTO,
  Role,
  Specialite,
  StatutCandidature,
  DecisionValidation,
} from '@/types'

// Mock data pour les utilisateurs
export const mockUsers: UserDTO[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    role: Role.Etudiant,
    isActif: true,
    dateInscription: "2024-01-15T10:00:00Z",
    filiere: "Informatique",
    niveauEtude: "Master",
    telephone: "0123456789",
    specialite: "Developpement",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@email.com",
    role: Role.Enseignant,
    isActif: true,
    dateInscription: "2023-09-01T08:00:00Z",
    filiere: "Informatique",
    niveauEtude: "Doctorat",
    telephone: "0987654321",
    specialite: "Resau",
  },
  {
    id: 3,
    nom: "Bernard",
    prenom: "Pierre",
    email: "pierre.bernard@email.com",
    role: Role.Admin,
    isActif: true,
    dateInscription: "2023-01-01T00:00:00Z",
    filiere: "Administration",
    niveauEtude: "Master",
    telephone: "0555666777",
    specialite: "Developpement",
  },
  {
    id: 4,
    nom: "Petit",
    prenom: "Marie",
    email: "marie.petit@email.com",
    role: Role.Etudiant,
    isActif: true,
    dateInscription: "2024-02-20T14:30:00Z",
    filiere: "Télécommunications",
    niveauEtude: "Licence",
    telephone: "0111222333",
    specialite: "Telecom",
  },
  {
    id: 5,
    nom: "Durand",
    prenom: "Lucas",
    email: "lucas.durand@email.com",
    role: Role.Responsable,
    isActif: true,
    dateInscription: "2023-06-15T11:00:00Z",
    filiere: "Marketing",
    niveauEtude: "Master",
    telephone: "0444555666",
    specialite: "Marketing",
  },
]

// Mock data pour les entreprises
export const mockEntreprises: EntrepriseReadDTO[] = [
  {
    id: 1,
    nom: "TechCorp",
    description: "Entreprise leader dans le développement d'applications web et mobiles",
    siteWeb: "https://techcorp.com",
    adresse: "123 Rue de la Tech",
    ville: "Paris",
    pays: "France",
    telephone: "0123456789",
    emailContact: "contact@techcorp.com",
    specialite: Specialite.Developpement,
    dateCreation: "2023-01-15T09:00:00Z",
  },
  {
    id: 2,
    nom: "NetSolutions",
    description: "Spécialiste en solutions réseau et cybersécurité",
    siteWeb: "https://netsolutions.fr",
    adresse: "456 Avenue des Réseaux",
    ville: "Lyon",
    pays: "France",
    telephone: "0987654321",
    emailContact: "info@netsolutions.fr",
    specialite: Specialite.Resau,
    dateCreation: "2023-03-20T10:30:00Z",
  },
  {
    id: 3,
    nom: "TelecomPlus",
    description: "Opérateur télécom innovant",
    siteWeb: "https://telecomplus.com",
    adresse: "789 Boulevard des Télécoms",
    ville: "Marseille",
    pays: "France",
    telephone: "0555666777",
    emailContact: "contact@telecomplus.com",
    specialite: Specialite.Telecom,
    dateCreation: "2023-05-10T14:00:00Z",
  },
  {
    id: 4,
    nom: "MarketingPro",
    description: "Agence de marketing digital et communication",
    siteWeb: "https://marketingpro.fr",
    adresse: "321 Rue du Marketing",
    ville: "Bordeaux",
    pays: "France",
    telephone: "0111222333",
    emailContact: "hello@marketingpro.fr",
    specialite: Specialite.Marketing,
    dateCreation: "2023-07-05T16:45:00Z",
  },
]

// Mock data pour les offres de stage
export const mockOffres: OffreStageReadDTO[] = [
  {
    id: 1,
    titre: "Développeur Full Stack",
    description: "Développement d'applications web modernes avec React et Node.js",
    datePublication: "2024-01-15T09:00:00Z",
    dureeMois: 6,
    lieu: "Paris",
    typeStage: "PFE",
    remuneration: 1200,
    dateLimiteCandidature: "2024-03-15T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[0],
  },
  {
    id: 2,
    titre: "Ingénieur Réseau",
    description: "Configuration et maintenance d'infrastructures réseau",
    datePublication: "2024-01-20T10:30:00Z",
    dureeMois: 4,
    lieu: "Lyon",
    typeStage: "Stage",
    remuneration: 1000,
    dateLimiteCandidature: "2024-02-28T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[1],
  },
  {
    id: 3,
    titre: "Développeur Mobile",
    description: "Développement d'applications iOS et Android",
    datePublication: "2024-02-01T14:00:00Z",
    dureeMois: 5,
    lieu: "Marseille",
    typeStage: "PFE",
    remuneration: 1100,
    dateLimiteCandidature: "2024-04-01T23:59:59Z",
    isActive: true,
    entreprise: mockEntreprises[2],
  },
  {
    id: 4,
    titre: "Chargé de Marketing Digital",
    description: "Gestion des campagnes marketing et analyse des données",
    datePublication: "2024-02-10T11:15:00Z",
    dureeMois: 3,
    lieu: "Bordeaux",
    typeStage: "Stage",
    remuneration: 900,
    dateLimiteCandidature: "2024-03-31T23:59:59Z",
    isActive: false,
    entreprise: mockEntreprises[3],
  },
]

// Mock data pour les candidatures
export const mockCandidatures: CandidatureReadDTO[] = [
  {
    id: 1,
    userId: 1,
    nomCandidat: "Jean Dupont",
    offreDeStageId: 1,
    titreOffre: "Développeur Full Stack",
    dateSoumission: "2024-01-25T15:30:00Z",
    statut: StatutCandidature.EnAttente,
    documentUrl: "https://example.com/cv-jean-dupont.pdf",
  },
  {
    id: 2,
    userId: 4,
    nomCandidat: "Marie Petit",
    offreDeStageId: 2,
    titreOffre: "Ingénieur Réseau",
    dateSoumission: "2024-01-28T10:15:00Z",
    statut: StatutCandidature.Acceptee,
    documentUrl: "https://example.com/cv-marie-petit.pdf",
  },
  {
    id: 3,
    userId: 1,
    nomCandidat: "Jean Dupont",
    offreDeStageId: 3,
    titreOffre: "Développeur Mobile",
    dateSoumission: "2024-02-05T16:45:00Z",
    statut: StatutCandidature.Refusee,
    documentUrl: "https://example.com/cv-jean-dupont-mobile.pdf",
  },
  {
    id: 4,
    userId: 4,
    nomCandidat: "Marie Petit",
    offreDeStageId: 4,
    titreOffre: "Chargé de Marketing Digital",
    dateSoumission: "2024-02-12T09:20:00Z",
    statut: StatutCandidature.EnCours,
    documentUrl: "https://example.com/cv-marie-petit-marketing.pdf",
  },
]

// Mock data pour les validations
export const mockValidations: ValidationReadDTO[] = [
  {
    id: 1,
    enseignantId: 2,
    nomEnseignant: "Sophie Martin",
    candidatureId: 1,
    nomCandidat: "Jean Dupont",
    decision: DecisionValidation.Accepte,
    dateValidation: "2024-01-30T14:00:00Z",
    commentaire: "Excellent profil, compétences techniques solides",
  },
  {
    id: 2,
    enseignantId: 2,
    nomEnseignant: "Sophie Martin",
    candidatureId: 2,
    nomCandidat: "Marie Petit",
    decision: DecisionValidation.Accepte,
    dateValidation: "2024-02-01T10:30:00Z",
    commentaire: "Profil très intéressant pour ce poste",
  },
  {
    id: 3,
    enseignantId: 2,
    nomEnseignant: "Sophie Martin",
    candidatureId: 3,
    nomCandidat: "Jean Dupont",
    decision: DecisionValidation.Refuse,
    dateValidation: "2024-02-10T16:15:00Z",
    commentaire: "Expérience insuffisante en développement mobile",
  },
  {
    id: 4,
    enseignantId: 5,
    nomEnseignant: "Lucas Durand",
    candidatureId: 4,
    nomCandidat: "Marie Petit",
    decision: DecisionValidation.Accepte,
    dateValidation: "2024-02-15T11:45:00Z",
    commentaire: "Profil marketing très prometteur",
  },
]

// Fonctions utilitaires pour simuler les délais réseau
const simulateNetworkDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms))

const simulateError = (probability: number = 0.1) => {
  if (Math.random() < probability) {
    throw new Error("Erreur simulée du serveur")
  }
}

// Service mock qui simule l'API
export const mockApiService = {
  // Utilisateurs
  users: {
    getAll: async (): Promise<UserDTO[]> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      return mockUsers
    },
    getById: async (id: number): Promise<UserDTO> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      const user = mockUsers.find(u => u.id === id)
      if (!user) throw new Error("Utilisateur non trouvé")
      return user
    },
    create: async (user: UserDTO): Promise<UserDTO> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const newUser = { ...user, id: Math.max(...mockUsers.map(u => u.id)) + 1 }
      mockUsers.push(newUser)
      return newUser
    },
    update: async (id: number, user: Partial<UserDTO>): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockUsers.findIndex(u => u.id === id)
      if (index === -1) throw new Error("Utilisateur non trouvé")
      mockUsers[index] = { ...mockUsers[index], ...user }
    },
    delete: async (id: number): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockUsers.findIndex(u => u.id === id)
      if (index === -1) throw new Error("Utilisateur non trouvé")
      mockUsers.splice(index, 1)
    },
  },

  // Entreprises
  entreprises: {
    getAll: async (): Promise<EntrepriseReadDTO[]> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      return mockEntreprises
    },
    getById: async (id: number): Promise<EntrepriseReadDTO> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      const entreprise = mockEntreprises.find(e => e.id === id)
      if (!entreprise) throw new Error("Entreprise non trouvée")
      return entreprise
    },
    create: async (entreprise: EntrepriseCreateDTO): Promise<EntrepriseReadDTO> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const newEntreprise: EntrepriseReadDTO = {
        ...entreprise,
        id: Math.max(...mockEntreprises.map(e => e.id)) + 1,
        dateCreation: new Date().toISOString(),
      }
      mockEntreprises.push(newEntreprise)
      return newEntreprise
    },
    update: async (id: number, entreprise: EntrepriseCreateDTO): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockEntreprises.findIndex(e => e.id === id)
      if (index === -1) throw new Error("Entreprise non trouvée")
      mockEntreprises[index] = { ...mockEntreprises[index], ...entreprise }
    },
    delete: async (id: number): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockEntreprises.findIndex(e => e.id === id)
      if (index === -1) throw new Error("Entreprise non trouvée")
      mockEntreprises.splice(index, 1)
    },
  },

  // Offres de stage
  offresDeStage: {
    getAll: async (): Promise<OffreStageReadDTO[]> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      return mockOffres
    },
    getById: async (id: number): Promise<OffreStageReadDTO> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      const offre = mockOffres.find(o => o.id === id)
      if (!offre) throw new Error("Offre non trouvée")
      return offre
    },
    create: async (offre: OffreStageCreateDTO): Promise<OffreStageReadDTO> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const newOffre: OffreStageReadDTO = {
        ...offre,
        id: Math.max(...mockOffres.map(o => o.id)) + 1,
        datePublication: new Date().toISOString(),
        isActive: true,
        entreprise: mockEntreprises.find(e => e.id === offre.entrepriseId)!,
      }
      mockOffres.push(newOffre)
      return newOffre
    },
    update: async (id: number, offre: OffreStageCreateDTO): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockOffres.findIndex(o => o.id === id)
      if (index === -1) throw new Error("Offre non trouvée")
      mockOffres[index] = { ...mockOffres[index], ...offre }
    },
    delete: async (id: number): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockOffres.findIndex(o => o.id === id)
      if (index === -1) throw new Error("Offre non trouvée")
      mockOffres.splice(index, 1)
    },
    getCount: async (): Promise<number> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      return mockOffres.length
    },
  },

  // Candidatures
  candidatures: {
    getAll: async (): Promise<CandidatureReadDTO[]> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      return mockCandidatures
    },
    getById: async (id: number): Promise<CandidatureReadDTO> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      const candidature = mockCandidatures.find(c => c.id === id)
      if (!candidature) throw new Error("Candidature non trouvée")
      return candidature
    },
    create: async (candidature: CandidatureCreateDTO): Promise<CandidatureReadDTO> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const user = mockUsers.find(u => u.id === candidature.userId)
      const offre = mockOffres.find(o => o.id === candidature.offreDeStageId)
      if (!user || !offre) throw new Error("Données invalides")
      
      const newCandidature: CandidatureReadDTO = {
        ...candidature,
        id: Math.max(...mockCandidatures.map(c => c.id)) + 1,
        nomCandidat: `${user.prenom} ${user.nom}`,
        titreOffre: offre.titre,
        dateSoumission: new Date().toISOString(),
        statut: StatutCandidature.EnAttente,
      }
      mockCandidatures.push(newCandidature)
      return newCandidature
    },
    update: async (id: number, candidature: Partial<CandidatureReadDTO>): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockCandidatures.findIndex(c => c.id === id)
      if (index === -1) throw new Error("Candidature non trouvée")
      mockCandidatures[index] = { ...mockCandidatures[index], ...candidature }
    },
    delete: async (id: number): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockCandidatures.findIndex(c => c.id === id)
      if (index === -1) throw new Error("Candidature non trouvée")
      mockCandidatures.splice(index, 1)
    },
  },

  // Validations
  validations: {
    getAll: async (): Promise<ValidationReadDTO[]> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      return mockValidations
    },
    getById: async (id: number): Promise<ValidationReadDTO> => {
      await simulateNetworkDelay()
      simulateError(0.05)
      const validation = mockValidations.find(v => v.id === id)
      if (!validation) throw new Error("Validation non trouvée")
      return validation
    },
    create: async (validation: ValidationCreateDTO): Promise<ValidationReadDTO> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const enseignant = mockUsers.find(u => u.id === validation.enseignantId)
      const candidature = mockCandidatures.find(c => c.id === validation.candidatureId)
      if (!enseignant || !candidature) throw new Error("Données invalides")
      
      const newValidation: ValidationReadDTO = {
        ...validation,
        id: Math.max(...mockValidations.map(v => v.id)) + 1,
        nomEnseignant: `${enseignant.prenom} ${enseignant.nom}`,
        nomCandidat: candidature.nomCandidat,
        dateValidation: new Date().toISOString(),
      }
      mockValidations.push(newValidation)
      return newValidation
    },
    update: async (id: number, validation: Partial<ValidationReadDTO>): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockValidations.findIndex(v => v.id === id)
      if (index === -1) throw new Error("Validation non trouvée")
      mockValidations[index] = { ...mockValidations[index], ...validation }
    },
    delete: async (id: number): Promise<void> => {
      await simulateNetworkDelay()
      simulateError(0.1)
      const index = mockValidations.findIndex(v => v.id === id)
      if (index === -1) throw new Error("Validation non trouvée")
      mockValidations.splice(index, 1)
    },
  },

  // Dashboard
  dashboard: {
    getStats: async () => {
      await simulateNetworkDelay()
      simulateError(0.05)
      
      // Calculer les statistiques par statut
      const candidaturesParStatut = mockCandidatures.reduce((acc, candidature) => {
        acc[candidature.statut] = (acc[candidature.statut] || 0) + 1
        return acc
      }, {} as Record<StatutCandidature, number>)

      // Calculer les offres par ville
      const offresParVille = mockOffres.reduce((acc, offre) => {
        const ville = offre.lieu || "Non spécifié"
        acc[ville] = (acc[ville] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Calculer les offres par type
      const offresParType = mockOffres.reduce((acc, offre) => {
        const type = offre.typeStage || "Non spécifié"
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      return {
        totalUsers: mockUsers.length,
        totalEntreprises: mockEntreprises.length,
        totalOffres: mockOffres.length,
        totalCandidatures: mockCandidatures.length,
        totalValidations: mockValidations.length,
        candidaturesParStatut,
        offresParVille,
        offresParType,
      }
    },
  },
} 