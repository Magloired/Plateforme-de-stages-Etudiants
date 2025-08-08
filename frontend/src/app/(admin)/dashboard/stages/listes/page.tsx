"use client"

import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { apiService } from '@/services/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Calendar, MapPin, DollarSign, Clock } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function StagesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  // Requête pour récupérer toutes les offres
  const { data: offres, isLoading, error } = useQuery({
    queryKey: ['offres'],
    queryFn: () => apiService.offresDeStage.getAll(),
  })

  // Mutation pour supprimer une offre
  const deleteOffreMutation = useMutation({
    mutationFn: (id: number) => apiService.offresDeStage.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offres'] })
      toast({
        title: "Succès",
        description: "Offre supprimée avec succès",
      })
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'offre",
        variant: "destructive",
      })
    },
  })

  // Filtrer les offres selon la recherche
  const filteredOffres = offres?.filter(offre => 
    offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offre.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offre.lieu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offre.typeStage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offre.entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    )
  }

  const handleDeleteOffre = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      deleteOffreMutation.mutate(id)
    }
  }

  if (error) {
    return (
      <ContentLayout title="Gestion des Offres de Stage">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Erreur lors du chargement des offres
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    )
  }

  return (
    <ContentLayout title="Gestion des Offres de Stage">
      <div className="space-y-6">
        {/* En-tête avec statistiques */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Offres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{offres?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offres Actives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {offres?.filter(o => o.isActive).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PFE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {offres?.filter(o => o.typeStage === 'PFE').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rémunérées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {offres?.filter(o => o.remuneration && o.remuneration > 0).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre d'outils */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des Offres de Stage</CardTitle>
                <CardDescription>
                  Gérez toutes les offres de stage disponibles
                </CardDescription>
              </div>
              <Link href="/dashboard/stages/new">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une offre
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {/* Barre de recherche */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une offre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Tableau des offres */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Détails</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Chargement...
                      </TableCell>
                    </TableRow>
                  ) : filteredOffres.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Aucune offre trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOffres.map((offre) => (
                      <TableRow key={offre.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{offre.titre}</div>
                            <div className="text-sm text-muted-foreground">
                              {offre.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{offre.entreprise.nom}</div>
                          <div className="text-sm text-muted-foreground">
                            {offre.entreprise.specialite}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-3 w-3" />
                              {offre.dureeMois} mois
                            </div>
                            {offre.remuneration && (
                              <div className="flex items-center text-sm">
                                <DollarSign className="mr-1 h-3 w-3" />
                                {offre.remuneration} FCFA/mois
                              </div>
                            )}
                            {offre.typeStage && (
                              <div className="text-sm">
                                <Badge variant="outline">{offre.typeStage}</Badge>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-1 h-3 w-3" />
                            {offre.lieu || 'Non spécifié'}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(offre.isActive)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteOffre(offre.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </div>
    </ContentLayout>
  )
} 