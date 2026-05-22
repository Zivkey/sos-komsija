"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Avatar, Badge, Button, Card, Stars } from "@/components/ui";
import { useStore } from "@/lib/store";
import { getCategory } from "@/lib/categories";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Clock,
  FileText,
  MapPin,
  MessageIcon,
  PartyPopper,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Walking,
  Wrench,
  X,
} from "@/components/icons";
import type { RequestStatus } from "@/lib/types";

export default function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getRequest, state, acceptRequest, setRequestStatus } = useStore();
  const request = getRequest(id);
  const [foundProvider, setFoundProvider] = useState(false);

  // Simulate finding a provider after payment (when status is pending and it's user's request)
  useEffect(() => {
    if (!request) return;
    if (state.role === "user" && request.userId === "me" && request.status === "pending") {
      const t = setTimeout(() => {
        acceptRequest(request.id);
        setFoundProvider(true);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [request, state.role, acceptRequest]);

  useEffect(() => {
    if (!request) router.replace("/home");
  }, [request, router]);

  if (!request) return null;

  const isMyRequest = request.userId === "me";
  const cat = getCategory(request.category);
  const CatIcon = cat.Icon;
  const isUser = state.role === "user";
  const otherParty = isUser ? state.provider : state.user;

  return (
    <div className="min-h-dvh flex flex-col bg-ink-50/60">
      <header className="sticky top-0 z-30 bg-white border-b border-ink-200/60">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/home")}
            className="w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="text-xs text-ink-500 font-medium">Zahtev</div>
            <div className="font-extrabold text-ink-900 truncate">{cat.name}</div>
          </div>
          <Logo size={36} showText={false} />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-6 pb-8 space-y-5">
        {/* Status hero */}
        <StatusHero
          status={request.status}
          isUser={isUser}
          isMyRequest={isMyRequest}
          foundProvider={foundProvider}
        />

        {/* Map / ETA */}
        {(request.status === "accepted" || request.status === "in_progress") && (
          <Card className="overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-sky-50 to-emerald-50">
              <ProviderMap status={request.status} />
              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-ink-800">
                  {request.status === "accepted" ? "Stiže za 8 min" : "Stigao na lokaciju"}
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Pending state for user (searching) */}
        {request.status === "pending" && isUser && isMyRequest && (
          <Card className="p-6 text-center bg-gradient-to-br from-brand-50 to-white border-brand-100">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-brand-200" />
              <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin-slow" />
              <div className={`absolute inset-0 flex items-center justify-center ${cat.iconColor}`}>
                <CatIcon size={36} />
              </div>
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-ink-900">
              Tražimo komšiju za tebe
            </h2>
            <p className="mt-2 text-ink-600 text-sm">
              Obaveštavamo {Math.floor(Math.random() * 8 + 12)} verifikovanih pružaoca u Vračaru…
            </p>
          </Card>
        )}

        {/* Counterparty card */}
        {request.status !== "pending" && request.providerId && (
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <Avatar
                initials={otherParty.initials}
                color={otherParty.avatarColor}
                size={64}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-extrabold text-ink-900 text-lg truncate">
                    {otherParty.name}
                  </div>
                  <Shield size={16} className="text-emerald-500" />
                </div>
                <div className="text-sm text-ink-500">
                  {isUser ? "Pružalac usluge" : "Korisnik"}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Stars rating={otherParty.ratingAvg} size={12} />
                  <span className="text-xs font-semibold text-ink-700">
                    {otherParty.ratingAvg.toFixed(2)}
                  </span>
                  <span className="text-xs text-ink-400">·</span>
                  <span className="text-xs text-ink-500">
                    {otherParty.ratingCount} ocena
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href={`/request/${id}/chat`}>
                <Button variant="secondary" fullWidth>
                  <MessageIcon size={18} /> Poruka
                </Button>
              </Link>
              <Button variant="secondary" fullWidth>
                <Phone size={18} /> Pozovi
              </Button>
            </div>
          </Card>
        )}

        {/* Provider accepts request CTA (provider view, pending status) */}
        {request.status === "pending" && !isUser && (
          <Card className="p-5 bg-brand-50 border-brand-200">
            <div className="text-sm font-semibold text-brand-700 mb-2">
              Prihvati ovaj zahtev?
            </div>
            <div className="text-2xl font-extrabold text-ink-900">
              Zaradi {request.price.toLocaleString("sr-RS")} RSD
            </div>
            <div className="text-sm text-ink-600 mt-1">
              Od pružaoca se očekuje da stigne u dogovoreno vreme.
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                onClick={() => router.push("/home")}
                fullWidth
              >
                Odbij
              </Button>
              <Button
                onClick={() => {
                  acceptRequest(request.id);
                }}
                fullWidth
              >
                <Check size={18} stroke={3} /> Prihvati
              </Button>
            </div>
          </Card>
        )}

        {/* Request details */}
        <Card className="p-5 space-y-4">
          <h3 className="text-xs font-bold text-ink-500 uppercase tracking-wider">
            Detalji zahteva
          </h3>
          <DetailRow icon={<CatIcon size={20} />} iconColor={cat.iconColor} label="Usluga" value={cat.name} />
          <DetailRow icon={<FileText size={20} />} iconColor="text-violet-600" label="Opis" value={request.description} />
          <DetailRow
            icon={<MapPin size={20} />}
            iconColor="text-rose-500"
            label="Lokacija"
            value={
              request.status === "pending" && !isMyRequest
                ? request.neighborhood + " (tačna adresa nakon prihvatanja)"
                : request.address
            }
          />
          <DetailRow icon={<Clock size={20} />} iconColor="text-sky-600" label="Kada" value={request.when} />
          <div className="pt-4 border-t border-ink-200 flex justify-between items-center">
            <div className="text-sm text-ink-600">Ukupno</div>
            <div className="text-2xl font-extrabold text-ink-900">
              {request.price.toLocaleString("sr-RS")} <span className="text-base text-ink-500">RSD</span>
            </div>
          </div>
        </Card>

        {request.status !== "pending" && (
          <Card className="p-5">
            <h3 className="text-xs font-bold text-ink-500 uppercase tracking-wider mb-3">
              Status
            </h3>
            <Timeline status={request.status} />
          </Card>
        )}
      </main>

      <footer className="sticky bottom-0 z-20 bg-white border-t border-ink-200/60 p-4">
        <div className="max-w-3xl mx-auto space-y-2">
          {request.status === "accepted" && !isUser && (
            <Button
              onClick={() => setRequestStatus(request.id, "in_progress")}
              size="lg"
              fullWidth
            >
              Započni posao <ArrowRight size={20} />
            </Button>
          )}
          {request.status === "in_progress" && !isUser && (
            <Button
              onClick={() => setRequestStatus(request.id, "completed")}
              size="lg"
              fullWidth
            >
              Završi posao <Check size={20} stroke={3} />
            </Button>
          )}
          {request.status === "completed" && (
            <Button
              onClick={() => router.push(`/request/${id}/rate`)}
              size="lg"
              fullWidth
            >
              <Sparkles size={18} /> Oceni {isUser ? "pružaoca" : "korisnika"}
            </Button>
          )}
          {request.status === "accepted" && isUser && (
            <Button
              onClick={() => router.push(`/request/${id}/chat`)}
              size="lg"
              fullWidth
            >
              <MessageIcon size={18} /> Otvori chat
            </Button>
          )}
          {request.status === "rated" && (
            <Button
              onClick={() => router.push("/home")}
              variant="secondary"
              size="lg"
              fullWidth
            >
              Nazad na početnu
            </Button>
          )}
          {(request.status === "accepted" || request.status === "in_progress") && (
            <button
              onClick={() => {
                if (confirm("Sigurno otkazuješ zahtev?")) {
                  setRequestStatus(request.id, "rated");
                  router.push("/home");
                }
              }}
              className="w-full py-2 text-sm font-semibold text-red-500 hover:text-red-600"
            >
              Otkaži zahtev
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

function StatusHero({
  status,
  isUser,
  isMyRequest,
  foundProvider,
}: {
  status: RequestStatus;
  isUser: boolean;
  isMyRequest: boolean;
  foundProvider: boolean;
}) {
  if (status === "pending") return null;

  const configs: Record<string, { Icon: React.FC<{size?: number; className?: string}>; title: string; sub: string; color: string }> = {
    accepted: {
      Icon: Walking,
      title: isUser ? "Komšija je krenuo ka tebi" : "Prihvatio si zahtev",
      sub: isUser ? "Vrlo brzo stiže na lokaciju" : "Kreni ka lokaciji",
      color: "from-sky-400 to-sky-600",
    },
    in_progress: {
      Icon: Wrench,
      title: "Posao je u toku",
      sub: "Sve ide po planu",
      color: "from-amber-400 to-amber-600",
    },
    completed: {
      Icon: PartyPopper,
      title: "Posao završen!",
      sub: "Hajde da ostavimo ocenu",
      color: "from-emerald-400 to-emerald-600",
    },
    rated: {
      Icon: ShieldCheck,
      title: "Zahtev je završen",
      sub: "Hvala što koristiš SOS Komšija!",
      color: "from-brand-400 to-brand-600",
    },
  };

  const c = configs[status];
  if (!c) return null;
  const HeroIcon = c.Icon;

  return (
    <div className={`rounded-3xl bg-gradient-to-br ${c.color} p-6 text-white shadow-xl overflow-hidden relative`}>
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full" />
      <div className="relative flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
          <HeroIcon size={36} className="text-white" />
        </div>
        <div>
          <div className="text-2xl font-extrabold tracking-tight">{c.title}</div>
          <div className="text-white/85 mt-1">{c.sub}</div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, iconColor = "text-ink-700", label, value }: { icon: React.ReactNode; iconColor?: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl bg-ink-100 flex items-center justify-center shrink-0 ${iconColor}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-sm font-semibold text-ink-900 break-words">{value}</div>
      </div>
    </div>
  );
}

function Timeline({ status }: { status: RequestStatus }) {
  const steps: { id: RequestStatus; label: string }[] = [
    { id: "pending", label: "Zahtev kreiran" },
    { id: "accepted", label: "Prihvaćeno" },
    { id: "in_progress", label: "Posao u toku" },
    { id: "completed", label: "Završeno" },
    { id: "rated", label: "Ocenjeno" },
  ];
  const currentIdx = steps.findIndex((s) => s.id === status);
  return (
    <div className="space-y-3">
      {steps.map((s, i) => {
        const done = i <= currentIdx;
        const active = i === currentIdx;
        return (
          <div key={s.id} className="flex items-center gap-3">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                done
                  ? active
                    ? "bg-brand-500 text-white animate-pulse"
                    : "bg-emerald-500 text-white"
                  : "bg-ink-100 text-ink-400"
              }`}
            >
              {done ? <Check size={14} stroke={3} /> : i + 1}
            </div>
            <div className={`text-sm ${done ? "font-semibold text-ink-900" : "text-ink-500"}`}>
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProviderMap({ status }: { status: RequestStatus }) {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#grid3)" />
      <path d="M0 130 Q 100 110 200 130 T 400 120" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      <path d="M180 0 L 200 250" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      <rect x="40" y="40" width="80" height="50" rx="6" fill="rgba(16,185,129,0.25)" />

      {/* Route */}
      <path
        d="M80 200 Q 130 150 200 130"
        stroke="#f97316"
        strokeWidth="4"
        strokeDasharray="6 6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Destination (user) */}
      <g transform="translate(200 130)">
        <circle r="22" fill="rgba(249,115,22,0.18)" />
        <path d="M0 -16 Q -10 -16 -10 -7 Q -10 0 0 10 Q 10 0 10 -7 Q 10 -16 0 -16 Z" fill="#f97316" stroke="white" strokeWidth="2.5" />
      </g>
      <text x="200" y="170" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">
        Krunska 35
      </text>

      {/* Provider */}
      <g transform={`translate(${status === "accepted" ? 110 : 195} ${status === "accepted" ? 185 : 130})`}>
        <circle r="18" fill="rgba(14,165,233,0.2)" className="animate-pulse" />
        <circle r="11" fill="#0ea5e9" stroke="white" strokeWidth="3" />
        <text x="0" y="3" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">A</text>
      </g>
    </svg>
  );
}
