"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { apiService } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { EntrepriseCreateDTO, Specialite } from '@/types'
import { ArrowLeft, Save, Building2 } from 'lucide-react'

interface CreateEntrepriseFormProps {
  onSuccess?: () => void
}

export function CreateEntrepriseForm({ onSuccess }: CreateEntrepriseFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<EntrepriseCreateDTO>({
    nom: '',
    description: '',
    siteWeb: '',
    adresse: '',
    ville: '',
    pays: '',
    telephone: '',
    emailContact: '',
    specialite: Specialite.Developpement,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mutation pour créer une entreprise
  const createEntrepriseMutation = useMutation({
    mutationFn: (data: EntrepriseCreateDTO) => apiService.entreprises.create(data),
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Entreprise créée avec succès",
      })
      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard/entreprises/listes')
      }
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de l'entreprise",
        variant: "destructive",
      })
    },
  })

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom de l\'entreprise est requis'
    }

    if (!formData.emailContact.trim()) {
      newErrors.emailContact = 'L\'email de contact est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailContact)) {
      newErrors.emailContact = 'Format d\'email invalide'
    }

    if (formData.siteWeb && !/^https?:\/\/.+/.test(formData.siteWeb)) {
      newErrors.siteWeb = 'L\'URL doit commencer par http:// ou https://'
    }

    if (formData.telephone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.telephone)) {
      newErrors.telephone = 'Format de téléphone invalide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      createEntrepriseMutation.mutate(formData)
    }
  }

  const handleInputChange = (field: keyof EntrepriseCreateDTO, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSpecialiteChange = (value: string) => {
    setFormData(prev => ({ ...prev, specialite: value as Specialite }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <div>
              <CardTitle>Créer une nouvelle entreprise</CardTitle>
              <CardDescription>
                Remplissez les informations de l'entreprise partenaire
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations de base</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom de l'entreprise *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    placeholder="Ex: TechCorp"
                    className={errors.nom ? 'border-red-500' : ''}
                  />
                  {errors.nom && (
                    <p className="text-sm text-red-500">{errors.nom}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialite">Spécialité *</Label>
                  <Select value={formData.specialite} onValueChange={handleSpecialiteChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Specialite.Developpement}>Développement</SelectItem>
                      <SelectItem value={Specialite.Resau}>Réseau</SelectItem>
                      <SelectItem value={Specialite.Telecom}>Télécom</SelectItem>
                      <SelectItem value={Specialite.Marketing}>Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Description de l'entreprise..."
                  rows={3}
                />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations de contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emailContact">Email de contact *</Label>
                  <Input
                    id="emailContact"
                    type="email"
                    value={formData.emailContact}
                    onChange={(e) => handleInputChange('emailContact', e.target.value)}
                    placeholder="contact@entreprise.com"
                    className={errors.emailContact ? 'border-red-500' : ''}
                  />
                  {errors.emailContact && (
                    <p className="text-sm text-red-500">{errors.emailContact}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder="+33 1 23 45 67 89"
                    className={errors.telephone ? 'border-red-500' : ''}
                  />
                  {errors.telephone && (
                    <p className="text-sm text-red-500">{errors.telephone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteWeb">Site web</Label>
                <Input
                  id="siteWeb"
                  type="url"
                  value={formData.siteWeb}
                  onChange={(e) => handleInputChange('siteWeb', e.target.value)}
                  placeholder="https://www.entreprise.com"
                  className={errors.siteWeb ? 'border-red-500' : ''}
                />
                {errors.siteWeb && (
                  <p className="text-sm text-red-500">{errors.siteWeb}</p>
                )}
              </div>
            </div>

            {/* Adresse */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Adresse</h3>
              
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  value={formData.adresse}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  placeholder="123 Rue de la Tech"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ville">Ville</Label>
                  <Input
                    id="ville"
                    value={formData.ville}
                    onChange={(e) => handleInputChange('ville', e.target.value)}
                    placeholder="Paris"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pays">Pays</Label>
                  <Input
                    id="pays"
                    value={formData.pays}
                    onChange={(e) => handleInputChange('pays', e.target.value)}
                    placeholder="France"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>

              <Button
                type="submit"
                disabled={createEntrepriseMutation.isPending}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                {createEntrepriseMutation.isPending ? 'Création...' : 'Créer l\'entreprise'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 