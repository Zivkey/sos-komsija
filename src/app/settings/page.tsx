"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  Bell,
  ChevronRight,
  LogOut,
  RefreshCw,
  Shield,
  User,
} from "@/components/icons";

export default function SettingsPage() {
  const router = useRouter();
  const { logout, resetDemo } = useStore();

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-5 py-6 sm:py-8 space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            Podešavanja
          </h1>
          <p className="mt-1 text-ink-500">Upravljaj nalogom i preferencama</p>
        </div>

        {/* Other settings */}
        <Card className="overflow-hidden divide-y divide-ink-100">
          <ToggleRow icon={<Bell size={20} />} label="Notifikacije" sub="Email i SMS" defaultOn />
          <ToggleRow icon={<Shield size={20} />} label="Dvofaktorska autentifikacija" sub="Preporučeno" defaultOn />
          <ToggleRow icon={<User size={20} />} label="Profil javan" sub="Prikazuj na mapi komšijama" defaultOn />
        </Card>

        <Card className="overflow-hidden divide-y divide-ink-100">
          <button
            onClick={() => {
              if (confirm("Resetuj demo stanje? Svi zahtevi će biti obrisani.")) {
                resetDemo();
                router.replace("/home");
              }
            }}
            className="w-full text-left flex items-center gap-4 px-5 py-4 hover:bg-ink-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <RefreshCw size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-ink-900">Resetuj demo</div>
              <div className="text-xs text-ink-500">Obriši sve zahteve i započni iznova</div>
            </div>
            <ChevronRight size={18} className="text-ink-400" />
          </button>

          <button
            onClick={() => {
              if (confirm("Odjavi se iz aplikacije?")) {
                logout();
                router.replace("/onboarding");
              }
            }}
            className="w-full text-left flex items-center gap-4 px-5 py-4 hover:bg-red-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <LogOut size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-red-600">Odjavi se</div>
              <div className="text-xs text-ink-500">Izlazak iz naloga</div>
            </div>
            <ChevronRight size={18} className="text-ink-400" />
          </button>
        </Card>

        <div className="text-center text-xs text-ink-400 py-4">
          SOS Komšija · Demo verzija 1.0
        </div>
      </div>
    </AppShell>
  );
}

function ToggleRow({
  icon,
  label,
  sub,
  defaultOn = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  defaultOn?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="w-10 h-10 rounded-xl bg-ink-100 flex items-center justify-center text-ink-700 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-ink-900">{label}</div>
        {sub && <div className="text-xs text-ink-500">{sub}</div>}
      </div>
      <Toggle defaultOn={defaultOn} />
    </div>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-12 h-7 rounded-full transition-colors ${
        on ? "bg-brand-500" : "bg-ink-200"
      }`}
      role="switch"
      aria-checked={on}
    >
      <span
        className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${
          on ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}
