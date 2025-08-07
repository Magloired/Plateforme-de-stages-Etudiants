import CreateOffreStageForm from "@/components/stage/CreateSageForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nouveau Stage",
  description: "Créer une nouvelle offre de stage",
};

export default function NewStagePage() {
  return (
    <div className="container mx-auto py-6 gap-4">
      <h1 className="text-2xl text-center font-bold ">Créer une nouvelle offre de stage</h1>

      <CreateOffreStageForm/>
    </div>
  );
} 