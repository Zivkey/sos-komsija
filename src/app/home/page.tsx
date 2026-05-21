"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card, Badge, Avatar, Stars, Button } from "@/components/ui";
import { useStore, useActiveRequest } from "@/lib/store";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { ChevronRight, MapPin, Clock, Plus, Sparkles, ArrowRight, Shield, Check, User, Briefcase } from "@/components/icons";

export default function HomePage() {
  const { state } = useStore();
  if (state.role === "user") return <UserHome />;
  return <ProviderHome />;
}

function UserHome() {
  const { state } = useStore();
  const active = useActiveRequest();
  const myRequests = state.requests.filter((r) => r.userId === "me");
  const lastRated = myRequests.find((r) => r.status === "rated");
  const ActiveCat = active ? getCategory(active.category) : null;
  const ActiveIcon = ActiveCat?.Icon;
  const LastCat = lastRated ? getCategory(lastRated.category) : null;
  const LastIcon = LastCat?.Icon;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-5 py-6 sm:py-8">
        <div className="animate-fade-in flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
            <User size={28} />
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-none">
              Korisnik
            </h1>
            <p className="mt-1.5 text-ink-500 text-sm">Pronađi pomoć od komšije u par klikova</p>
          </div>
        </div>

        {/* Active request banner */}
        {active && ActiveCat && ActiveIcon && (
          <Link href={`/request/${active.id}`} className="block mt-6">
            <Card className="p-5 border-brand-200 bg-gradient-to-br from-brand-50 to-white hover:shadow-md transition-shadow animate-scale-in">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-white border border-brand-200 flex items-center justify-center shrink-0 ${ActiveCat.iconColor}`}>
                  <ActiveIcon size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="brand" className="mb-1.5">
                    {active.status === "pending" && "Tražimo pružaoca…"}
                    {active.status === "accepted" && "Prihvaćeno"}
                    {active.status === "in_progress" && "U toku"}
                    {active.status === "completed" && "Završeno — oceni"}
                  </Badge>
                  <div className="font-bold text-ink-900 truncate">{active.description.slice(0, 60)}{active.description.length > 60 ? "…" : ""}</div>
                  <div className="text-sm text-ink-500 mt-0.5">{active.when}</div>
                </div>
                <ChevronRight className="text-ink-400" />
              </div>
            </Card>
          </Link>
        )}

        {/* Quick create CTA */}
        <Link href="/request/new" className="block mt-6">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-orange-600 p-6 shadow-xl shadow-brand-500/20 hover:shadow-2xl hover:shadow-brand-500/30 transition-all">
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-white/5 rounded-full" />
            <div className="relative">
              <div className="flex items-center gap-2 text-white/90 font-medium text-sm">
                <Sparkles size={16} /> Novo
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight max-w-xs">
                Kreiraj zahtev za 30 sekundi
              </h2>
              <p className="mt-2 text-white/85 max-w-md">
                Opiši šta ti treba, mi pronalazimo pravog komšiju.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-5 h-12 rounded-2xl shadow-lg group-hover:translate-x-1 transition-transform">
                <Plus size={18} stroke={3} />
                Novi zahtev
              </div>
            </div>
          </div>
        </Link>

        {/* Categories */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-ink-900">Kategorije</h2>
            <Link href="/explore" className="text-sm font-semibold text-brand-600">
              Sve →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((c) => {
              const CIcon = c.Icon;
              return (
              <Link
                key={c.id}
                href={`/request/new?cat=${c.id}`}
                className="group"
              >
                <Card className="p-4 h-full border-ink-200 hover:border-brand-300 hover:shadow-md transition-all hover:-translate-y-0.5 active:scale-[0.98]">
                  <div className={`w-12 h-12 rounded-2xl ${c.iconBg} flex items-center justify-center ${c.iconColor}`}>
                    <CIcon size={26} />
                  </div>
                  <div className="mt-3 font-bold text-ink-900 text-[15px] leading-tight">
                    {c.name}
                  </div>
                  <div className="text-xs text-ink-500 mt-1 line-clamp-1">{c.short}</div>
                </Card>
              </Link>
              );
            })}
          </div>
        </section>

        {/* Trust strip */}
        <section className="mt-10 grid grid-cols-3 gap-3">
          <TrustItem icon={<Shield size={20} />} title="Verifikovani" sub="komšije" />
          <TrustItem icon={<Check size={20} />} title="Zaštićeno" sub="plaćanje" />
          <TrustItem icon={<Sparkles size={20} />} title="4.9★" sub="ocena" />
        </section>

        {/* Nearby helpers preview */}
        <section className="mt-10">
          <h2 className="text-lg font-extrabold text-ink-900 mb-4">
            Komšije u Vračaru
          </h2>
          <div className="space-y-3">
            {NEIGHBORS.map((n) => (
              <Card key={n.name} className="p-4 flex items-center gap-4 border-ink-200 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer">
                <Avatar initials={n.initials} color={n.color} size={52} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-ink-900 truncate">{n.name}</div>
                    <span title="Verifikovano" className="text-emerald-500"><Shield size={14} /></span>
                  </div>
                  <div className="text-sm text-ink-500 truncate">{n.expertise}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Stars rating={n.rating} size={12} />
                    <span className="text-xs font-semibold text-ink-600">{n.rating}</span>
                    <span className="text-xs text-ink-400">·</span>
                    <span className="text-xs text-ink-500">{n.distance}km</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-ink-500">od</div>
                  <div className="font-extrabold text-ink-900">{n.price} <span className="text-xs font-normal">RSD/h</span></div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {lastRated && LastCat && LastIcon && (
          <section className="mt-10">
            <h2 className="text-lg font-extrabold text-ink-900 mb-4">
              Tvoji prethodni zahtevi
            </h2>
            <Card className="p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${LastCat.iconBg} flex items-center justify-center ${LastCat.iconColor}`}>
                <LastIcon size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-ink-900 truncate">{lastRated.description.slice(0, 50)}</div>
                <div className="text-sm text-ink-500">Završeno · {lastRated.price} RSD</div>
              </div>
              <Badge variant="success"><Check size={12} /> Ocenjeno</Badge>
            </Card>
          </section>
        )}
      </div>
    </AppShell>
  );
}

function TrustItem({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/50 border border-ink-200/40">
      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 shrink-0">
        {icon}
      </div>
      <div className="min-w-0 leading-tight">
        <div className="text-sm font-bold text-ink-800">{title}</div>
        <div className="text-[11px] text-ink-500 font-medium">{sub}</div>
      </div>
    </div>
  );
}

const NEIGHBORS = [
  { name: "Stefan Petrović", initials: "SP", color: "#06b6d4", expertise: "Vodoinstalater · Električar", rating: 4.9, distance: 0.3, price: 1800 },
  { name: "Milica Jovanović", initials: "MJ", color: "#a855f7", expertise: "Iskusna dadilja, učiteljica", rating: 5.0, distance: 0.5, price: 700 },
  { name: "Nikola Lazić", initials: "NL", color: "#10b981", expertise: "Šetnja pasa · Briga o ljubimcima", rating: 4.8, distance: 0.7, price: 600 },
];

function ProviderHome() {
  const { state } = useStore();
  const pending = state.requests.filter((r) => r.status === "pending");
  const mine = state.requests.filter((r) => r.providerId === "ana");
  const active = mine.find((r) => r.status === "accepted" || r.status === "in_progress");
  const ActiveCat = active ? getCategory(active.category) : null;
  const ActiveIcon = ActiveCat?.Icon;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-5 py-6 sm:py-8">
        <div className="animate-fade-in flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
            <Briefcase size={26} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-none">
              Pružalac
            </h1>
            <p className="mt-1.5 text-ink-500 text-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {pending.length} novih zahteva u Vračaru
            </p>
          </div>
        </div>

        {/* Earnings card */}
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 p-6 text-white shadow-xl overflow-hidden relative">
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-brand-500/30 rounded-full blur-3xl" />
          <div className="relative">
            <div className="text-white/60 text-sm font-medium">Zarada ovog meseca</div>
            <div className="mt-1 text-4xl font-extrabold tracking-tight">
              28,400 <span className="text-xl text-white/60 font-medium">RSD</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-white/60">Zahteva</div>
                <div className="font-bold text-lg">17</div>
              </div>
              <div>
                <div className="text-xs text-white/60">Ocena</div>
                <div className="font-bold text-lg flex items-center gap-1">
                  4.95 <span className="text-amber-400">★</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/60">Završenost</div>
                <div className="font-bold text-lg">100%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Active request */}
        {active && ActiveCat && ActiveIcon && (
          <Link href={`/request/${active.id}`} className="block mt-6">
            <Card className="p-5 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition-shadow animate-scale-in">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-white border border-amber-200 flex items-center justify-center shrink-0 ${ActiveCat.iconColor}`}>
                  <ActiveIcon size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="warning" className="mb-1.5">
                    {active.status === "accepted" && "Prihvaćeno"}
                    {active.status === "in_progress" && "U toku"}
                  </Badge>
                  <div className="font-bold text-ink-900 truncate">{active.description.slice(0, 60)}{active.description.length > 60 ? "…" : ""}</div>
                  <div className="text-sm text-ink-500 mt-0.5">{active.address}</div>
                </div>
                <ChevronRight className="text-ink-400" />
              </div>
            </Card>
          </Link>
        )}

        {/* Map preview link */}
        <Link href="/explore" className="block mt-6">
          <div className="relative h-48 rounded-3xl overflow-hidden bg-gradient-to-br from-sky-100 to-emerald-100 border border-ink-200/60 hover:shadow-md transition-all">
            <MiniMap />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div className="text-white">
                <div className="text-xs font-medium text-white/80">Mapa zahteva u blizini</div>
                <div className="text-lg font-bold flex items-center gap-1.5">
                  {pending.length} aktivnih u Vračaru
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Available requests */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-ink-900">
              Dostupni zahtevi
            </h2>
            <Link href="/explore" className="text-sm font-semibold text-brand-600">
              Sve →
            </Link>
          </div>
          <div className="space-y-3">
            {pending.slice(0, 4).map((r) => (
              <RequestRowProvider key={r.id} request={r} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function RequestRowProvider({ request }: { request: import("@/lib/types").ServiceRequest }) {
  const cat = getCategory(request.category);
  const age = Math.floor((Date.now() - request.createdAt) / 60000);
  const ageLabel = age < 60 ? `pre ${age}min` : `pre ${Math.floor(age / 60)}h`;
  return (
    <Link href={`/request/${request.id}`}>
      <Card className="p-4 border-ink-200 hover:border-brand-300 hover:shadow-md transition-all hover:-translate-y-0.5 active:scale-[0.99]">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge variant="brand">{cat.short}</Badge>
              <span className="text-xs text-ink-500 flex items-center gap-1">
                <Clock size={12} /> {ageLabel}
              </span>
            </div>
            <div className="font-bold text-ink-900 truncate">{request.title}</div>
            <div className="text-sm text-ink-500 mt-0.5 flex items-center gap-1.5">
              <MapPin size={12} /> {request.neighborhood} · {request.distanceKm}km
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-extrabold text-ink-900">{request.price.toLocaleString("sr-RS")}</div>
            <div className="text-xs text-ink-500">RSD</div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function MiniMap() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="url(#grid)" />
      {/* Roads */}
      <path d="M0 100 Q 100 80 200 100 T 400 90" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      <path d="M150 0 L 180 200" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      <path d="M300 0 L 270 200" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      {/* Park */}
      <rect x="40" y="40" width="80" height="50" rx="6" fill="rgba(16,185,129,0.25)" />
      {/* You marker */}
      <circle cx="200" cy="100" r="20" fill="rgba(249,115,22,0.18)" />
      <circle cx="200" cy="100" r="9" fill="#f97316" stroke="white" strokeWidth="3" />
      {/* Pins */}
      {[[120, 60], [310, 70], [80, 140], [340, 150], [240, 50], [160, 160]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="white" stroke="#f97316" strokeWidth="2.5" />
          <text x={x} y={y + 3} fontSize="9" fontWeight="bold" fill="#f97316" textAnchor="middle">{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}
