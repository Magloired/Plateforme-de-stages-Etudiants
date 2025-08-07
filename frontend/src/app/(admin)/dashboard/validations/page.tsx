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
import { Plus, Search, Edit, Trash2, Eye, Calendar, User, CheckCircle, XCircle, MessageSquare } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { DecisionValidation } from '@/types'
import Link from 'next/link'

export default function ValidationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  // Requête pour récupérer toutes les validations
  const { data: validations, isLoading, error } = useQuery({
    queryKey: ['validations'],
    queryFn: () => apiService.validations.getAll(),
  })

  // Mutation pour supprimer une validation
  const deleteValidationMutation = useMutation({
    mutationFn: (id: number) => apiService.validations.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['validations'] })
      toast({
        title: "Succès",
        description: "Validation supprimée avec succès",
      })
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de la validation",
        variant: "destructive",
      })
    },
  })

  // Filtrer les validations selon la recherche
  const filteredValidations = validations?.filter(validation => 
    validation.decision?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    validation.commentaire?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    validation.nomCandidat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    validation.nomEnseignant?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const getDecisionBadge = (decision: DecisionValidation) => {
    const decisionColors = {
      Accepte: "bg-green-100 text-green-800",
      Refuse: "bg-red-100 text-red-800",
    }
    return decisionColors[decision] || "bg-gray-100 text-gray-800"
  }

  const handleDeleteValidation = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette validation ?')) {
      deleteValidationMutation.mutate(id)
    }
  }

  if (error) {
    return (
      <ContentLayout title="Gestion des Validations">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Erreur lors du chargement des validations
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    )
  }

  return (
    <ContentLayout title="Gestion des Validations">
      <div className="space-y-6">
        {/* En-tête avec statistiques */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Validations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{validations?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acceptées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {validations?.filter(v => v.decision === DecisionValidation.Accepte).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Refusées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {validations?.filter(v => v.decision === DecisionValidation.Refuse).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avec Commentaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {validations?.filter(v => v.commentaire && v.commentaire.length > 0).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre d'outils */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des Validations</CardTitle>
                <CardDescription>
                  Gérez toutes les validations de candidatures
                </CardDescription>
              </div>
              <Link href="/dashboard/validations/new">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle validation
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {/* Barre de recherche */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une validation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Tableau des validations */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidature</TableHead>
                    <TableHead>Enseignant</TableHead>
                    <TableHead>Décision</TableHead>
                    <TableHead>Commentaire</TableHead>
                    <TableHead>Date</TableHead>
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
                  ) : filteredValidations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Aucune validation trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredValidations.map((validation) => (
                      <TableRow key={validation.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {validation.nomCandidat}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Candidature #{validation.candidatureId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">
                                {validation.nomEnseignant}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ID: {validation.enseignantId}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getDecisionBadge(validation.decision)}>
                            {validation.decision}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            {validation.commentaire ? (
                              <div className="flex items-center text-sm">
                                <MessageSquare className="mr-1 h-3 w-3" />
                                {validation.commentaire.length > 50 
                                  ? `${validation.commentaire.substring(0, 50)}...`
                                  : validation.commentaire
                                }
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Aucun commentaire</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(validation.dateValidation).toLocaleDateString('fr-FR')}
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
                              onClick={() => handleDeleteValidation(validation.id)}
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