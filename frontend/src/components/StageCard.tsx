

import React from 'react';
import { Building, Clock, MapPin, Eye } from 'lucide-react';
import { Stage } from './types';

interface StageCardProps {
  stage: Stage;
  onOpenDetails: (stage: Stage) => void;
  onApply: (stage: Stage) => void;
}

export default function StageCard({ stage, onOpenDetails, onApply }: StageCardProps) {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Urgent':
        return 'bg-red-500 text-white';
      case 'Bientôt fermé':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">{stage.titre}</h2>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Building size={16} className="flex-shrink-0" />
              <span className="font-semibold text-gray-800 truncate">{stage.entreprise}</span>
            </div>
          </div>
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${getStatutColor(stage.statut)} flex-shrink-0 ml-2`}
          >
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
