"use client"

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { 
  Users, 
  Building2, 
  Briefcase, 
  FileText, 
  CheckCircle, 
  TrendingUp,
  Activity,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { apiService } from '@/services/api-hybrid' // Changement ici : service hybride

export default function DashboardPage() {
  // Requêtes pour les statistiques
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiService.users.getAll(),
  })

  const { data: entreprises, isLoading: entreprisesLoading } = useQuery({
    queryKey: ['entreprises'],
    queryFn: () => apiService.entreprises.getAll(),
  })

  const { data: offres, isLoading: offresLoading } = useQuery({
    queryKey: ['offres'],
    queryFn: () => apiService.offresDeStage.getAll(),
  })

  const { data: candidatures, isLoading: candidaturesLoading } = useQuery({
    queryKey: ['candidatures'],
    queryFn: () => apiService.candidatures.getAll(),
  })

  const { data: validations, isLoading: validationsLoading } = useQuery({
    queryKey: ['validations'],
    queryFn: () => apiService.validations.getAll(),
  })

  const { data: offresCount, isLoading: offresCountLoading } = useQuery({
    queryKey: ['offres-count'],
    queryFn: () => apiService.offresDeStage.getCount(),
  })

  const stats = [
    {
      title: "Utilisateurs",
      value: users?.length || 0,
      description: "Total des utilisateurs",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Entreprises",
      value: entreprises?.length || 0,
      description: "Entreprises partenaires",
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Offres de Stage",
      value: offres?.length || 0,
      description: "Offres disponibles",
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Candidatures",
      value: candidatures?.length || 0,
      description: "Candidatures reçues",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Validations",
      value: validations?.length || 0,
      description: "Candidatures validées",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Taux de Réponse",
      value: offresCount || 0,
      description: "Offres avec candidatures",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  const isLoading = usersLoading || entreprisesLoading || offresLoading || 
                   candidaturesLoading || validationsLoading || offresCountLoading

  return (
    <ContentLayout title="Tableau de Bord">
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
          <p className="text-muted-foreground">
            Vue {'d\' '}ensemble de la plateforme de stages
          </p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Section d'actions rapides */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
              <CardDescription>
                Accès direct aux fonctionnalités principales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="/dashboard/users" 
                  className="p-3 text-sm border rounded-lg hover:bg-muted transition-colors"
                >
                  👥 Gérer les utilisateurs
                </a>
                <a 
                  href="/dashboard/entreprises" 
                  className="p-3 text-sm border rounded-lg hover:bg-muted transition-colors"
                >
                  🏢 Gérer les entreprises
                </a>
                <a 
                  href="/dashboard/stages" 
                  className="p-3 text-sm border rounded-lg hover:bg-muted transition-colors"
                >
                  💼 Gérer les offres
                </a>
                <a 
                  href="/dashboard/candidatures" 
                  className="p-3 text-sm border rounded-lg hover:bg-muted transition-colors"
                >
                  📝 Voir les candidatures
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut du Système</CardTitle>
              <CardDescription>
                État des services et de la base de données
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Backend</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  ✅ Opérationnel
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Base de données</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  ✅ Connectée
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Authentification</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  ✅ Active
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  )
}
