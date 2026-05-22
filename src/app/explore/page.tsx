"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card, Badge, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { CATEGORIES, getCategory } from "@/lib/categories";
import {
  Filter,
  MapPin,
  Clock,
  Search as SearchIcon,
  Sparkles,
  ArrowRight,
} from "@/components/icons";
import type { CategoryId } from "@/lib/types";

export default function ExplorePage() {
  const { state } = useStore();
  const [view, setView] = useState<"list" | "map">("list");
  const [filter, setFilter] = useState<CategoryId | "all">("all");

  const isUser = state.role === "user";

  // For user → show "Komšije u blizini"; for provider → show available requests
  if (isUser) {
    return (
      <AppShell>
        <UserExplore />
      </AppShell>
    );
  }

  const pending = state.requests.filter(
    (r) => r.status === "pending" && (filter === "all" || r.category === filter)
  );

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-5 py-6 sm:py-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            Zahtevi u blizini
          </h1>
          <p className="mt-1 text-ink-500">{pending.length} aktivnih u Vračaru</p>
        </div>

        <div className="mt-5 flex gap-2 bg-white border border-ink-200/60 rounded-2xl p-1">
          <button
            onClick={() => setView("list")}
            className={`flex-1 h-11 rounded-xl font-semibold text-sm transition-all ${
              view === "list" ? "bg-ink-900 text-white shadow" : "text-ink-600"
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex-1 h-11 rounded-xl font-semibold text-sm transition-all ${
              view === "map" ? "bg-ink-900 text-white shadow" : "text-ink-600"
            }`}
          >
            Mapa
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            Sve · {state.requests.filter((r) => r.status === "pending").length}
          </FilterChip>
          {CATEGORIES.map((c) => {
            const count = state.requests.filter(
              (r) => r.status === "pending" && r.category === c.id
            ).length;
            const CIcon = c.Icon;
            return (
              <FilterChip
                key={c.id}
                active={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <CIcon size={14} className={filter === c.id ? "" : c.iconColor} />
                  {c.short} · {count}
                </span>
              </FilterChip>
            );
          })}
        </div>

        {view === "map" && (
          <Card className="mt-5 overflow-hidden">
            <div className="relative h-[400px] bg-gradient-to-br from-sky-50 to-emerald-50">
              <BigMap requests={pending} />
              <div className="absolute top-3 left-3 px-3 py-2 bg-white/95 backdrop-blur rounded-full shadow flex items-center gap-2">
                <MapPin size={14} className="text-brand-500" />
                <span className="text-xs font-bold text-ink-800">Vračar</span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {pending.slice(0, 3).map((r) => (
                <RequestRow key={r.id} req={r} />
              ))}
            </div>
          </Card>
        )}

        {view === "list" && (
          <div className="mt-5 space-y-3">
            {pending.map((r) => (
              <RequestRow key={r.id} req={r} />
            ))}
            {pending.length === 0 && (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center mx-auto text-ink-400">
                  <SearchIcon size={32} />
                </div>
                <div className="mt-3 font-bold text-ink-900">Nema zahteva</div>
                <div className="text-sm text-ink-500">
                  Trenutno nema otvorenih zahteva u ovoj kategoriji.
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function UserExplore() {
  const helpers = [
    { name: "Stefan Petrović", initials: "SP", color: "#06b6d4", expertise: "Vodoinstalater, električar", rating: 4.9, count: 87, distance: 0.3, price: 1800, badge: "Top" },
    { name: "Milica Jovanović", initials: "MJ", color: "#a855f7", expertise: "Iskusna dadilja", rating: 5.0, count: 124, distance: 0.5, price: 700, badge: "Verifikovan" },
    { name: "Nikola Lazić", initials: "NL", color: "#10b981", expertise: "Briga o ljubimcima", rating: 4.8, count: 56, distance: 0.7, price: 600 },
    { name: "Jelena Stojanović", initials: "JS", color: "#f59e0b", expertise: "Pomoć starijima", rating: 4.95, count: 92, distance: 0.9, price: 500, badge: "Brza" },
    { name: "Dušan Mihajlović", initials: "DM", color: "#ef4444", expertise: "Selidbe, fizički poslovi", rating: 4.7, count: 41, distance: 1.1, price: 1500 },
  ];
  return (
    <div className="max-w-3xl mx-auto px-5 py-6 sm:py-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          Komšije u Vračaru
        </h1>
        <p className="mt-1 text-ink-500">Pretraži pružaoce po kategoriji.</p>
      </div>

      <div className="mt-5 relative">
        <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          placeholder='Šta tražiš? npr. "vodoinstalater"...'
          className="w-full h-14 pl-12 pr-4 bg-white border border-ink-200 rounded-2xl text-[15px] focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
        />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
        <FilterChip active>Sve</FilterChip>
        {CATEGORIES.map((c) => {
          const CIcon = c.Icon;
          return (
          <FilterChip key={c.id}>
            <span className="inline-flex items-center gap-1.5">
              <CIcon size={14} className={c.iconColor} />
              {c.short}
            </span>
          </FilterChip>
          );
        })}
      </div>

      <div className="mt-5 space-y-3">
        {helpers.map((h) => (
          <Card key={h.name} className="p-4 border-ink-200 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg"
                  style={{ background: `linear-gradient(135deg, ${h.color}, ${darken(h.color)})` }}
                >
                  {h.initials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-bold text-ink-900">{h.name}</div>
                  {h.badge && <Badge variant="brand">{h.badge}</Badge>}
                </div>
                <div className="text-sm text-ink-500 truncate">{h.expertise}</div>
                <div className="mt-1 text-xs text-ink-500 flex items-center gap-2">
                  <span className="font-bold text-amber-600">★ {h.rating}</span>
                  <span>·</span>
                  <span>{h.count} ocena</span>
                  <span>·</span>
                  <span>{h.distance}km</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-ink-900">{h.price}</div>
                <div className="text-xs text-ink-500">RSD/h</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function darken(hex: string) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) - 30;
  let g = ((num >> 8) & 0x00ff) - 30;
  let b = (num & 0x0000ff) - 30;
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 h-10 px-4 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
        active
          ? "bg-ink-900 text-white shadow"
          : "bg-white border border-ink-200 text-ink-700 hover:border-ink-300"
      }`}
    >
      {children}
    </button>
  );
}

function RequestRow({ req }: { req: import("@/lib/types").ServiceRequest }) {
  const cat = getCategory(req.category);
  const CIcon = cat.Icon;
  const age = Math.floor((Date.now() - req.createdAt) / 60000);
  const ageLabel = age < 60 ? `pre ${age}min` : `pre ${Math.floor(age / 60)}h`;
  return (
    <Link href={`/request/${req.id}`}>
      <Card className="p-4 border-ink-200 hover:border-brand-300 hover:shadow-md transition-all hover:-translate-y-0.5 active:scale-[0.99]">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl ${cat.iconBg} flex items-center justify-center shrink-0 ${cat.iconColor}`}>
            <CIcon size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cat.iconBg} ${cat.iconColor}`}>
                {cat.short}
              </span>
              <span className="text-xs text-ink-500 flex items-center gap-1">
                <Clock size={12} /> {ageLabel}
              </span>
            </div>
            <div className="font-bold text-ink-900 truncate">{req.title}</div>
            <div className="text-sm text-ink-500 mt-0.5 flex items-center gap-1.5">
              <MapPin size={12} /> {req.neighborhood} · {req.distanceKm}km
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-extrabold text-ink-900">{req.price.toLocaleString("sr-RS")}</div>
            <div className="text-xs text-ink-500">RSD</div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function BigMap({ requests }: { requests: import("@/lib/types").ServiceRequest[] }) {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid4" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#grid4)" />
      <path d="M0 200 Q 100 180 200 200 T 400 190" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      <path d="M180 0 L 220 400" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      <path d="M0 100 L 400 110" stroke="rgba(15,23,42,0.1)" strokeWidth="4" fill="none" />
      <path d="M0 300 L 400 310" stroke="rgba(15,23,42,0.1)" strokeWidth="4" fill="none" />
      <rect x="40" y="60" width="100" height="80" rx="8" fill="rgba(16,185,129,0.2)" />
      <text x="90" y="105" fontSize="11" fontWeight="bold" fill="#065f46" textAnchor="middle">Park Manjež</text>

      {/* Center self */}
      <g transform="translate(200 200)">
        <circle r="28" fill="rgba(249,115,22,0.15)" />
        <circle r="14" fill="#f97316" stroke="white" strokeWidth="4" />
        <text x="0" y="3" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">JA</text>
      </g>

      {/* Request pins */}
      {requests.slice(0, 6).map((r, i) => {
        const pos = [
          [80, 100], [320, 130], [110, 290], [320, 280], [240, 80], [150, 330],
        ][i];
        if (!pos) return null;
        const color = ["#06b6d4", "#a855f7", "#10b981", "#f59e0b", "#ef4444", "#ec4899"][i];
        return (
          <g key={r.id} transform={`translate(${pos[0]} ${pos[1]})`}>
            <circle r="18" fill="white" stroke={color} strokeWidth="3" />
            <circle r="9" fill={color} />
            <text x="0" y="3.5" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">{i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}
