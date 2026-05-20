"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Logo } from "./Logo";
import { Avatar, StatusDot } from "./ui";
import {
  Home,
  Search,
  MessageIcon,
  User,
  Bell,
  Briefcase,
} from "./icons";
import { useStore, useActiveRequest } from "@/lib/store";
import type { Role } from "@/lib/types";

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { state, ready, setRole } = useStore();

  useEffect(() => {
    if (!ready) return;
    if (!state.onboarded) router.replace("/onboarding");
    else if (!state.authenticated) router.replace("/auth/phone");
  }, [ready, state.onboarded, state.authenticated, router]);

  const isUser = state.role === "user";
  const me = isUser ? state.user : state.provider;

  const tabs = [
    {
      href: "/home",
      label: "Početna",
      icon: Home,
      active:
        pathname === "/home" ||
        pathname === "/" ||
        pathname.startsWith("/request/new"),
    },
    {
      href: "/explore",
      label: isUser ? "Istraži" : "Zahtevi",
      icon: Search,
      active: pathname.startsWith("/explore"),
    },
    {
      href: "/messages",
      label: "Poruke",
      icon: MessageIcon,
      active: pathname.startsWith("/messages") || pathname.startsWith("/request/") && pathname.endsWith("/chat"),
    },
    {
      href: "/profile",
      label: "Profil",
      icon: User,
      active: pathname.startsWith("/profile") || pathname.startsWith("/settings"),
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-ink-50/60">
      <Header me={me} role={state.role} onRoleChange={setRole} />
      <main className="flex-1 pb-28">{children}</main>
      <BottomNav tabs={tabs} />
    </div>
  );
}

function Header({
  me,
  role,
  onRoleChange,
}: {
  me: { name: string; neighborhood: string; initials: string; avatarColor: string };
  role: Role;
  onRoleChange: (r: Role) => void;
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-ink-200/60">
      <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
        <Link href="/home" className="flex items-center gap-2.5 shrink-0">
          <Logo size={36} showText={false} />
          <div className="leading-tight hidden sm:block">
            <div className="font-extrabold text-brand-500 text-base tracking-tight">
              SOS Komšija
            </div>
            <div className="text-[11px] text-ink-500 font-medium flex items-center gap-1">
              <StatusDot color="#10b981" /> {me.neighborhood}, Beograd
            </div>
          </div>
        </Link>

        <RoleSwitcher role={role} onRoleChange={onRoleChange} />

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <Link
            href="/messages"
            className="relative w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
            aria-label="Obaveštenja"
          >
            <Bell size={20} className="text-ink-700" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand-500" />
          </Link>
          <Link href="/profile" aria-label="Profil">
            <Avatar
              initials={me.initials}
              color={me.avatarColor}
              size={44}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

function RoleSwitcher({
  role,
  onRoleChange,
}: {
  role: Role;
  onRoleChange: (r: Role) => void;
}) {
  return (
    <div className="ml-auto sm:ml-4 flex bg-ink-100 rounded-full p-1 shrink-0">
      <button
        onClick={() => onRoleChange("user")}
        className={`relative h-8 px-3 sm:px-4 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
          role === "user"
            ? "bg-white text-brand-600 shadow-sm"
            : "text-ink-500 hover:text-ink-700"
        }`}
        aria-pressed={role === "user"}
      >
        <User size={14} />
        <span className="hidden sm:inline">Korisnik</span>
      </button>
      <button
        onClick={() => onRoleChange("provider")}
        className={`relative h-8 px-3 sm:px-4 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
          role === "provider"
            ? "bg-white text-sky-600 shadow-sm"
            : "text-ink-500 hover:text-ink-700"
        }`}
        aria-pressed={role === "provider"}
      >
        <Briefcase size={14} />
        <span className="hidden sm:inline">Pružalac</span>
      </button>
    </div>
  );
}

function BottomNav({
  tabs,
}: {
  tabs: { href: string; label: string; icon: React.FC<{size?: number, className?: string}>; active: boolean }[];
}) {
  const active = useActiveRequest();
  return (
    <>
      {active && active.status !== "pending" && (
        <ActiveRequestBar active={active} />
      )}
      <nav className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-ink-200/60 rounded-3xl shadow-xl shadow-ink-900/5 px-2 py-2">
            <div className="grid grid-cols-4 gap-1">
              {tabs.map((t) => {
                const Icon = t.icon;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`relative flex flex-col items-center justify-center gap-1 py-2.5 rounded-2xl transition-all ${
                      t.active ? "text-brand-600" : "text-ink-500 hover:text-ink-800"
                    }`}
                  >
                    {t.active && (
                      <span className="absolute inset-0 bg-brand-50 rounded-2xl -z-10" />
                    )}
                    <Icon size={22} />
                    <span className="text-[11px] font-semibold">{t.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function ActiveRequestBar({ active }: { active: { id: string; status: string; title: string; category: string } }) {
  const labels: Record<string, { text: string; color: string }> = {
    accepted: { text: "Prihvaćeno • Stiže uskoro", color: "bg-sky-500" },
    in_progress: { text: "U toku", color: "bg-amber-500" },
    completed: { text: "Završeno • Oceni", color: "bg-emerald-500" },
  };
  const meta = labels[active.status];
  if (!meta) return null;
  return (
    <Link
      href={`/request/${active.id}`}
      className="fixed bottom-24 left-0 right-0 z-30 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="pointer-events-auto bg-ink-900 text-white rounded-2xl shadow-2xl shadow-ink-900/20 px-4 py-3 flex items-center gap-3 animate-slide-up">
          <span className={`w-2.5 h-2.5 rounded-full ${meta.color} animate-pulse`} />
          <div className="flex-1">
            <div className="text-xs text-white/60 font-medium">Aktivan zahtev</div>
            <div className="text-sm font-bold">{active.title} — {meta.text}</div>
          </div>
          <div className="text-xs font-bold text-brand-300">Otvori →</div>
        </div>
      </div>
    </Link>
  );
}
