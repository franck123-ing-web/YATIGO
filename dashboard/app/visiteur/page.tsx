import { VisitorHeader } from "@/components/visiteur/VisitorHeader";
import { VisitorSidebar } from "@/components/visiteur/VisitorSidebar";
import { TripSearch } from "@/components/visiteur/TripSearch";
import { PopularDestinations } from "@/components/visiteur/PopularDestinations";
import { WhyYatigo } from "@/components/visiteur/WhyYatigo";
import { HelpSection } from "@/components/visiteur/HelpSection";

export default function PageVisiteur() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <VisitorSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <VisitorHeader />

        <main className="flex-1 p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Votre partenaire de mobilité
          </p>

          <h1 className="text-5xl font-bold leading-tight text-blue-950">
            Bienvenue sur
            <span className="block text-blue-600">
              YATIGO
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-xl leading-8 text-slate-600">
            Recherchez et réservez votre prochain voyage en toute simplicité.
          </p>

          <TripSearch />
          <PopularDestinations />
          <WhyYatigo />
        <HelpSection />
        <footer className="mt-12 border-t border-slate-200 py-8">
  <div className="flex flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row">
    <p>© 2026 YATIGO. Tous droits réservés.</p>

    <div className="flex gap-6">
      <a href="#" className="hover:text-blue-600">
        Conditions d&apos;utilisation
      </a>

      <a href="#" className="hover:text-blue-600">
        Confidentialité
      </a>

      <a href="#" className="hover:text-blue-600">
        Contact
      </a>
    </div>
  </div>
</footer>
        </main>
      </div>

    </div>
  );
}