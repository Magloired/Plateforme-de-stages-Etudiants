'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RegisterFormData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmPassword: string;
  telephone: string; 
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: ''  
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://localhost:7241/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          password: formData.password,
          telephone: formData.telephone  // Changed from numeroEtudiant
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login?registered=true');
      } else {
        setError(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      setError('Erreur lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-12">
        <div className="max-w-md text-white text-center">
          <h1 className="text-4xl font-bold mb-6">Rejoignez-nous</h1>
          <p className="text-xl">Créez votre compte étudiant pour accéder aux offres de stage</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Création de compte
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                </div>
              </div>

              
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  required
                  pattern="[0-9]{8}"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="90000000"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Création en cours...' : 'Créer mon compte'}
              </button>
            </div>

            <div className="text-center">
              <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                Déjà un compte ? Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}