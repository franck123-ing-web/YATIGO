"use client";

interface BusFeatureCardProps {
  label: string;
  description: string;
  icon: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function BusFeatureCard({
  label,
  description,
  icon,
  enabled,
  onChange,
}: BusFeatureCardProps) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => onChange(!enabled)}
      className={[
        "group flex w-full items-center gap-4 rounded-xl border p-4 text-left",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
        enabled
          ? "border-sky-500 bg-sky-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50",
      ].join(" ")}
    >
      {/* Icône de l'équipement */}
      <span
        aria-hidden="true"
        className={[
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl",
          "transition-colors",
          enabled
            ? "bg-sky-600 text-white"
            : "bg-slate-100 text-slate-500 group-hover:bg-sky-100",
        ].join(" ")}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900">
          {label}
        </span>

        <span className="mt-1 block text-xs text-slate-500">
          {description}
        </span>
      </span>

      {/* État de l'équipement */}
      <span
        className={[
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
          enabled
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-500",
        ].join(" ")}
      >
        {enabled ? "Activé" : "Désactivé"}
      </span>
    </button>
  );
}