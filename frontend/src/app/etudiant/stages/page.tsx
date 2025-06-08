'use client';
import { useState, useEffect } from 'react';

interface Stage {
  id: string;
  titre: string;
  entreprise: string;
  description: string;
  duree: string;
  dateDebut: string;
  dateFin: string;
}

export default function StagesPage() {
  const [stages, setStages] = useState<Stage[]>([
    // Données de test en attendant l'intégration avec le backend
    {
      id: '1',
      titre: 'Stage en développement web',
      entreprise: 'TechCorp',
      description: 'Stage de développement d\'applications web modernes',
      duree: '6 mois',
      dateDebut: '2024-07-01',
      dateFin: '2024-12-31'
    },
    {
      id: '2',
      titre: 'Stage en cybersécurité',
      entreprise: 'SecureNet',
      description: 'Stage en sécurité informatique et analyse des risques',
      duree: '4 mois',
      dateDebut: '2024-06-01',
      dateFin: '2024-09-30'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Offres de stages disponibles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{stage.titre}</h2>
            <p className="text-gray-600 mb-2">{stage.entreprise}</p>
            <p className="text-gray-700 mb-4">{stage.description}</p>
            <div className="text-sm text-gray-600">
              <p>Durée : {stage.duree}</p>
              <p>Début : {new Date(stage.dateDebut).toLocaleDateString()}</p>
              <p>Fin : {new Date(stage.dateFin).toLocaleDateString()}</p>
            </div>
            <button 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => alert('Fonctionnalité de candidature à venir')}
            >
              Postuler
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}