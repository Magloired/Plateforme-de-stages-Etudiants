'use client';

import { Search, Filter } from 'lucide-react';
import React from 'react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  
  selectedVille: string | null;
  setSelectedVille: (value: string | null) => void;

  selectedType: string | null;
  setSelectedType: (value: string | null) => void;

  selectedSecteur: string | null;
  setSelectedSecteur: (value: string | null) => void;

  showFilters: boolean;
  setShowFilters: (value: boolean) => void;

  villes: string[];
  typesStage: string[];
  secteurs: string[];
  filteredStages: any[];
}

export default function Filters({
  searchTerm, setSearchTerm,
  selectedVille, setSelectedVille,
  selectedType, setSelectedType,
  selectedSecteur, setSelectedSecteur,
  showFilters, setShowFilters,
  villes, typesStage, secteurs,
  filteredStages
}: FiltersProps) {
  return (
    <div className="p-8 mb-4">
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
          title="Filtres Avancés"
        >
          <Filter size={20} />
          Filtres Avancés
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t-2 border-gray-100">
          <div>
            <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
            <select
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="ville"
              value={selectedVille ?? ''}
              onChange={(e) => setSelectedVille(e.target.value)}
            >
              {villes.map((ville) => (
                <option key={ville} value={ville}>{ville}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="typeStage" className="block text-sm font-medium text-gray-700 mb-2">Type de Stage</label>
            <select
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="typeStage"
              value={selectedVille ?? ''}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {typesStage.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="secteur" className="block text-sm font-medium text-gray-700 mb-2">Secteur</label>
            <select
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="secteur"
              value={selectedVille ?? ''}
              onChange={(e) => setSelectedSecteur(e.target.value)}
            >
              {secteurs.map((secteur) => (
                <option key={secteur} value={secteur}>{secteur}</option>
              ))}
            </select>
          </div>
        </div>
      )}

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
  );
}
