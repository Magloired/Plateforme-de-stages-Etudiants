// @/lib/api

const BASE_URL = "http://localhost:5196/api";

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    // Si JSON, on tente d'accéder à data.message, sinon data est string
    const errorMessage = isJson
      ? data?.message || "Erreur du serveur"
      : data || "Erreur inconnue";

    throw new Error(errorMessage);
  }

  return data;
}
