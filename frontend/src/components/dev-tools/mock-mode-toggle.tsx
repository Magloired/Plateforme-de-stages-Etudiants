/**
 * Composant pour basculer entre mode mock et API
 * Utile pour le développement et les tests
 */

"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Globe } from "lucide-react"
import { useToggleMockMode } from "@/hooks/use-users"

export function MockModeToggle() {
  const { isMockMode, toggleMockMode } = useToggleMockMode()

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Mode de données</CardTitle>
          <Badge variant={isMockMode ? "secondary" : "default"}>{isMockMode ? "Mock" : "API"}</Badge>
        </div>
        <CardDescription>Basculer entre les données de test et l'API réelle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {isMockMode ? (
              <Database className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Globe className="h-4 w-4 text-muted-foreground" />
            )}
            <Label htmlFor="mock-mode" className="text-sm font-medium">
              {isMockMode ? "Données Mock" : "API Réelle"}
            </Label>
          </div>
          <Switch id="mock-mode" checked={!isMockMode} onCheckedChange={toggleMockMode} />
        </div>
        <div className="text-xs text-muted-foreground">
          {isMockMode
            ? "Utilise des données de test locales pour le développement"
            : "Connecté à l'API réelle pour les données en temps réel"}
        </div>
      </CardContent>
    </Card>
  )
}
