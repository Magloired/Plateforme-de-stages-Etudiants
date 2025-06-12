'use client';
import { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Clock, DollarSign, Award, Building, User,Phone, TrendingUp, Briefcase, Target, Eye,   Mail,  File } from 'lucide-react';
import { X } from 'lucide-react';

interface Stage {
  id: string;
  titre: string;
  entreprise: string;
  description: string;
  duree: string;
  dateDebut: string;
  dateFin: string;
  ville: string;
  typeStage: string;
  competencesRequises: string[];
  remuneration?: string;
  niveau: string;
  secteur: string;
  statut: 'Ouvert' | 'Urgent' | 'Bientôt fermé';
}

interface CandidatureForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motivation:  File | null;
  cv: File | null;
}

export default function StagesPage() {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: '1',
      titre: 'Stage en développement web full-stack',
      entreprise: 'TechCorp Togo',
      description: 'Développement d\'applications web modernes avec focus sur les solutions locales. Vous travaillerez sur des projets innovants en utilisant les dernières technologies web. L\'équipe vous accompagnera dans votre montée en compétences et vous participerez à des projets concrets pour des clients réels.',
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
      description: 'Stage en sécurité informatique adapté au contexte africain. Formation aux dernières technologies de protection des données et analyse des vulnérabilités systèmes. Vous apprendrez les bonnes pratiques de sécurité et participerez à des audits de sécurité.',
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
      description: 'Stage en marketing numérique avec focus sur les marchés africains. Gestion de campagnes publicitaires, analyse de données et optimisation des performances marketing. Vous découvrirez les spécificités du marketing digital en Afrique.',
      duree: '3 mois',
      dateDebut: '2024-08-01',
      dateFin: '2024-10-31',
      ville: 'Lomé',
      typeStage: 'Stage de fin d\'études',
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
      description: 'Développement d\'applications mobiles natives et hybrides pour le marché local. Création d\'interfaces utilisateur modernes et intégration avec des APIs backend. Vous travaillerez sur des apps destinées au marché togolais.',
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
      description: 'Stage dans le domaine bancaire avec focus sur l\'analyse financière et la gestion des risques. Accompagnement dans les opérations quotidiennes et formation aux outils financiers. Excellente opportunité dans le secteur bancaire.',
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
      description: 'Stage axé sur le développement commercial et les relations internationales. Participation aux négociations commerciales et gestion des partenariats stratégiques. Vous découvrirez les enjeux du commerce en Afrique de l\'Ouest.',
      duree: '3 mois',
      dateDebut: '2024-08-15',
      dateFin: '2024-11-15',
      ville: 'Kpalimé',
      typeStage: 'Stage de fin d\'études',
      competencesRequises: ['Négociation', 'Anglais', 'Logistique', 'Relations client'],
      niveau: 'Bac+3',
      secteur: 'Commerce',
      statut: 'Ouvert'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSecteur, setSelectedSecteur] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // États pour les modales
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCandidatureModal, setShowCandidatureModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [candidatureForm, setCandidatureForm] = useState<CandidatureForm>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motivation: null,
    cv: null
  });

  const villes = ['Toutes les villes', 'Lomé', 'Kara', 'Sokodé', 'Kpalimé', 'Atakpamé'];
  const typesStage = ['Tous les types', 'Stage académique', 'Stage pré-emploi', 'Stage de fin d\'études'];
  const secteurs = ['Tous les secteurs', 'Informatique', 'Marketing', 'Sécurité IT', 'Finance', 'Commerce'];

  const filteredStages = stages.filter(stage => {
    const matchSearch = stage.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       stage.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       stage.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       stage.competencesRequises.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchVille = !selectedVille || selectedVille === 'Toutes les villes' || stage.ville === selectedVille;
    const matchType = !selectedType || selectedType === 'Tous les types' || stage.typeStage === selectedType;
    const matchSecteur = !selectedSecteur || selectedSecteur === 'Tous les secteurs' || stage.secteur === selectedSecteur;
    return matchSearch && matchVille && matchType && matchSecteur;
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Urgent': return 'bg-red-500 text-white';
      case 'Bientôt fermé': return 'bg-orange-500 text-white';
      default: return 'bg-green-500 text-white';
    }
  };

  const statsData = {
    total: stages.length,
    urgent: stages.filter(s => s.statut === 'Urgent').length,
    remuneres: stages.filter(s => s.remuneration).length,
    secteurs: [...new Set(stages.map(s => s.secteur))].length
  };

  // Fonctions pour gérer les modales
  const openDetailModal = (stage: Stage) => {
    setSelectedStage(stage);
    setShowDetailModal(true);
  };

  const openCandidatureModal = (stage: Stage) => {
    setSelectedStage(stage);
    setShowCandidatureModal(true);
    setShowDetailModal(false);
  };

  const closeModals = () => {
    setShowDetailModal(false);
    setShowCandidatureModal(false);
    setSelectedStage(null);
    setCandidatureForm({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      motivation: null ,
      cv: null
    });
  };

  const handleFormChange = (field: keyof CandidatureForm, value: string | File | null) => {
    setCandidatureForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitCandidature = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!selectedStage) return;
  
    const formData = new FormData();
    formData.append('Nom', candidatureForm.nom);
    formData.append('Prenom', candidatureForm.prenom);
    formData.append('Email', candidatureForm.email);
    formData.append('Telephone', candidatureForm.telephone);
    formData.append('Motivation', candidatureForm.motivation as Blob);
    formData.append('CV', candidatureForm.cv as Blob);
    formData.append('StageId', selectedStage.id); // au cas où tu veux relier la candidature à un stage
  
    try {
      const response = await fetch('https://localhost:5001/api/candidatures', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Candidature envoyée avec succès !');
        closeModals();
      } else {
        alert('Une erreur est survenue lors de l’envoi de la candidature.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      alert('Erreur réseau. Veuillez réessayer plus tard.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Plateforme de Stages Professionnels
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez des opportunités de stages exceptionnelles au Togo et développez vos compétences 
            professionnelles avec les meilleures entreprises du pays
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.total}</div>
            <div className="text-gray-600 font-medium">Stages Disponibles</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.urgent}</div>
            <div className="text-gray-600 font-medium">Opportunités Urgentes</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.remuneres}</div>
            <div className="text-gray-600 font-medium">Stages Rémunérés</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.secteurs}</div>
            <div className="text-gray-600 font-medium">Secteurs d'Activité</div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-2">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher par titre, entreprise, compétences..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-3 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              title="Filtres  Avancés"
            >
              <Filter size={20} />
              Filtres Avancés
            </button>
          </div>

          {/* Filtres */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t-2 border-gray-100">
              <div>
                <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="ville"
                  value={selectedVille}
                  onChange={(e) => setSelectedVille(e.target.value)}
                >
                  {villes.map(ville => (
                    <option key={ville} value={ville}>{ville}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="typeStage" className="block text-sm font-medium text-gray-700 mb-2">Type de Stage</label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="typeStage"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {typesStage.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">Secteur</label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="motivation"
                  value={selectedSecteur}
                  onChange={(e) => setSelectedSecteur(e.target.value)}
                >
                  {secteurs.map(secteur => (
                    <option key={secteur} value={secteur}>{secteur}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Liste des stages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredStages.map((stage) => (
            <div key={stage.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
              {/* Header fixe */}
              <div className="p-6 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">{stage.titre}</h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Building size={16} className="flex-shrink-0" />
                      <span className="font-semibold text-gray-800 truncate">{stage.entreprise}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatutColor(stage.statut)} flex-shrink-0 ml-2`}>
                    {stage.statut}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{stage.ville}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{stage.duree}</span>
                  </div>
                </div>

                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                  {stage.typeStage}
                </span>
              </div>

              {/* Contenu flexible */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-3">{stage.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    {stage.remuneration && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-green-700">
                          <DollarSign size={16} />
                          <span className="font-bold">{stage.remuneration}</span>
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Compétences clés</p>
                      <div className="flex flex-wrap gap-2">
                        {stage.competencesRequises.slice(0, 3).map((competence, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                            {competence}
                          </span>
                        ))}
                        {stage.competencesRequises.length > 3 && (
                          <span className="text-blue-600 text-xs font-medium">
                            +{stage.competencesRequises.length - 3} autres
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3">
                  <button 
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                    title="Détails"
                    onClick={() => openDetailModal(stage)}
                  >
                    <Eye size={16} />
                    Détails
                  </button>
                  <button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-colors font-semibold"
                    title="Postuler"
                    onClick={() => openCandidatureModal(stage)}
                  >
                    Postuler
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredStages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucun stage trouvé</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Modifiez vos critères de recherche ou supprimez certains filtres pour voir plus d'opportunités
            </p>
          </div>
        )}
      </div>

      {/* Modale des détails du stage */}
      {showDetailModal && selectedStage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Détails du stage</h2>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Fermer"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedStage.titre}</h1>
                  <div className="flex items-center gap-2 text-xl text-gray-600 mb-4">
                    <Building size={20} />
                    <span className="font-semibold">{selectedStage.entreprise}</span>
                  </div>
                </div>
                <span className={`px-4 py-2 text-sm font-bold rounded-full ${getStatutColor(selectedStage.statut)}`}>
                  {selectedStage.statut}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={18} className="text-blue-500" />
                    <span><strong>Ville:</strong> {selectedStage.ville}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock size={18} className="text-green-500" />
                    <span><strong>Durée:</strong> {selectedStage.duree}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Award size={18} className="text-purple-500" />
                    <span><strong>Niveau:</strong> {selectedStage.niveau}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar size={18} className="text-orange-500" />
                    <span><strong>Début:</strong> {new Date(selectedStage.dateDebut).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar size={18} className="text-red-500" />
                    <span><strong>Fin:</strong> {new Date(selectedStage.dateFin).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {selectedStage.remuneration && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <DollarSign size={18} className="text-green-600" />
                      <span><strong>Rémunération:</strong> {selectedStage.remuneration}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description du stage</h3>
                <p className="text-gray-700 leading-relaxed">{selectedStage.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Compétences requises</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedStage.competencesRequises.map((competence, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                      {competence}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={closeModals}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  title="Fermer"
                >
                  Fermer
                </button>
                <button
                  onClick={() => openCandidatureModal(selectedStage)}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-semibold"
                  title="Postuler"
                >
                  Postuler maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     {/* Modale de candidature */}
{showCandidatureModal && selectedStage && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Candidature</h2>
          <p className="text-gray-600">
            {selectedStage.titre} - {selectedStage.entreprise}
          </p>
        </div>
        <button
          onClick={closeModals}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Fermer"
        >
          <X size={24} />
        </button>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmitCandidature} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="inline mr-2" />
              Nom *
            </label>
            <input
              type="text"
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={candidatureForm.nom}
              onChange={(e) => handleFormChange('nom', e.target.value)}
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="inline mr-2" />
              Prénom *
            </label>
            <input
              type="text"
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={candidatureForm.prenom}
              onChange={(e) => handleFormChange('prenom', e.target.value)}
              placeholder="Votre prénom"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="inline mr-2" />
            Email *
          </label>
          <input
            type="email"
            required
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={candidatureForm.email}
            onChange={(e) => handleFormChange('email', e.target.value)}
            placeholder="Votre adresse email"
          />
        </div>
        <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Phone size={16} className="inline mr-2" />
          Téléphone *
        </label>
        <input
          type="tel"
          required
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={candidatureForm.telephone}
          onChange={(e) => handleFormChange('telephone', e.target.value)}
          placeholder="Votre numéro de téléphone"
        />
      </div>

      <div className="mb-6">
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-2">
              <File size={16} className="inline mr-2" />
              CV (PDF) *
            </label>
            <input
              id="cv"
              type="file"
              accept=".pdf"
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFormChange('cv', e.target.files[0]);
                }
              }}
            />
          </div>


        <div className="mb-6">
  <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
    <File size={16} className="inline mr-2" />
    Motivation (PDF) *
  </label>
  <input
    id="motivation"
    type="file"
    accept=".pdf"
    required
    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none"
    onChange={(e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFormChange('cv', e.target.files[0]);
      }
    }}
  />
</div>


        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            title="Envoie"
          >
            Envoyer la candidature
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}