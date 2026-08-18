interface StatusBadgeProps {
  label: string;
  variant: "success" | "neutral" | "warning" | "danger";
}

/**
 * Badge générique utilisé pour représenter les différents états
 * présents dans le Dashboard YATIGO.
 */
export function StatusBadge({
  label,
  variant,
}: StatusBadgeProps) {
  const styles = {
    success: "bg-green-50 text-green-700 ring-green-600/20",
    neutral: "bg-gray-100 text-gray-600 ring-gray-500/20",
    warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
    danger: "bg-red-50 text-red-700 ring-red-600/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[variant]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

      {label}
    </span>
  );
}