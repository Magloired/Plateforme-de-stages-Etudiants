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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { apiService } from "@/services/api-hybrid" // Service hybride
import { OffreStageCreateDTO } from "@/types/offre-de-stage"
import { Specialite } from "@/types/entreprise"
import { EntrepriseSelect } from "@/components/forms/EntrepriseSelect"

const formSchema = z.object({
  titre: z.string().min(1, "Titre requis"),
  description: z.string().optional(),
  dureeMois: z.preprocess((v) => Number(v), z.number().min(1, "Durée minimale 1 mois")),
  lieu: z.string().optional(),
  typeStage: z.string().optional(),
  remuneration: z.preprocess((v) => Number(v), z.number().min(0)).optional(),
  dateLimiteCandidature: z.string().optional(),
  entrepriseId: z.preprocess((v) => Number(v), z.number().min(1, "Entreprise requise")),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateOffreStageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      description: "",
      dureeMois: 1,
      lieu: "",
      typeStage: "",
      remuneration: 0,
      dateLimiteCandidature: "",
      entrepriseId: 0,
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      await apiService.offresDeStage.create(values as OffreStageCreateDTO)
      toast.success("Offre créée avec succès")
      reset()
    } catch (error) {
      console.error("Erreur création :", error)
      toast.error("Erreur lors de la création")
    } finally {
      setLoading(false)
    }
  }

  const handleEntrepriseChange = (entrepriseId: number) => {
    setValue("entrepriseId", entrepriseId)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-4xl mx-auto p-4">
      {/* Titre - pleine largeur */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="titre">Titre *</Label>
        <Input id="titre" {...register("titre")} />
        {errors.titre && <p className="text-sm text-red-500">{errors.titre.message}</p>}
      </div>

      {/* Description - pleine largeur */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      {/* Durée et Lieu côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="dureeMois">Durée (mois) *</Label>
          <Input type="number" id="dureeMois" {...register("dureeMois")} />
          {errors.dureeMois && <p className="text-sm text-red-500">{errors.dureeMois.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="lieu">Lieu</Label>
          <Input id="lieu" {...register("lieu")} />
          {errors.lieu && <p className="text-sm text-red-500">{errors.lieu.message}</p>}
        </div>
      </div>

      {/* Type de stage et Rémunération côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="typeStage">Type de stage</Label>
          <Input id="typeStage" {...register("typeStage")} />
          {errors.typeStage && <p className="text-sm text-red-500">{errors.typeStage.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="remuneration">Rémunération (€)</Label>
          <Input type="number" id="remuneration" {...register("remuneration")} />
          {errors.remuneration && <p className="text-sm text-red-500">{errors.remuneration.message}</p>}
        </div>
      </div>

      {/* Date limite de candidature */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="dateLimiteCandidature">Date limite de candidature</Label>
        <Input type="date" id="dateLimiteCandidature" {...register("dateLimiteCandidature")} />
        {errors.dateLimiteCandidature && (
          <p className="text-sm text-red-500">{errors.dateLimiteCandidature.message}</p>
        )}
      </div>

      {/* Sélection d'entreprise */}
      <EntrepriseSelect
        value={watch("entrepriseId") as number}
        onValueChange={handleEntrepriseChange}
        error={errors.entrepriseId?.message}
        required={true}
      />

      <Button className="bg-card border hover:bg-muted" type="submit" disabled={loading}>
        <p className=""> {loading ? "Création..." : "Créer l'offre de stage"} </p>
      </Button>
    </form>
  )
}
