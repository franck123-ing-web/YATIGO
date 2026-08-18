import { API_CONFIG } from "./config";

interface ApiErrorResponse {
  detail?: string;
  message?: string;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Client HTTP centralisé de l'application Dashboard.
 *
 * Toutes les communications avec FastAPI doivent passer
 * par cette couche afin de centraliser :
 * - l'URL de l'API ;
 * - les en-têtes ;
 * - la gestion des erreurs HTTP ;
 * - le traitement des réponses JSON.
 */
export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}${path}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    },
  );

  if (!response.ok) {
    let errorMessage =
      "Une erreur est survenue lors de la communication avec le serveur.";

    try {
      const errorData =
        (await response.json()) as ApiErrorResponse;

      errorMessage =
        errorData.detail ??
        errorData.message ??
        errorMessage;
    } catch {
      // La réponse peut ne pas contenir de JSON.
    }

    throw new ApiError(
      errorMessage,
      response.status,
    );
  }

  /*
   * Certaines réponses HTTP peuvent ne pas avoir de contenu.
   * On évite donc d'appeler response.json() systématiquement.
   */
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}