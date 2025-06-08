import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  Users,
  ArrowRight,
  Star,
  TrendingUp,
} from 'lucide-react';

// Correction ici : éviter d'appeler `new Date()` dans le JSX
const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">StagePro</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-20">
        <div className="text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Plus de 1000 stages disponibles
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bienvenue sur la
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Plateforme de Stages
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Trouvez le stage parfait pour votre formation et développez vos compétences professionnelles 
            dans un environnement stimulant.
          </p>

          <div className="flex flex-col items-center gap-6 mb-16">
            <Link 
              href="/login" 
              className="group px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              Espace Étudiant
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-gray-600">
              Vous êtes responsable ?
              <Link href="/admin/login" passHref legacyBehavior>
                <a className="ml-2 inline-flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                  <Building2 className="h-4 w-4" />
                  Connexion administration
                </a>
              </Link>
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Entreprises partenaires</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2000+</h3>
              <p className="text-gray-600">Étudiants accompagnés</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Taux de satisfaction</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-bold text-gray-900">StagePro</span>
        </div>
        <p className="text-sm text-gray-500">
          © {currentYear} Plateforme de Stages. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
