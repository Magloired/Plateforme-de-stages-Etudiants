import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nouvelle Entreprise",
  description: "Créer une nouvelle entreprise",
};

export default function NewCompanyPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle entreprise</h1>
      {/* Formulaire de création à implémenter */}
    </div>
  );
} 