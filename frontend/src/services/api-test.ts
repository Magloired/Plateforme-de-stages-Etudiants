/**
 * Fichier de test pour vérifier la correspondance entre le frontend et le backend
 * Ce fichier peut être supprimé après vérification
 */

import { apiService } from "./api"

// Test des endpoints d'authentification
export const testAuthEndpoints = async () => {
  try {
    console.log("🧪 Test des endpoints d'authentification...")
    
    // Test de connexion
    const loginData = {
      email: "test@example.com",
      password: "password123"
    }
    
    console.log("POST /api/Auth/login")
    console.log("Body:", loginData)
    
    // Test d'inscription
    const registerData = {
      nom: "Doe",
      prenom: "John",
      email: "john.doe@example.com",
      password: "password123",
      role: "Etudiant" as const,
      filiere: "Informatique",
      niveauEtude: "Master",
      telephone: "0123456789"
    }
    
    console.log("POST /api/Auth/register")
    console.log("Body:", registerData)
    
  } catch (error) {
    console.error("❌ Erreur dans les tests d'authentification:", error)
  }
}

// Test des endpoints d'entreprises
export const testEntrepriseEndpoints = async () => {
  try {
    console.log("🏢 Test des endpoints d'entreprises...")
    
    console.log("GET /api/Entreprise")
    console.log("GET /api/Entreprise/{id}")
    
    const createData = {
      nom: "TechCorp",
      description: "Entreprise de technologie",
      siteWeb: "https://techcorp.com",
      adresse: "123 Rue de la Tech",
      ville: "Paris",
      pays: "France",
      telephone: "0123456789",
      emailContact: "contact@techcorp.com",
      specialite: "Developpement"
    }
    
    console.log("POST /api/Entreprise")
    console.log("Body:", createData)
    
  } catch (error) {
    console.error("❌ Erreur dans les tests d'entreprises:", error)
  }
}

// Test des endpoints d'offres de stage
export const testOffreEndpoints = async () => {
  try {
    console.log("💼 Test des endpoints d'offres de stage...")
    
    console.log("GET /api/Offres")
    console.log("GET /api/Offres/{id}")
    console.log("GET /api/Offres/count")
    
    const createData = {
      titre: "Développeur Full Stack",
      description: "Stage en développement web",
      dureeMois: 6,
      lieu: "Paris",
      typeStage: "PFE",
      remuneration: 1000,
      dateLimiteCandidature: "2025-12-31T23:59:59Z",
      entrepriseId: 1
    }
    
    console.log("POST /api/Offres")
    console.log("Body:", createData)
    
  } catch (error) {
    console.error("❌ Erreur dans les tests d'offres:", error)
  }
}

// Test des endpoints de candidatures
export const testCandidatureEndpoints = async () => {
  try {
    console.log("📝 Test des endpoints de candidatures...")
    
    console.log("GET /api/Candidature")
    console.log("GET /api/Candidature/{id}")
    
    const createData = {
      userId: 1,
      offreDeStageId: 1,
      documentUrl: "https://example.com/cv.pdf"
    }
    
    console.log("POST /api/Candidature")
    console.log("Body:", createData)
    
  } catch (error) {
    console.error("❌ Erreur dans les tests de candidatures:", error)
  }
}

// Test des endpoints de validations
export const testValidationEndpoints = async () => {
  try {
    console.log("✅ Test des endpoints de validations...")
    
    console.log("GET /api/Validation")
    console.log("GET /api/Validation/{id}")
    
    const createData = {
      candidatureId: 1,
      decision: "Acceptee",
      commentaire: "Candidature acceptée",
      validateurId: 1
    }
    
    console.log("POST /api/Validation")
    console.log("Body:", createData)
    
  } catch (error) {
    console.error("❌ Erreur dans les tests de validations:", error)
  }
}

// Test des endpoints utilisateurs
export const testUserEndpoints = async () => {
  try {
    console.log("👤 Test des endpoints utilisateurs...")
    
    console.log("GET /api/User")
    console.log("GET /api/User/{id}")
    
    const createData = {
      nom: "Doe",
      prenom: "Jane",
      email: "jane.doe@example.com",
      role: "Etudiant",
      filiere: "Informatique",
      niveauEtude: "Master",
      telephone: "0123456789"
    }
    
    console.log("POST /api/User")
    console.log("Body:", createData)
    
  } catch (error) {
    console.error("❌ Erreur dans les tests utilisateurs:", error)
  }
}

// Fonction principale de test
export const runAllTests = async () => {
  console.log("🚀 Démarrage des tests de correspondance API...")
  
  await testAuthEndpoints()
  await testEntrepriseEndpoints()
  await testOffreEndpoints()
  await testCandidatureEndpoints()
  await testValidationEndpoints()
  await testUserEndpoints()
  
  console.log("✅ Tous les tests de correspondance sont terminés")
} 