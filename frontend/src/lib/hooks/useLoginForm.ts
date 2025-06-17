'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';

export function useLoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
    }
    if (searchParams.get('logout') === 'true') {
      setSuccessMessage('Vous avez été déconnecté avec succès.');
    }
  }, [searchParams]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("L'adresse email est requise");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Format d'email invalide");
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Le mot de passe est requis');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    if (name === 'email') validateEmail(value);
    if (name === 'password') validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);
    if (!isEmailValid || !isPasswordValid) return;

    setLoading(true);
    try {
      const response = await authService.login(formData);
      if (response.success) {
        setSuccessMessage('Connexion réussie ! Redirection...');
        setTimeout(() => router.push('/etudiant/stages'), 1000);
      } else {
        setError(response.message || 'Erreur de connexion');
      }
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    successMessage,
    loading,
    showPassword,
    emailError,
    passwordError,
    handleChange,
    handleSubmit,
    togglePassword: () => setShowPassword((prev) => !prev),
  };
}
