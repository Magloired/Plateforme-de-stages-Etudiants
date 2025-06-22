'use client';

import { useState, useEffect } from 'react';
import Stats from '@/components/Stats';
import Filters from '@/components/Filters';
import StageCard from '@/components/StageCard';
import DetailModal from '@/components/DetailModal';
import CandidatureModal from '@/components/CanditatureModal';
import { fetchFromAPI } from '@/lib/api';
import { Stage, CandidatureForm } from '@/components/types';

export default function StagesPage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const typesStage = [
    'Stage pré-emploi',
    'Stage académique',
    "Stage de fin d'études",
    'Stage d’été',
    'Stage professionnel',
  ];
  const secteurs = ['Informatique', 'Marketing', 'Finance', 'Sécurité IT', 'Commerce'];

  useEffect(() => {
    async function loadStages() {
      try {
        setLoading(true);
        const data = await fetchFromAPI('home/offres'); // ou `Offres` selon ton endpoint réel
        setStages(data);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des stages.');
      } finally {
        setLoading(false);
      }
    }

    loadStages();
  }, []);

  const filteredStages = stages.filter((stage) => {
    const matchSearch = stage.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchVille = selectedVille ? stage.lieu === selectedVille : true;
    const matchType = selectedType ? stage.typeStage === selectedType : true;
    const matchSecteur = selectedSecteur ? stage.secteur === selectedSecteur : true;
    return matchSearch && matchVille && matchType && matchSecteur;
  });

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

        {loading ? (
          <p className="text-center text-gray-500">Chargement des stages...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
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
        )}

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
