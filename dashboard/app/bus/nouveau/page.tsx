import Link from "next/link";
import { ArrowLeft, Bus } from "lucide-react";

import { BusForm } from "@/components/bus/BusForm";

export default function NewBusPage() {
  return (
    <section className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <Link
            href="/bus"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour aux bus
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
              <Bus className="h-5 w-5" aria-hidden="true" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Ajouter un bus
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Ajoutez un nouveau bus à votre agence.
              </p>
            </div>
          </div>
        </header>

        <BusForm />
      </div>
    </section>
  );
}