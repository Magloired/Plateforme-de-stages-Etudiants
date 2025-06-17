
import { fetchFromAPI } from "@/lib/api";
import { RegisterFormData } from "@/app/types/loginForms";
interface LoginCredentials {
  email: string;
  password: string;
}
interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  isActif: boolean;
  dateInscription: string;
  filiere?: string | null;
  niveauEtude?: string | null;
  telephone?: string | null;
  specialite?: string | null;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export const authService = {
  register: async (userData: RegisterFormData): Promise<AuthResponse> => {
    const { confirmPassword, ...payload } = userData;

    try {
      const response = await fetchFromAPI("auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      return {
        success: true,
        message: response.message || "Inscription réussie",
        token: response.token,
        //user: response.user,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Erreur d'inscription",
      };
    }
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const result = await fetchFromAPI("auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (!result.token) {
      return {
        success: false,
        message: result.message || "Aucun token reçu",
      };
    }

    localStorage.setItem("token", result.token);

    return {
      success: true,
      token: result.token,
      user: result.user,
    };
  } catch (error: any) {
    // erreur fetchFromAPI erreur HTTP
    return {
      success: false,
      message: error.message || "Erreur de connexion",
    };
  }
}

};
