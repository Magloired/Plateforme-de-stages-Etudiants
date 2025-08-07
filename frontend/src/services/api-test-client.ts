export const testAuthEndpoints = async () => {
  try {
    console.log("🧪 Test des endpoints d'authentification...");

    const registerData = {
      nom: "Doe",
      prenom: "John",
      email: "john.doe@example.com",
      password: "password123",
      role: "Etudiant",
      filiere: "Informatique",
      niveauEtude: "Master",
      telephone: "0123456789"
    };

    const loginData = {
      email: "john.doe@example.com",
      password: "password123"
    };

    // REGISTER
    const registerRes = await fetch("/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData)
    });

    const registerJson = await registerRes.json();
    console.log("✔️ Register result:", registerJson);

    // LOGIN
    const loginRes = await fetch("/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    const loginJson = await loginRes.json();
    console.log("✔️ Login result:", loginJson);

  } catch (error) {
    console.error("❌ Erreur dans les tests d'authentification:", error);
  }
};
