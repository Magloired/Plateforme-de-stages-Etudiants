"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { apiService } from "@/services/api-hybrid";
import { APP_CONFIG } from "@/config/app-config";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

type FormValues = z.infer<typeof formSchema>;

const AdminLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError("");
    
    try {
      // Appel à l'API d'authentification
      const result = await apiService.auth.login({
        email: data.email,
        password: data.password
      });

      // Stocker le token dans localStorage si rememberMe est activé
      if (result.token) {
        if (rememberMe) {
          localStorage.setItem("authToken", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
        } else {
          sessionStorage.setItem("authToken", result.token);
          sessionStorage.setItem("user", JSON.stringify(result.user));
        }
        
        console.log("Connexion réussie pour:", result.user.email);
        console.log("Rôle utilisateur:", result.user.role);
        
        // Rediriger vers le dashboard
        router.push("/dashboard");
      } else {
        setError("Réponse d'authentification invalide");
      }
    } catch (error: any) {
      console.error("Erreur de connexion", error);
      setError(error.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bonjour Admin !</h2>
          <p className="text-gray-600">Connectez-vous à votre espace de gestion</p>
          
          {/* Indicateur du mode API */}
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              APP_CONFIG.IS_MOCK_MODE 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {APP_CONFIG.IS_MOCK_MODE ? '🔧 Mode Mock' : '🌐 API Réelle'}
            </span>
          </div>
          
                    {/* Informations de test */}
          <div className="mt-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
              <p className="font-medium text-blue-900">Compte admin :</p>
              <p className="text-blue-700">Email: admin@stages.com</p>
              <p className="text-blue-700">Mot de passe: Admin123!</p>
              <p className="text-xs text-blue-600 mt-1">
                (Fonctionne en mode API réelle et mode mock)
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Message d'erreur */}
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="exemple@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mot de passe */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checkbox + lien */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span>Se souvenir de moi</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
