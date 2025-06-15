
'use client';

import { useState, useEffect } from 'react';
import Stats from '@/components/Stats';
import Filters from '@/components/Filters';
import StageCard from '@/components/StageCard';
import DetailModal from '@/components/DetailModal';
import CandidatureModal from '@/components/CanditatureModal';
import { Stage, CandidatureForm } from '@/components/types';

export default function StagesPage() {
  
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCandidatureModal, setShowCandidatureModal] = useState(false);

  const [candidatureForm, setCandidatureForm] = useState<CandidatureForm>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motivation: null,
    cv: null,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVille, setSelectedVille] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSecteur, setSelectedSecteur] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const villes = ['Lomé', 'Sokodé', 'Kara'];
  const typesStage =
   ['Stage pré-emploi',
  'Stage académique',
  "Stage de fin d'études",
  'Stage d’été',
  'Stage professionnel',

];
  const secteurs = ['Informatique', 'Marketing', 'Finance', 'Sécurité IT', 'Commerce']; // Ajout secteurs pour correspondre aux stages

  useEffect(() => {

    const fakeStages: Stage[] = [
      {
        id: '1',
        titre: 'Stage en développement web full-stack',
        entreprise: 'TechCorp Togo',
        description: "Développement d'applications web modernes avec focus sur les solutions locales. Vous travaillerez sur des projets innovants en utilisant les dernières technologies web. L'équipe vous accompagnera dans votre montée en compétences et vous participerez à des projets concrets pour des clients réels.",
        duree: '6 mois',
        dateDebut: '2024-07-01',
        dateFin: '2024-12-31',
        ville: 'Lomé',
        typeStage: 'Stage pré-emploi',
        competencesRequises: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
        remuneration: '50000 FCFA/mois',
        niveau: 'Bac+3/4',
        secteur: 'Informatique',
        statut: 'Ouvert'
      },
      {
        id: '2',
        titre: 'Stage en cybersécurité',
        entreprise: 'SecureNet Africa',
        description: "Stage en sécurité informatique adapté au contexte africain. Formation aux dernières technologies de protection des données et analyse des vulnérabilités systèmes. Vous apprendrez les bonnes pratiques de sécurité et participerez à des audits de sécurité.",
        duree: '4 mois',
        dateDebut: '2024-06-01',
        dateFin: '2024-09-30',
        ville: 'Kara',
        typeStage: 'Stage académique',
        competencesRequises: ['Sécurité réseau', 'Python', 'Analyse des risques', 'Ethical Hacking'],
        niveau: 'Bac+4/5',
        secteur: 'Sécurité IT',
        statut: 'Urgent'
      },
      {
        id: '3',
        titre: 'Stage en marketing digital',
        entreprise: 'Digital West Africa',
        description: "Stage en marketing numérique avec focus sur les marchés africains. Gestion de campagnes publicitaires, analyse de données et optimisation des performances marketing. Vous découvrirez les spécificités du marketing digital en Afrique.",
        duree: '3 mois',
        dateDebut: '2024-08-01',
        dateFin: '2024-10-31',
        ville: 'Lomé',
        typeStage: "Stage de fin d'études",
        competencesRequises: ['Google Analytics', 'Facebook Ads', 'SEO', 'Content Marketing'],
        remuneration: '35000 FCFA/mois',
        niveau: 'Bac+3',
        secteur: 'Marketing',
        statut: 'Bientôt fermé'
      },
      {
        id: '4',
        titre: 'Stage en développement mobile',
        entreprise: 'MobileApps Togo',
        description: "Développement d'applications mobiles natives et hybrides pour le marché local. Création d'interfaces utilisateur modernes et intégration avec des APIs backend. Vous travaillerez sur des apps destinées au marché togolais.",
        duree: '5 mois',
        dateDebut: '2024-09-01',
        dateFin: '2025-01-31',
        ville: 'Sokodé',
        typeStage: 'Stage pré-emploi',
        competencesRequises: ['React Native', 'Flutter', 'Java', 'Swift'],
        remuneration: '45000 FCFA/mois',
        niveau: 'Bac+3/4',
        secteur: 'Informatique',
        statut: 'Ouvert'
      },
      {
        id: '5',
        titre: 'Stage en finance et comptabilité',
        entreprise: 'EcoBank Togo',
        description: "Stage dans le domaine bancaire avec focus sur l'analyse financière et la gestion des risques. Accompagnement dans les opérations quotidiennes et formation aux outils financiers. Excellente opportunité dans le secteur bancaire.",
        duree: '4 mois',
        dateDebut: '2024-07-15',
        dateFin: '2024-11-15',
        ville: 'Lomé',
        typeStage: 'Stage académique',
        competencesRequises: ['Excel avancé', 'Analyse financière', 'Comptabilité', 'Gestion des risques'],
        remuneration: '40000 FCFA/mois',
        niveau: 'Bac+3/4',
        secteur: 'Finance',
        statut: 'Ouvert'
      },
      {
        id: '6',
        titre: 'Stage en commerce international',
        entreprise: 'TradeHub Africa',
        description: "Stage axé sur le développement commercial et les relations internationales. Participation aux négociations commerciales et gestion des partenariats stratégiques. Vous découvrirez les enjeux du commerce en Afrique de l'Ouest.",
        duree: '3 mois',
        dateDebut: '2024-08-15',
        dateFin: '2024-11-15',
        ville: 'Kpalimé',
        typeStage: "Stage de fin d'études",
        competencesRequises: ['Négociation', 'Anglais', 'Logistique', 'Relations client'],
        niveau: 'Bac+3',
        secteur: 'Commerce',
        statut: 'Ouvert'
      }
    ];

    setStages(fakeStages);
  }, []);

  const filteredStages = stages.filter((stage) => {
    const matchSearch = stage.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchVille = selectedVille ? stage.ville === selectedVille : true;
    const matchType = selectedType ? stage.typeStage === selectedType : true;
    const matchSecteur = selectedSecteur ? stage.secteur === selectedSecteur : true; // Correction ici
    return matchSearch && matchVille && matchType && matchSecteur;
  });

  // Gestion modales
  const openDetailModal = (stage: Stage) => {
    setSelectedStage(stage);
    setShowDetailModal(true);
  };

  const openCandidatureModal = (stage: Stage) => {
    setSelectedStage(stage);
    setShowCandidatureModal(true);
  };

  const closeModals = () => {
    setShowDetailModal(false);
    setShowCandidatureModal(false);
    setSelectedStage(null);
  };

  const handleFormChange = (field: keyof CandidatureForm, value: string | File | null) => {
    setCandidatureForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitCandidature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStage) return;

    const formData = new FormData();
    formData.append('Nom', candidatureForm.nom);
    formData.append('Prenom', candidatureForm.prenom);
    formData.append('Email', candidatureForm.email);
    formData.append('Telephone', candidatureForm.telephone);
    if (candidatureForm.cv) formData.append('CV', candidatureForm.cv);
    if (candidatureForm.motivation) formData.append('LettreMotivation', candidatureForm.motivation);
    formData.append('StageId', selectedStage.id);

    // TODO: Modifier URL API quand prête
    await fetch('https://localhost:5001/api/candidatures', {
      method: 'POST',
      body: formData,
    });

    alert('Candidature envoyée avec succès !');
    closeModals();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
      <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Plateforme de Stages Professionnels
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez des opportunités de stages exceptionnelles au Togo et développez vos compétences 
            professionnelles avec les meilleures entreprises du pays
          </p>
        </div>
      <Stats statsData={{ total: stages.length, urgent: 3, remuneres: 5, secteurs: 8 }} />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedVille={selectedVille}
        setSelectedVille={setSelectedVille}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedSecteur={selectedSecteur}
        setSelectedSecteur={setSelectedSecteur}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        villes={villes}
        typesStage={typesStage}
        secteurs={secteurs}
        filteredStages={filteredStages}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStages.map((stage) => (
          <StageCard
            key={stage.id}
            stage={stage}
            onOpenDetails={openDetailModal}
            onApply={openCandidatureModal}
          />
        ))}
      </div>

      {showDetailModal && selectedStage && (
        <DetailModal
          stage={selectedStage}
          onClose={closeModals}
          onApply={() => {
            setShowDetailModal(false);
            setShowCandidatureModal(true);
          }}
        />
      )}

      {showCandidatureModal && selectedStage && (
        <CandidatureModal
          stage={selectedStage}
          form={candidatureForm}
          onChange={handleFormChange}
          onClose={closeModals}
          onSubmit={handleSubmitCandidature}
        />
      )}
    </div>
    </div>
  );
}
