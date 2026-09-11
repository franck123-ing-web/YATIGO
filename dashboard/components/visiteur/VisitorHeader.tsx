import Link from "next/link";

export function VisitorHeader() {
  return (
    <header className="h-20 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-end px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/connexion"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Se connecter
          </Link>

          <Link
            href="/inscription"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </header>
  );
}