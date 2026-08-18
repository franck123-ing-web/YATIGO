/**
 * Configuration centrale de l'API YATIGO.
 *
 * L'URL du backend est fournie par la variable
 * d'environnement NEXT_PUBLIC_API_URL.
 */

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error(
    "La variable NEXT_PUBLIC_API_URL n'est pas configurée.",
  );
}

export const API_CONFIG = {
  baseUrl: apiUrl.replace(/\/$/, ""),
} as const;