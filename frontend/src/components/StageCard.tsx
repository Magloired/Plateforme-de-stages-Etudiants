
import { fetchFromAPI } from '@/lib/api';  // ta fonction utilitaire
//import StageCard from './StageCard';       // ton composant carte
//import { Stage } from '@/app/types/offreType';
import { Entreprise } from '@/app/types/offreType';  

import { Stage } from './types';

import React from 'react';
import { Building, Clock, MapPin, Eye } from 'lucide-react';
//import { Stage } from '@/app/types/offreType';

interface StageCardProps {
  stage: Stage;
  onOpenDetails: (stage: Stage) => void;
  onApply: (stage: Stage) => void;
}

interface StageCardProps {
  stage: Stage;
  onOpenDetails: (stage: Stage) => void;
  onApply: (stage: Stage) => void;
}

export default function StageCard({ stage, onOpenDetails, onApply }: StageCardProps) {
  const getStatutColorFromDates = (stage: Stage): { statut: string; colorClass: string } | null => {
    if (!stage.isActive) return null;

    const now = new Date();
    const datePub = new Date(stage.datePublication);
    const dateLimite = new Date(stage.dateLimiteCandidature);

    const diffDaysTotal = (dateLimite.getTime() - datePub.getTime()) / (1000 * 60 * 60 * 24);
    const diffDaysRemaining = (dateLimite.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDaysRemaining <= 5) {
      return { statut: 'Bientôt fermé', colorClass: 'bg-orange-500 text-white' };
    }

    if (diffDaysTotal <= 10) {
      return { statut: 'Urgent', colorClass: 'bg-red-500 text-white' };
    }

    return { statut: 'Ouvert', colorClass: 'bg-green-500 text-white' };
  };

  const statusInfo = getStatutColorFromDates(stage);


  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">{stage.titre}</h2>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Building size={16} className="flex-shrink-0" />
              <span className="font-semibold text-gray-800 truncate">{stage.entreprise.nom}</span>
            </div>
          </div>
          {statusInfo && (
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${statusInfo.colorClass} flex-shrink-0 ml-2`}
            >
              {statusInfo.statut}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{stage.lieu}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{stage.dureeMois} mois</span>
          </div>
        </div>

        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
          {stage.typeStage}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
            title="Détails"
            onClick={() => onOpenDetails(stage)}
          >
            <Eye size={16} />
            Détails
          </button>
          <button
            type="button"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-colors font-semibold"
            title="Postuler"
            onClick={() => onApply(stage)}
          >
            Postuler
          </button>
        </div>
      </div>
    </div>
  );
}
