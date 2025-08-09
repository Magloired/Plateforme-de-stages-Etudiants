'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import Stats from '@/components/Stats';
import Filters from '@/components/Filters';
import StageCard from '@/components/StageCard';
import DetailModal from '@/components/DetailModal';
import CandidatureModal from '@/components/CanditatureModal';
import { fetchFromAPI } from '@/lib/api';
import { Stage, CandidatureForm } from '@/components/types';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import { CandidatureCreateDTO } from '@/types';
import { ArrowRight, MapPin, Users, TrendingUp, Sparkles } from 'lucide-react';

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
    'Stage d\'été',
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

    setLoading(true);
    try {
      // TODO: Récupérer l'ID de l'utilisateur connecté depuis le contexte d'authentification
      // Pour l'instant, on utilise un ID temporaire
      const currentUserId = 1; // À remplacer par l'ID de l'utilisateur connecté
      
      // Créer l'objet CandidatureCreateDTO selon le typage
      const candidatureData: CandidatureCreateDTO = {
        userId: currentUserId,
        offreDeStageId: parseInt(selectedStage.id),
        documentUrl: candidatureForm.cv ? URL.createObjectURL(candidatureForm.cv) : undefined
      };

      await apiService.candidatures.create(candidatureData);
      toast.success("Candidature envoyée avec succès");
      closeModals();
      
      // Réinitialiser le formulaire
      setCandidatureForm({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        motivation: null,
        cv: null,
      });
    } catch (error) {
      console.error("Erreur de candidature :", error);
      toast.error("Erreur lors de l'envoi de la candidature");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section avec design moderne */}
      <div className="relative overflow-hidden">
        {/* Fond décoratif avec des formes géométriques */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/8 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-lg"></div>
        </div>

        <div className="container mx-auto px-6 py-16">
          {/* Header principal avec animation */}
          <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-semibold uppercase tracking-wider">Plateforme Innovante</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Stages 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Professionnels
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Découvrez des opportunités de stages exceptionnelles au Togo et développez vos compétences 
              professionnelles avec les meilleures entreprises du pays
            </p>

            {/* Call-to-action avec badges informatifs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-gray-700">Partout au Togo</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50">
                <Users className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-gray-700">+{stages.length} Entreprises</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-gray-700">Opportunités Premium</span>
              </div>
            </div>
          </div>

          {/* Section des statistiques avec design amélioré */}
          <div className="animate-in slide-in-from-bottom-6 duration-1000 delay-200">
            <Stats statsData={{ total: stages.length, urgent: 3, remuneres: 5, secteurs: 8 }} />
          </div>

          {/* Section des filtres avec design moderne */}
          <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-400">
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
          </div>

          {/* Section des résultats */}
          <div className="mt-12">
            {/* Header des résultats */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Offres de Stage Disponibles
                </h2>
                <p className="text-gray-600">
                  {filteredStages.length} offre{filteredStages.length > 1 ? 's' : ''} trouvée{filteredStages.length > 1 ? 's' : ''}
                  {searchTerm && ` pour "${searchTerm}"`}
                </p>
              </div>
              
              {filteredStages.length > 0 && (
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <span>Voir tout</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Contenu principal */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-500 text-lg">Chargement des opportunités...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                  <p className="text-red-600 font-medium">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            ) : filteredStages.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune offre trouvée</h3>
                  <p className="text-gray-500 mb-4">
                    Essayez de modifier vos critères de recherche ou explorez toutes les offres disponibles.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedVille(null);
                      setSelectedType(null);
                      setSelectedSecteur(null);
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-10 duration-1000 delay-600">
                {filteredStages.map((stage, index) => (
                  <div 
                    key={stage.id}
                    className="animate-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <StageCard
                      stage={stage}
                      onOpenDetails={openDetailModal}
                      onApply={openCandidatureModal}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
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
  );
}
