"use client";

import { useRouter } from "next/navigation";

import {
  BusForm,
  type BusFormData,
} from "@/components/bus/BusForm";

import { DashboardShell } from "@/components/layout/DashboardShell";

export default function NewBusPage() {
  const router = useRouter();

  async function handleSubmit(data: BusFormData) {
    console.log("Bus à créer :", data);

    // La connexion à l'API sera ajoutée après.
  }

  function handleCancel() {
    router.push("/bus");
  }

  return (
    <DashboardShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Ajouter un bus
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Ajoutez un nouveau bus à votre agence.
          </p>
        </div>

        <BusForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </section>
    </DashboardShell>
  );
}