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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { apiService } from '@/services/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Calendar, User, FileText, CheckCircle, XCircle, Clock, CheckSquare, XSquare } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { StatutCandidature, ValidationCreateDTO, DecisionValidation } from '@/types'

export default function CandidaturesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCandidature, setSelectedCandidature] = useState<any>(null)
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false)
  const [validationData, setValidationData] = useState({
    decision: DecisionValidation.Accepte,
    commentaire: ''
  })
  const [isValidating, setIsValidating] = useState(false)
  const [candidatureToDelete, setCandidatureToDelete] = useState<number | null>(null)
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
      setCandidatureToDelete(null)
      toast({
        title: "Succès",
        description: "Candidature supprimée avec succès",
      })
    },
    onError: () => {
      setCandidatureToDelete(null)
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de la candidature",
        variant: "destructive",
      })
    },
  })

  // Mutation pour créer une validation
  const createValidationMutation = useMutation({
    mutationFn: (validationData: ValidationCreateDTO) => apiService.validations.create(validationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidatures'] })
      queryClient.invalidateQueries({ queryKey: ['validations'] })
      toast({
        title: "Succès",
        description: "Validation créée avec succès",
      })
      setIsValidationModalOpen(false)
      setSelectedCandidature(null)
      setValidationData({ decision: DecisionValidation.Accepte, commentaire: '' })
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la création de la validation",
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
    setCandidatureToDelete(id)
  }

  const confirmDeleteCandidature = () => {
    if (candidatureToDelete) {
      deleteCandidatureMutation.mutate(candidatureToDelete)
    }
  }

  const handleOpenValidationModal = (candidature: any) => {
    setSelectedCandidature(candidature)
    setValidationData({ decision: DecisionValidation.Accepte, commentaire: '' })
    setIsValidationModalOpen(true)
  }

  const handleValidationSubmit = async () => {
    if (!selectedCandidature) return

    setIsValidating(true)
    try {
      const validationPayload: ValidationCreateDTO = {
        EnseignantId: 5, 
        CandidatureId: selectedCandidature.id,
        Decision: validationData.decision,
        Commentaire: validationData.commentaire || undefined
      }

      console.log("Payload de validation:", validationPayload)
      console.log("Candidature sélectionnée:", selectedCandidature)

      await createValidationMutation.mutateAsync(validationPayload)
    } catch (error) {
      console.error("Erreur lors de la validation:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la validation",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
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
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleOpenValidationModal(candidature)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <CheckSquare className="h-4 w-4" />
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

      {/* Modal de validation */}
      <Dialog open={isValidationModalOpen} onOpenChange={setIsValidationModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Valider une candidature</DialogTitle>
            <DialogDescription>
              Validez ou refusez la candidature de {selectedCandidature?.nomCandidat} pour l&apos;offre &quot;{selectedCandidature?.titreOffre}&quot;
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Informations de la candidature */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Informations de la candidature</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Candidat:</span> {selectedCandidature?.nomCandidat}</p>
                <p><span className="font-medium">Offre:</span> {selectedCandidature?.titreOffre}</p>
                <p><span className="font-medium">Date de soumission:</span> {selectedCandidature?.dateSoumission ? new Date(selectedCandidature.dateSoumission).toLocaleDateString('fr-FR') : 'N/A'}</p>
                <p><span className="font-medium">Statut actuel:</span> {selectedCandidature?.statut}</p>
              </div>
            </div>

            {/* Décision */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Décision *</label>
              <Select 
                value={validationData.decision} 
                onValueChange={(value) => setValidationData(prev => ({ ...prev, decision: value as DecisionValidation }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une décision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DecisionValidation.Accepte}>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Accepter
                    </div>
                  </SelectItem>
                  <SelectItem value={DecisionValidation.Refuse}>
                    <div className="flex items-center">
                      <XCircle className="mr-2 h-4 w-4 text-red-600" />
                      Refuser
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Commentaire */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Commentaire (optionnel)</label>
              <Textarea
                placeholder="Ajoutez un commentaire sur votre décision..."
                value={validationData.commentaire}
                onChange={(e) => setValidationData(prev => ({ ...prev, commentaire: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsValidationModalOpen(false)}
              disabled={isValidating}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleValidationSubmit}
              disabled={isValidating}
              className={validationData.decision === DecisionValidation.Accepte ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {isValidating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Validation...
                </>
              ) : (
                <>
                  {validationData.decision === DecisionValidation.Accepte ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accepter
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Refuser
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={candidatureToDelete !== null} onOpenChange={() => setCandidatureToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette candidature ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCandidature}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ContentLayout>
  )
}
