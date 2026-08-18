import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BusForm } from "@/components/bus/BusForm";
import { getBusById } from "@/lib/bus/bus.service";

interface EditBusPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBusPage({
  params,
}: EditBusPageProps) {
  const { id } = await params;
  const bus = await getBusById(id);

  return (
    <section className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <Link
            href="/bus"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour aux bus
          </Link>

          <div className="mt-3">
            <p className="text-sm font-medium text-sky-600">
              Bus #{bus.id}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Modifier le bus
            </h1>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              Modifiez les informations et les équipements du véhicule.
            </p>
          </div>
        </div>

        <BusForm
          mode="edit"
          initialData={{
            numero_immatriculation: bus.numero_immatriculation,
            nom_commercial: bus.nom_commercial ?? "",
            modele: bus.modele ?? "",
            capacite: String(bus.capacite),
            etat: bus.etat,
            type: bus.type,
            climatisation: bus.climatisation,
            wifi: bus.wifi,
            prise_usb: bus.prise_usb,
            inclinaison_sieges: bus.inclinaison_sieges,
            nombre_sieges_par_rangee: String(bus.nombre_sieges_par_rangee),
          }}
        />
      </div>
    </section>
  );
}