import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '@/lib/api';
import StageCard from '@/components/StageCard';
import { Stage } from '@/components/types';
//import { Stage } from '@/app/types/offreType';

export default function StagesList() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStages() {
      try {
        const data = await fetchFromAPI('HomePage'); // Ou "Offres" selon ton endpoint
        setStages(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    }
    loadStages();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stages.map((stage) => (
        <StageCard
          key={stage.id}
          stage={stage}
          onOpenDetails={(s) => console.log('Voir détails', s)}
          onApply={(s) => console.log('Postuler à', s)}
        />
      ))}
    </div>
  );
}
