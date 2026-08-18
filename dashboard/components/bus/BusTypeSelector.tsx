"use client";

type BusType = "VIP" | "CLASSIQUE";

interface BusTypeSelectorProps {
  value: BusType;
  onChange: (value: BusType) => void;
}

const types: Array<{
  value: BusType;
  label: string;
  description: string;
}> = [
  {
    value: "CLASSIQUE",
    label: "Classique",
    description: "Service standard pour les voyageurs.",
  },
  {
    value: "VIP",
    label: "VIP",
    description: "Service premium avec prestations renforcées.",
  },
];

export function BusTypeSelector({
  value,
  onChange,
}: BusTypeSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {types.map((type) => {
        const selected = value === type.value;

        return (
          <button
            key={type.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(type.value)}
            className={[
              "rounded-xl border p-4 text-left transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
              selected
                ? "border-sky-500 bg-sky-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">
                {type.label}
              </span>

              {type.value === "VIP" && (
                <span
                  className="text-sky-600"
                  title="Service premium"
                  aria-label="Service premium"
                >
                  ★
                </span>
              )}
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {type.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}