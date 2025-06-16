import { Stage } from './types';
import { Calendar, Award, MapPin, Clock, DollarSign, Building, X } from 'lucide-react';

export default function DetailModal({
  stage,
  onClose,
  onApply
}: {
  stage: Stage;
  onClose: () => void;
  onApply: () => void;
}) {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Urgent': return 'bg-red-500 text-white';
      case 'Bientôt fermé': return 'bg-orange-500 text-white';
      default: return 'bg-green-500 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Détails du stage</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" title="Fermer">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{stage.titre}</h1>
          <div className="flex items-center gap-2 text-xl text-gray-600 mb-4">
            <Building size={20} />
            <span className="font-semibold">{stage.entreprise}</span>
          </div>

          <span className={`px-4 py-2 text-sm font-bold rounded-full ${getStatutColor(stage.statut)}`}>
            {stage.statut}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700"><MapPin size={18} /> Ville: {stage.ville}</div>
              <div className="flex items-center gap-2 text-gray-700"><Clock size={18} /> Durée: {stage.duree}</div>
              <div className="flex items-center gap-2 text-gray-700"><Award size={18} /> Niveau: {stage.niveau}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700"><Calendar size={18} /> Début: {new Date(stage.dateDebut).toLocaleDateString('fr-FR')}</div>
              <div className="flex items-center gap-2 text-gray-700"><Calendar size={18} /> Fin: {new Date(stage.dateFin).toLocaleDateString('fr-FR')}</div>
              {stage.remuneration && (
                <div className="flex items-center gap-2 text-gray-700"><DollarSign size={18} /> Rémunération: {stage.remuneration}</div>
              )}
            </div>
          </div>

          <p className="text-gray-700 mb-6">{stage.description}</p>

          <h3 className="text-lg font-bold mb-2">Compétences requises</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {stage.competencesRequises.map((comp, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{comp}</span>
            ))}
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button onClick={onClose} className="flex-1 py-3 border rounded-xl text-gray-700 hover:bg-gray-100">Fermer</button>
            <button onClick={onApply} className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Postuler maintenant</button>
          </div>
        </div>
      </div>
    </div>
  );
}
