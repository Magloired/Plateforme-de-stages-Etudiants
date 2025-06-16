// /lib/hooks/useRegisterForm.ts
"use client";

import { useState } from "react";
//import { NextRouter } from 'next/router';
//import { useRouter } from "next/router";
import { RegisterFormData, PasswordStrength } from "@/app/types/loginForms";
import { authService } from "@/services/authService";
// import { AppRouterInstance } from "next/navigation";

export function useRegisterForm(router: any) {
  const [formData, setFormData] = useState<RegisterFormData>({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    role: "Etudiant",
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<RegisterFormField, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  //const router = useRouter();

  type RegisterFormField = Exclude<keyof RegisterFormData, "role">;

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'nom':
      case 'prenom':
        return value.length < 2 ? 'Minimum 2 caractères requis' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Format d\'email invalide' : '';
      case 'telephone':
        const phoneRegex = /^[0-9]{8}$/;
        return !phoneRegex.test(value) ? 'Format: 8 chiffres (ex: 90000000)' : '';
      case 'password':
        if (value.length < 8) return 'Minimum 8 caractères';
        if (!/(?=.*[a-z])/.test(value)) return 'Au moins une minuscule';
        if (!/(?=.*[A-Z])/.test(value)) return 'Au moins une majuscule';
        if (!/(?=.*\d)/.test(value)) return 'Au moins un chiffre';
        return '';
      case 'confirmPassword':
        return value !== formData.password ? 'Les mots de passe ne correspondent pas' : '';
      default:
        return '';
    }
  };

  const getPasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/(?=.*[a-z])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*\d)/.test(password)) score++;
    if (/(?=.*[!@#$%^&*])/.test(password)) score++;

    const strengthMap = {
      0: { label: 'Très faible', color: 'bg-red-500' },
      1: { label: 'Faible', color: 'bg-red-400' },
      2: { label: 'Moyen', color: 'bg-yellow-500' },
      3: { label: 'Bon', color: 'bg-blue-500' },
      4: { label: 'Fort', color: 'bg-green-500' },
      5: { label: 'Très fort', color: 'bg-green-600' },
    };

    return { score, ...strengthMap[score as keyof typeof strengthMap] };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }

    setError('');
    setSuccess('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const errors: Partial<Record<RegisterFormField, string>> = {};
    (Object.keys(formData) as RegisterFormField[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register(formData);
      if (response.success) {
        setSuccess('Compte créé avec succès ! Redirection en cours...');
        setTimeout(() => {
          router.push('/login?registered=true');
        }, 2000);
      } else {
        setError(response.message || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return {
    formData,
    setFormData,
    error,
    success,
    loading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleChange,
    handleBlur,
    handleSubmit,
    fieldErrors,
    touchedFields,
    passwordStrength,
  };
}
