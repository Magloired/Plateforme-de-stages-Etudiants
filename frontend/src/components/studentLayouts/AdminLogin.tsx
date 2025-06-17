"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

type FormValues = z.infer<typeof formSchema>;

const AdminLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // TODO: appel API login
      console.log("Formulaire soumis:", data, { rememberMe });
    } catch (error) {
      console.error("Erreur de connexion", error);
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
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
