import { CheckCircle } from "lucide-react";
import AdminLoginForm from '@/components/studentLayouts/AdminLogin';

const AdminLogin = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
                {/* Panneau latéral */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse delay-500"></div>
                    </div>
                    <div className="max-w-md text-white text-center relative z-10">
                        <div className="mb-8">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold mb-6 leading-tight">Rejoignez-nous</h1>
                        <p className="text-xl opacity-90 mb-8">Créez votre compte étudiant pour accéder aux offres de stage</p>
                        <div className="flex items-center justify-center space-x-6 text-sm opacity-75">
                            <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span>Inscription rapide</span>
                            </div>
                            <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span>Accès immédiat</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulaire */}
                <AdminLoginForm />
            </div>
        </>
    )
}

export default AdminLogin;