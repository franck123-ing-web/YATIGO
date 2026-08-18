"use client";

import {
  Bus,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { YatigoLogo } from "@/components/brand/YatigoLogo";

const navigationItems = [
  {
    label: "Tableau de bord",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Bus",
    href: "/bus",
    icon: Bus,
  },
  {
    label: "Chauffeurs",
    href: "/chauffeurs",
    icon: UserRound,
  },
  {
    label: "Trajets",
    href: "/trajets",
    icon: CalendarDays,
  },
  {
    label: "Réservations",
    href: "/reservations",
    icon: ClipboardList,
  },
  {
    label: "Employés",
    href: "/employes",
    icon: Users,
  },
];

/**
 * Navigation principale du Dashboard YATIGO.
 *
 * Les routes sont centralisées ici afin d'éviter de dupliquer
 * les liens dans plusieurs composants.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <YatigoLogo />
      </div>

      <nav
        aria-label="Navigation principale"
        className="flex-1 space-y-1 px-4 py-6"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sky-50 text-sky-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <Link
          href="/parametres"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
          <span>Paramètres</span>
        </Link>

        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}