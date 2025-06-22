'use client';

import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useLoginForm } from '@/lib/hooks/useLoginForm';
import React from 'react';

export default function LoginPage() {
    const {
        formData,
        error,
        successMessage,
        loading,
        showPassword,
        emailError,
        passwordError,
        handleChange,
        handleSubmit,
        togglePassword,
    } = useLoginForm();

    const [rememberMe, setRememberMe] = React.useState(false);

    function togglePasswordVisibility(event: React.MouseEvent<HTMLButtonElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bon retour !</h2>
                        <p className="text-gray-600">Connectez-vous à votre compte</p>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-700">{successMessage}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Adresse email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input id="email" name="email" type="email" autoComplete="email" required
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                    emailError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                                    }`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="exemple@email.com"
                                />
                            </div>
                            {emailError && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {emailError}
                                </p>
                            )}
                        </div>
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required
                                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                    passwordError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                                }`}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {passwordError}
                                </p>
                            )}
                        </div>
                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Se souvenir de moi
                                </label>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        {/* Submit Button */}
                        <button type="submit" disabled={loading || !!emailError || !!passwordError}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <>
                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                Connexion en cours...
                                </>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">ou</span>
                        </div>
                    </div>
                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Pas encore de compte ?{' '}
                            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                Créer un compte 
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}