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
import { Plus, Search, Edit, Trash2, Eye, Globe, Phone, Mail } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Specialite } from '@/types'

export default function EntreprisesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  // Requête pour récupérer toutes les entreprises
  const { data: entreprises, isLoading, error } = useQuery({
    queryKey: ['entreprises'],
    queryFn: () => apiService.entreprises.getAll(),
  })

  // Mutation pour supprimer une entreprise
  const deleteEntrepriseMutation = useMutation({
    mutationFn: (id: number) => apiService.entreprises.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entreprises'] })
      toast({
        title: "Succès",
        description: "Entreprise supprimée avec succès",
      })
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'entreprise",
        variant: "destructive",
      })
    },
  })

  // Filtrer les entreprises selon la recherche
  const filteredEntreprises = entreprises?.filter(entreprise => 
    entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entreprise.ville?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entreprise.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entreprise.emailContact.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const getSpecialiteBadge = (specialite: Specialite) => {
    const specialiteColors = {
      Developpement: "bg-blue-100 text-blue-800",
      Resau: "bg-green-100 text-green-800",
      Telecom: "bg-purple-100 text-purple-800",
      Marketing: "bg-orange-100 text-orange-800",
    }
    return specialiteColors[specialite] || "bg-gray-100 text-gray-800"
  }

  const handleDeleteEntreprise = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      deleteEntrepriseMutation.mutate(id)
    }
  }

  if (error) {
    return (
      <ContentLayout title="Gestion des Entreprises">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Erreur lors du chargement des entreprises
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    )
  }

  return (
    <ContentLayout title="Gestion des Entreprises">
      <div className="space-y-6">
        {/* En-tête avec statistiques */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entreprises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{entreprises?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Développement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {entreprises?.filter(e => e.specialite === 'Developpement').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réseau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {entreprises?.filter(e => e.specialite === 'Resau').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Télécom</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {entreprises?.filter(e => e.specialite === 'Telecom').length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre d'outils */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des Entreprises</CardTitle>
                <CardDescription>
                  Gérez toutes les entreprises partenaires
                </CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une entreprise
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Barre de recherche */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Tableau des entreprises */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Date de création</TableHead>
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
                  ) : filteredEntreprises.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Aucune entreprise trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEntreprises.map((entreprise) => (
                      <TableRow key={entreprise.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{entreprise.nom}</div>
                            <div className="text-sm text-muted-foreground">
                              {entreprise.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="mr-1 h-3 w-3" />
                              {entreprise.emailContact}
                            </div>
                            {entreprise.telephone && (
                              <div className="flex items-center text-sm">
                                <Phone className="mr-1 h-3 w-3" />
                                {entreprise.telephone}
                              </div>
                            )}
                            {entreprise.siteWeb && (
                              <div className="flex items-center text-sm">
                                <Globe className="mr-1 h-3 w-3" />
                                {entreprise.siteWeb}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {entreprise.ville && (
                              <div>{entreprise.ville}</div>
                            )}
                            {entreprise.pays && (
                              <div className="text-muted-foreground">{entreprise.pays}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSpecialiteBadge(entreprise.specialite)}>
                            {entreprise.specialite}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(entreprise.dateCreation).toLocaleDateString('fr-FR')}
                          </div>
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
                              onClick={() => handleDeleteEntreprise(entreprise.id)}
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