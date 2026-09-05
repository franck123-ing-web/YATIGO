"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";

import { AuthShowcasePanel } from "@/components/auth/AuthShowcasePanel";
import { FormField, fieldInputClass } from "@/components/auth/FormField";
import { PasswordInput } from "@/components/auth/PasswordInput";

interface ConnexionForm {
  email: string;
  motDePasse: string;
}

export default function ConnexionPage() {
  const [form, setForm] = useState<ConnexionForm>({ email: "", motDePasse: "" });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.motDePasse) {
      setError("Veuillez renseigner votre e-mail et votre mot de passe.");
      return;
    }

    // TODO: brancher sur l'API de connexion (POST /auth/login)
    console.log("Connexion", { ...form, remember });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AuthShowcasePanel
        title="Reprenez le contrôle de votre flotte."
        description="Connectez-vous pour suivre vos bus, vos trajets et vos réservations en temps réel."
        bullets={[
          "Tableau de bord unifié",
          "Historique complet des trajets",
          "Accès sécurisé à votre agence",
        ]}
      />

      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-[58%] lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Connexion à votre espace
            </h2>
            <div className="mt-2 h-1 w-10 rounded-full bg-[#C9A227]" />
            <p className="mt-3 text-sm text-slate-600">
              Entrez vos identifiants pour accéder à votre tableau de bord.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <FormField
              label="Adresse e-mail"
              htmlFor="email"
              icon={<Mail className="h-4 w-4" />}
            >
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="agence@yatigo.com"
                className={`${fieldInputClass} pl-10 pr-4`}
              />
            </FormField>

            <FormField
              label="Mot de passe"
              htmlFor="motDePasse"
              icon={<Lock className="h-4 w-4" />}
            >
              <PasswordInput
                id="motDePasse"
                name="motDePasse"
                value={form.motDePasse}
                onChange={handleChange}
                required
                placeholder="Votre mot de passe"
              />
            </FormField>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#0A2647] focus:ring-[#0A2647]"
                />
                Se souvenir de moi
              </label>
              <Link
                href="/mot-de-passe-oublie"
                className="font-medium text-[#0A2647] underline-offset-4 hover:underline decoration-[#C9A227] decoration-2"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#0A2647] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0d2f57] focus:outline-none focus:ring-2 focus:ring-[#0A2647] focus:ring-offset-2"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Pas encore de compte ?{" "}
            <Link
              href="/inscription"
              className="font-semibold text-[#0A2647] underline-offset-4 hover:underline decoration-[#C9A227] decoration-2"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}