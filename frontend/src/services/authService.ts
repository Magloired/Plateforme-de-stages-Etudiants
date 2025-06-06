interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    nom: string;
    prenom: string;
  };
}

// Simuler une "base de données" temporaire
let registeredUsers: any[] = [];

export const authService = {
  register: async (userData: any): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sauvegarder les données d'inscription dans le localStorage
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password,
      nom: userData.nom,
      prenom: userData.prenom,
      telephone: userData.telephone
    };
    
    // Sauvegarder dans notre "base de données" temporaire
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    return { success: true };
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Récupérer les utilisateurs enregistrés
    const savedUsers = localStorage.getItem('registeredUsers');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Rechercher l'utilisateur
    const user = users.find((u: any) => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const token = 'mock-jwt-token-' + user.id;
      const userWithoutPassword = {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        token,
        user: userWithoutPassword
      };
    }

    return {
      success: false,
      message: 'Email ou mot de passe incorrect'
    };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};