/**
 * Composant pour basculer entre mode mock et API
 * Utile pour le développement et les tests
 */

"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Database, Server, AlertTriangle, CheckCircle } from 'lucide-react'
import { APP_CONFIG } from '@/config/app-config'

export function MockModeToggle() {
  const [isMockMode, setIsMockMode] = useState(APP_CONFIG.IS_MOCK_MODE)
  const [isVisible, setIsVisible] = useState(false)

  // Afficher le toggle seulement en mode développement
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
    }
  }, [])

  const handleToggle = () => {
    setIsMockMode(!isMockMode)
    // Ici vous pourriez mettre à jour la configuration globale
    // Pour l'instant, on utilise un state local
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isMockMode ? (
                <Database className="h-5 w-5 text-blue-600" />
              ) : (
                <Server className="h-5 w-5 text-green-600" />
              )}
              <CardTitle className="text-sm">Mode API</CardTitle>
            </div>
            <Badge variant={isMockMode ? "secondary" : "default"}>
              {isMockMode ? "MOCK" : "RÉEL"}
            </Badge>
          </div>
          <CardDescription>
            Basculez entre les données mock et l'API réelle
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="mock-mode"
              checked={isMockMode}
              onCheckedChange={handleToggle}
            />
            <Label htmlFor="mock-mode" className="text-sm">
              Utiliser les données mock
            </Label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              {isMockMode ? (
                <>
                  <Database className="h-4 w-4 text-blue-600" />
                  <span>Données locales pour les tests</span>
                </>
              ) : (
                <>
                  <Server className="h-4 w-4 text-green-600" />
                  <span>API backend réelle</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm">
              {isMockMode ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Pas de dépendance au backend</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span>Backend requis sur {APP_CONFIG.API_BASE_URL}</span>
                </>
              )}
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Mode développement uniquement
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
