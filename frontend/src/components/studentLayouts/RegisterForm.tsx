"use client";

import { useRegisterForm } from "@/lib/hooks/useRegisterForm";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle, XCircle } from 'lucide-react';

export default function RegisterForm() {
  const router = useRouter();
  const {
    formData,
    error,
    success,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
    passwordStrength,
    showPassword,
    setShowPassword,
    fieldErrors,
    // etc.
  } = useRegisterForm(router);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                <div className="p-4 sm:p-8">
                    <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Création de compte
                    </h2>
                    <p className="text-gray-600">Remplissez vos informations personnelles</p>
                    </div>

                    {/* Messages d'alerte */}
                    {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <div className="flex items-center">
                        <XCircle className="w-5 h-5 text-red-400 mr-2" />
                        <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                    )}

                    {success && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                        <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <p className="text-sm text-green-700">{success}</p>
                        </div>
                    </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nom et Prénom */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Nom */}
                        <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                            Nom *
                        </label>
                        <div className="relative">
                            <input
                            id="nom"
                            name="nom"
                            type="text"
                            required
                            className={`w-full px-4 py-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                fieldErrors.nom ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            value={formData.nom}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Votre nom"
                            />
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        {fieldErrors.nom && (
                            <p className="mt-1 text-sm text-red-600">{fieldErrors.nom}</p>
                        )}
                        </div>
                        {/* Prénom */}
                        <div>
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2"> Prénom *</label>
                        <div className="relative">
                            <input
                            id="prenom"
                            name="prenom"
                            type="text"
                            required
                            className={`w-full px-4 py-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                fieldErrors.prenom ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            value={formData.prenom}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Votre prénom"
                            />
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        {fieldErrors.prenom && (
                            <p className="mt-1 text-sm text-red-600">{fieldErrors.prenom}</p>
                        )}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse email *
                        </label>
                        <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className={`w-full px-4 py-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            fieldErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="exemple@email.com"
                        />
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        {fieldErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                        )}
                    </div>

                    {/* Téléphone */}
                    <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone *
                        </label>
                        <div className="relative">
                        <input
                            id="telephone"
                            name="telephone"
                            type="tel"
                            required
                            className={`w-full px-4 py-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            fieldErrors.telephone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            value={formData.telephone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="90000000"
                        />
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        {fieldErrors.telephone && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.telephone}</p>
                        )}
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe *
                        </label>
                        <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            className={`w-full px-4 py-3 pl-10 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            fieldErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="••••••••"
                        />
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <button
                            type="button"
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                        </div>
                        
                        {/* Indicateur de force du mot de passe */}
                        {formData.password && (
                        <div className="mt-2">
                            <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-600">{passwordStrength.label}</span>
                            </div>
                        </div>
                        )}
                        
                        {fieldErrors.password && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                        )}
                    </div>

                    {/* Confirmation mot de passe */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le mot de passe *
                        </label>
                        <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            className={`w-full px-4 py-3 pl-10 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            fieldErrors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                            }`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="••••••••"
                        />
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <button
                            type="button"
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                        </div>
                        {fieldErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Création en cours...
                        </div>
                        ) : (
                        'Créer mon compte'
                        )}
                    </button>

                    {/* Lien de connexion */}
                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                        Déjà un compte ?{' '}
                        <Link 
                            href="/login" 
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            Se connecter
                        </Link>
                        </p>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </>
    );
}
