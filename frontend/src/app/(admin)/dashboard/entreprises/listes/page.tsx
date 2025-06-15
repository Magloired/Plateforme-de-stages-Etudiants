import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liste des Entreprises",
  description: "Consulter la liste des entreprises",
};

export default function CompaniesListPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Liste des entreprises</h1>
      {/* Tableau des entreprises à implémenter */}
    </div>
  );
} 