"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { apiService } from "@/services/api" // <= le service centralisé
import type { OffreDeStage } from "@/types/offre-de-stage"

const formSchema = z.object({
  titre: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  datePublication: z.string(),
  dureeMois: z.preprocess((v) => Number(v), z.number().min(1, "Durée minimale 1 mois")),
  lieu: z.string().min(1, "Lieu requis"),
  typeStage: z.string().min(1, "Type requis"),
  remuneration: z.preprocess((v) => Number(v), z.number().min(0)),
  dateLimiteCandidature: z.string(),
  isActive: z.boolean().default(true),
  entreprise: z.object({
    id: z.preprocess((v) => Number(v), z.number()),
    nom: z.string().min(1),
    description: z.string().min(1),
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateOffreStageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      description: "",
      datePublication: "",
      dureeMois: 1,
      lieu: "",
      typeStage: "",
      remuneration: 0,
      dateLimiteCandidature: "",
      isActive: true,
      entreprise: {
        id: 0,
        nom: "",
        description: "",
      },
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      await apiService.offresDeStage.create(values as Omit<OffreDeStage, "id">)
      toast.success("Offre créée avec succès")
      reset()
    } catch (error) {
      console.error("Erreur création :", error)
      toast.error("Erreur lors de la création")
    } finally {
      setLoading(false)
    }
  }

  return (
<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-4xl mx-auto p-4">
  {/* Titre - pleine largeur */}
  <div className="flex flex-col gap-2">
    <Label htmlFor="titre">Titre</Label>
    <Input id="titre" {...register("titre")} />
    {errors.titre && <p className="text-sm text-red-500">{errors.titre.message}</p>}
  </div>

  {/* Description - pleine largeur */}
  <div className="flex flex-col gap-2">
    <Label htmlFor="description">Description</Label>
    <Textarea id="description" {...register("description")} />
    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
  </div>

  {/* Date publication et Durée côte à côte */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <Label htmlFor="datePublication">Date de publication</Label>
      <Input type="date" id="datePublication" {...register("datePublication")} />
      {errors.datePublication && <p className="text-sm text-red-500">{errors.datePublication.message}</p>}
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="dureeMois">Durée (mois)</Label>
      <Input type="number" id="dureeMois" {...register("dureeMois")} />
      {errors.dureeMois && <p className="text-sm text-red-500">{errors.dureeMois.message}</p>}
    </div>
  </div>

  {/* Lieu et Type de stage côte à côte */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <Label htmlFor="lieu">Lieu</Label>
      <Input id="lieu" {...register("lieu")} />
      {errors.lieu && <p className="text-sm text-red-500">{errors.lieu.message}</p>}
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="typeStage">Type de stage</Label>
      <Input id="typeStage" {...register("typeStage")} />
      {errors.typeStage && <p className="text-sm text-red-500">{errors.typeStage.message}</p>}
    </div>
  </div>

  {/* Rémunération et Date limite côte à côte */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <Label htmlFor="remuneration">Rémunération (€)</Label>
      <Input type="number" id="remuneration" {...register("remuneration")} />
      {errors.remuneration && <p className="text-sm text-red-500">{errors.remuneration.message}</p>}
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="dateLimiteCandidature">Date limite de candidature</Label>
      <Input type="date" id="dateLimiteCandidature" {...register("dateLimiteCandidature")} />
      {errors.dateLimiteCandidature && (
        <p className="text-sm text-red-500">{errors.dateLimiteCandidature.message}</p>
      )}
    </div>
  </div>

  {/* Checkbox - pleine largeur */}
  <div className="flex items-center gap-2">
    <Checkbox id="isActive" {...register("isActive")} />
    <Label htmlFor="isActive">Offre active</Label>
  </div>

  {/* Section Entreprise */}
  <div className="flex flex-col gap-4 pt-6 border-t">
    <h3 className="font-semibold">Entreprise</h3>

    {/* ID et Nom côte à côte */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="flex flex-col gap-2">
        <Label htmlFor="entreprise.nom">Nom</Label>
        <Input id="entreprise.nom" {...register("entreprise.nom")} />
        {errors.entreprise?.nom && <p className="text-sm text-red-500">{errors.entreprise.nom.message}</p>}
      </div>
    </div>

    {/* Description entreprise - pleine largeur */}
    <div className="flex flex-col gap-2">
      <Label htmlFor="entreprise.description">Description</Label>
      <Textarea id="entreprise.description" {...register("entreprise.description")} />
      {errors.entreprise?.description && (
        <p className="text-sm text-red-500">{errors.entreprise.description.message}</p>
      )}
    </div>
  </div>

  <Button className="bg-card border hover:bg-muted" type="submit" disabled={loading}>
   <p className=""> {loading ? "Création..." : "Créer l'offre de stage"} </p>
  </Button>
</form>

  )
}
