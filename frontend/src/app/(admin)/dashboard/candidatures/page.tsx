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
import { Plus, Search, Edit, Trash2, Eye, Calendar, User, FileText, CheckCircle, XCircle, Clock } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { StatutCandidature } from '@/types'

export default function CandidaturesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  // Requête pour récupérer toutes les candidatures
  const { data: candidatures, isLoading, error } = useQuery({
    queryKey: ['candidatures'],
    queryFn: () => apiService.candidatures.getAll(),
  })

  // Mutation pour supprimer une candidature
  const deleteCandidatureMutation = useMutation({
    mutationFn: (id: number) => apiService.candidatures.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidatures'] })
      toast({
        title: "Succès",
        description: "Candidature supprimée avec succès",
      })
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de la candidature",
        variant: "destructive",
      })
    },
  })

  // Filtrer les candidatures selon la recherche
  const filteredCandidatures = candidatures?.filter(candidature => 
    candidature.nomCandidat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidature.titreOffre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidature.statut.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const getStatutBadge = (statut: StatutCandidature) => {
    const statutColors = {
      EnAttente: "bg-yellow-100 text-yellow-800",
      Acceptee: "bg-green-100 text-green-800",
      Refusee: "bg-red-100 text-red-800",
      EnCours: "bg-blue-100 text-blue-800",
      Validee: "bg-emerald-100 text-emerald-800",
      Annulee: "bg-gray-100 text-gray-800",
    }
    return statutColors[statut] || "bg-gray-100 text-gray-800"
  }

  const handleDeleteCandidature = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      deleteCandidatureMutation.mutate(id)
    }
  }

  if (error) {
    return (
      <ContentLayout title="Gestion des Candidatures">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Erreur lors du chargement des candidatures
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    )
  }

  return (
    <ContentLayout title="Gestion des Candidatures">
      <div className="space-y-6">
        {/* En-tête avec statistiques */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidatures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{candidatures?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {candidatures?.filter(c => c.statut === 'EnAttente').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acceptées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {candidatures?.filter(c => c.statut === 'Acceptee').length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Refusées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {candidatures?.filter(c => c.statut === 'Refusee').length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre d'outils */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des Candidatures</CardTitle>
                <CardDescription>
                  Gérez toutes les candidatures reçues
                </CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle candidature
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Barre de recherche */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une candidature..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Tableau des candidatures */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidat</TableHead>
                    <TableHead>Offre</TableHead>
                    <TableHead>Date de soumission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Documents</TableHead>
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
                  ) : filteredCandidatures.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Aucune candidature trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCandidatures.map((candidature) => (
                      <TableRow key={candidature.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{candidature.nomCandidat}</div>
                              <div className="text-sm text-muted-foreground">
                                ID: {candidature.userId}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{candidature.titreOffre}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {candidature.offreDeStageId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(candidature.dateSoumission).toLocaleDateString('fr-FR')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatutBadge(candidature.statut)}>
                            {candidature.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {candidature.documentUrl ? (
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              Voir
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">Aucun</span>
                          )}
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
                              onClick={() => handleDeleteCandidature(candidature.id)}
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
