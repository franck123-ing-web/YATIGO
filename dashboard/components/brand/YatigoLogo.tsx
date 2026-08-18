interface YatigoLogoProps {
  compact?: boolean;
}

/**
 * Logo principal de YATIGO.
 *
 * Le "Y" constitue l'élément visuel principal de l'identité.
 * Le composant peut être utilisé dans la sidebar et dans d'autres
 * parties de l'application.
 */
export function YatigoLogo({ compact = false }: YatigoLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-label="YATIGO"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-xl font-extrabold text-white shadow-sm"
      >
        Y
      </div>

      {!compact && (
        <span className="text-xl font-bold tracking-tight text-sky-700">
          YATIGO
        </span>
      )}
    </div>
  );
}