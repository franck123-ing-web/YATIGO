import { Bell } from "lucide-react";

/**
 * En-tête global du Dashboard.
 *
 * La logique utilisateur et les notifications seront connectées
 * lorsque l'authentification et le système de notifications seront prêts.
 */
export function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm text-slate-500">
          Administration YATIGO
        </p>

         <h1 className="text-lg font-semibold text-slate-900">
          Dashboard
        </h1>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        title="Notifications"
        className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
      </button>
    </header>
  );
}