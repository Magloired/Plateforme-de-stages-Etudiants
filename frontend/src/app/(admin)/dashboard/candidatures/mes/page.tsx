import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes Candidatures",
  description: "Consulter et gérer mes candidatures",
};

export default function MyApplicationsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Mes candidatures</h1>
      {/* Liste des candidatures à implémenter */}
    </div>
  );
} 