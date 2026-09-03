import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReservationForm } from "@/components/reservations/ReservationForm";

export default function NewReservationPage() {
  return (
    <DashboardShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Ajouter une réservation
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Créez une nouvelle réservation et attribuez les places aux
            passagers.
          </p>
        </div>

        <ReservationForm />
      </section>
    </DashboardShell>
  );
}