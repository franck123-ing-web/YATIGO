"use client";

type BusStatus =
  | "DISPONIBLE"
  | "MAINTENANCE"
  | "HORS_SERVICE";

interface BusStatusSelectorProps {
  value: BusStatus;
  onChange: (value: BusStatus) => void;
}

const statuses: Array<{
  value: BusStatus;
  label: string;
  description: string;
}> = [
  {
    value: "DISPONIBLE",
    label: "Disponible",
    description: "Le bus peut être affecté à un trajet.",
  },
  {
    value: "MAINTENANCE",
    label: "Maintenance",
    description: "Le bus est temporairement indisponible.",
  },
  {
    value: "HORS_SERVICE",
    label: "Hors service",
    description: "Le bus ne doit plus être utilisé.",
  },
];

export function BusStatusSelector({
  value,
  onChange,
}: BusStatusSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {statuses.map((status) => {
        const selected = value === status.value;

        return (
          <button
            key={status.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(status.value)}
            className={[
              "rounded-xl border p-4 text-left transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
              selected
                ? "border-sky-500 bg-sky-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={[
                  "h-2.5 w-2.5 rounded-full",
                  status.value === "DISPONIBLE" &&
                    "bg-emerald-500",
                  status.value === "MAINTENANCE" &&
                    "bg-amber-500",
                  status.value === "HORS_SERVICE" &&
                    "bg-slate-400",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />

              <span className="text-sm font-semibold text-slate-900">
                {status.label}
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {status.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}