import Link from "next/link";

export function VisitorSidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-6">

      {/* Logo */}
      <Link
        href="/visiteur"
        className="mb-12 flex items-center gap-3"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
          Y
        </div>

        <span className="text-2xl font-bold text-blue-900">
          YATIGO
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <Link
          href="/visiteur"
          className="rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-600"
        >
          Accueil
        </Link>

        <Link
          href="/visiteur#destinations"
          className="rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-50"
        >
          Destinations
        </Link>

        <Link
          href="/visiteur#a-propos"
          className="rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-50"
        >
          À propos
        </Link>

        <Link
          href="/visiteur#aide"
          className="rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-50"
        >
          Aide
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <button className="rounded-xl px-4 py-3 text-left text-slate-600 hover:bg-slate-50">
          Paramètres
        </button>
      </div>

    </aside>
  );
}