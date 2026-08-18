import Link from "next/link";
import { ArrowLeft, Bus as BusIcon } from "lucide-react";

import { BusForm } from "@/components/bus/BusForm";

export default function NewBusPage() {
  return (
    <section className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* En-tête */}
        <div className="space-y-5">
          <Link
            href="/bus"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-700"
          >
            <ArrowLeft
              className="h-4 w-4"
              aria-hidden="true"
            />
            Retour aux bus
          </Link>

          <div className="flex items-start gap-4">
            {/* Icône */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <BusIcon
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>

            {/* Titre */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Ajouter un bus
              </h1>

              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                Ajoutez un nouveau bus à votre agence et configurez ses
                caractéristiques.
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <BusForm />
        </div>
      </div>
    </section>
  );
}