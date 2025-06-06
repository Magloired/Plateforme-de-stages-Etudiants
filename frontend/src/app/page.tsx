import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Bienvenue sur la Plateforme de Stages
        </h1>
        
        <p className="text-xl text-gray-600 mb-12">
          Trouvez le stage parfait pour votre formation et développez vos compétences professionnelles
        </p>

        <div className="space-y-4">
          <Link 
            href="/login" 
            className="block w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          >
            Espace Étudiant
          </Link>

          <div className="mt-4 text-sm text-gray-500">
            Vous êtes responsable ? 
            <Link href="/admin/login" className="text-blue-600 hover:text-blue-500 ml-2">
              Connexion administration
            </Link>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 w-full py-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Plateforme de Stages. Tous droits réservés.</p>
      </footer>
    </div>
  )
}