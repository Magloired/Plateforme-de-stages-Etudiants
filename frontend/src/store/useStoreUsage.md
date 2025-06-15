
Le store `useUserStore` est un état global client créé avec Zustand, qui permet de :

- stocker l'utilisateur connecté
- suivre son état d'authentification
- centraliser les données liées au rôle

---

exemple

import { useUserStore } from "@/store/useUserStore";

export default function DashboardHeader() {
  const { user, isAuthenticated } = useUserStore();

  return (
    <div>
      {isAuthenticated && user ? (
        <p>Bienvenue {user.name} — rôle : {user.role}</p>
      ) : (
        <p>Non connecté</p>
      )}
    </div>
  );
}
