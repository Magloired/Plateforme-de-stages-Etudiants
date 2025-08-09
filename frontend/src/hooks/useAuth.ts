"use client";

import { useState, useEffect } from 'react';
import { UserDTO } from '@/types/user';

interface AuthState {
  isAuthenticated: boolean;
  user: UserDTO | null;
  token: string | null;
  isLoading: boolean;
}

export function useAuth(): AuthState & {
  login: (token: string, user: UserDTO) => void;
  logout: () => void;
} {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
  });

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr) as UserDTO;
          setAuthState({
            isAuthenticated: true,
            user,
            token,
            isLoading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        // En cas d'erreur, nettoyer le localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
        });
      }
    };

    checkAuth();

    // Écouter les changements de localStorage (utile pour plusieurs onglets)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token: string, user: UserDTO) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      isAuthenticated: true,
      user,
      token,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
} 