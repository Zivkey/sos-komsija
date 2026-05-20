"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Avatar, Badge, Card, Stars } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  ChevronRight,
  CreditCard,
  MapPin,
  Shield,
  Wallet,
  Settings as SettingsIcon,
  Phone,
  Star,
} from "@/components/icons";

export default function ProfilePage() {
  const { state } = useStore();
  const isUser = state.role === "user";
  const me = isUser ? state.user : state.provider;
  const completedCount = state.requests.filter(
    (r) =>
      r.status === "rated" &&
      (isUser ? r.userId === "me" : r.providerId === "ana")
  ).length;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-5 py-6 sm:py-8 space-y-6">
        {/* Profile header */}
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand-100 rounded-full" />
          <div className="absolute -right-20 -top-4 w-32 h-32 bg-brand-200/40 rounded-full" />
          <div className="relative flex items-center gap-4">
            <Avatar initials={me.initials} color={me.avatarColor} size={88} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-extrabold text-ink-900 text-xl">{me.name}</div>
                <Badge variant="success" className="!gap-0.5">
                  <Shield size={11} /> Verifikovan
                </Badge>
              </div>
              <div className="text-sm text-ink-500 flex items-center gap-1.5">
                <MapPin size={12} /> {me.neighborhood}, {me.city}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Stars rating={me.ratingAvg} size={14} />
                <span className="font-bold text-ink-900">{me.ratingAvg.toFixed(2)}</span>
                <span className="text-xs text-ink-500">({me.ratingCount} ocena)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Stat label={isUser ? "Zahtevi" : "Poslovi"} value={String(completedCount || (isUser ? 5 : 47))} />
          <Stat label="Ocena" value={me.ratingAvg.toFixed(1)} tail="★" />
          <Stat label="Završeno" value="100%" />
        </div>

        {/* Menu */}
        <Card className="overflow-hidden divide-y divide-ink-100">
          <MenuItem icon={<CreditCard size={20} />} label="Načini plaćanja" sub="Visa •• 4242" />
          <MenuItem icon={<Wallet size={20} />} label={isUser ? "Istorija plaćanja" : "Zarade i isplate"} />
          <MenuItem icon={<Star size={20} />} label="Moje ocene" sub={`${me.ratingCount} ocena · prosek ${me.ratingAvg.toFixed(2)}`} />
          <MenuItem icon={<Phone size={20} />} label="Telefon" sub={me.phone} />
          <MenuItem icon={<MapPin size={20} />} label="Opština" sub={me.neighborhood} />
        </Card>

        <Card className="overflow-hidden divide-y divide-ink-100">
          <MenuItem
            icon={<SettingsIcon size={20} />}
            label="Podešavanja"
            href="/settings"
          />
        </Card>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tail }: { label: string; value: string; tail?: string }) {
  return (
    <Card className="p-4 text-center">
      <div className="text-2xl font-extrabold text-ink-900 flex items-center justify-center gap-1">
        {value}
        {tail && <span className="text-amber-400">{tail}</span>}
      </div>
      <div className="text-xs text-ink-500 font-medium uppercase tracking-wider mt-1">
        {label}
      </div>
    </Card>
  );
}

function MenuItem({
  icon,
  label,
  sub,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-ink-50 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-ink-100 flex items-center justify-center text-ink-700 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-ink-900">{label}</div>
        {sub && <div className="text-xs text-ink-500">{sub}</div>}
      </div>
      <ChevronRight size={18} className="text-ink-400" />
    </div>
  );
  if (href) return <Link href={href}>{content}</Link>;
  return <button className="w-full text-left">{content}</button>;
}
