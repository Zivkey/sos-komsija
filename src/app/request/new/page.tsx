"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button, Card, Input, Textarea, Badge } from "@/components/ui";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  FileText,
  MapPin,
  Shield,
  Sparkles,
  Sun,
  Sunrise,
  Timer,
  Zap,
} from "@/components/icons";
import { CATEGORIES, getCategory } from "@/lib/categories";
import type { CategoryId } from "@/lib/types";
import { useStore } from "@/lib/store";

type Step = "category" | "details" | "location" | "when" | "price" | "review";

const STEPS: Step[] = ["category", "details", "location", "when", "price", "review"];

function NewRequestInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialCat = params.get("cat") as CategoryId | null;
  const { createRequest } = useStore();

  const [step, setStep] = useState<Step>(initialCat ? "details" : "category");
  const [category, setCategory] = useState<CategoryId>(initialCat ?? "repairs");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("Krunska 35");
  const [whenChoice, setWhenChoice] = useState<"now" | "today" | "tomorrow" | "custom">("now");
  const [customTime, setCustomTime] = useState("");
  const [hours, setHours] = useState(1);
  const [durationMode, setDurationMode] = useState<"hours" | "minutes">("hours");
  const [minutes, setMinutes] = useState(30);

  const cat = getCategory(category);
  const CatIcon = cat.Icon;

  const price = useMemo(() => {
    if (durationMode === "minutes") {
      // Proportional to minutes (min charge = base price)
      const proportional = Math.round((cat.pricePerHour * minutes) / 60);
      return Math.max(cat.basePrice, proportional);
    }
    return cat.basePrice + Math.max(0, hours - 1) * cat.pricePerHour;
  }, [cat, hours, minutes, durationMode]);

  const durationLabel = useMemo(() => {
    if (durationMode === "minutes") return `${minutes} min`;
    return `${hours} sat${hours > 1 ? (hours < 5 ? "a" : "i") : ""}`;
  }, [durationMode, minutes, hours]);

  const stepIndex = STEPS.indexOf(step);

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };
  const goBack = () => {
    if (stepIndex === 0) {
      router.back();
    } else {
      setStep(STEPS[stepIndex - 1]);
    }
  };

  const whenLabel = useMemo(() => {
    if (whenChoice === "now") return "Što pre (u sledećih sat vremena)";
    if (whenChoice === "today") return "Danas u toku dana";
    if (whenChoice === "tomorrow") return "Sutra";
    return customTime || "Po dogovoru";
  }, [whenChoice, customTime]);

  const submit = () => {
    const req = createRequest({
      category,
      description,
      address: `${address}, Vračar`,
      when: whenLabel,
      price,
    });
    router.push(`/request/${req.id}/payment`);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-ink-50/60">
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-ink-200/60">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
          <button
            onClick={goBack}
            className="w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="text-xs text-ink-500 font-medium">Novi zahtev</div>
            <div className="font-extrabold text-ink-900">Korak {stepIndex + 1} od {STEPS.length}</div>
          </div>
          <Logo size={36} showText={false} />
        </div>
        <div className="h-1.5 bg-ink-100">
          <div
            className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-6 sm:py-8 pb-32">
        {step === "category" && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-extrabold text-ink-900 tracking-tight">
              Šta ti treba?
            </h1>
            <p className="mt-2 text-ink-600">Izaberi kategoriju usluge.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((c) => {
                const selected = category === c.id;
                const CIcon = c.Icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`text-left rounded-3xl p-5 border-2 transition-all ${
                      selected
                        ? "border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/10"
                        : "border-ink-200 bg-white hover:border-brand-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center shrink-0 ${c.iconColor}`}>
                        <CIcon size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="font-extrabold text-ink-900">{c.name}</div>
                        <div className="text-sm text-ink-600 mt-0.5">{c.description}</div>
                      </div>
                      {selected && (
                        <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                          <Check size={14} className="text-white" stroke={3} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <Badge variant="brand" className="mb-3"><CatIcon size={14} /> {cat.name}</Badge>
              <h1 className="text-3xl font-extrabold text-ink-900 tracking-tight">
                Opiši šta ti treba
              </h1>
              <p className="mt-2 text-ink-600">
                Što više detalja, brže ćemo naći pravog komšiju.
              </p>
            </div>

            <Textarea
              placeholder={getPlaceholder(category)}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
              maxLength={400}
            />
            <div className="text-xs text-ink-500 text-right">{description.length}/400</div>

            <Card className="p-4">
              <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">
                Predlozi
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS[category].map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setDescription((d) => (d ? d + " " : "") + s)
                    }
                    className="px-3 py-1.5 bg-ink-100 hover:bg-ink-200 text-ink-700 text-xs font-semibold rounded-full transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {step === "location" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-ink-900 tracking-tight">
                Gde dolazi pomoć?
              </h1>
              <p className="mt-2 text-ink-600">
                Tvoja adresa u Vračaru. Pružalac je vidi tek kad prihvati zahtev.
              </p>
            </div>

            <Input
              label="Ulica i broj"
              icon={<MapPin size={20} />}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="npr. Krunska 35"
              autoFocus
            />

            <div className="relative rounded-3xl overflow-hidden h-56 border border-ink-200/60">
              <MiniMapWithPin />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-2xl p-3 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                  <MapPin size={18} className="text-brand-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-500 font-medium">Tvoja adresa</div>
                  <div className="font-bold text-ink-900 truncate">{address}, Vračar</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <Shield size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-900 leading-relaxed">
                Tačnu adresu i sprat delimo samo nakon što pružalac prihvati zahtev.
              </p>
            </div>
          </div>
        )}

        {step === "when" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-ink-900 tracking-tight">
                Kada ti treba?
              </h1>
              <p className="mt-2 text-ink-600">Izaberi vremenski okvir.</p>
            </div>

            <div className="space-y-3">
              {([
                { id: "now", label: "Što pre", sub: "Pružaoci u blizini", Icon: Zap, color: "text-amber-500" },
                { id: "today", label: "Danas u toku dana", sub: "Bilo kada do 22h", Icon: Sun, color: "text-orange-500" },
                { id: "tomorrow", label: "Sutra", sub: "Bilo kada tokom dana", Icon: Sunrise, color: "text-rose-500" },
                { id: "custom", label: "Drugi termin", sub: "Po dogovoru", Icon: Calendar, color: "text-sky-500" },
              ] as const).map((o) => {
                const OIcon = o.Icon;
                return (
                <button
                  key={o.id}
                  onClick={() => setWhenChoice(o.id)}
                  className={`w-full text-left rounded-2xl p-4 border-2 transition-all flex items-center gap-4 ${
                    whenChoice === o.id
                      ? "border-brand-500 bg-brand-50"
                      : "border-ink-200 bg-white hover:border-brand-300"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-white border border-ink-200 flex items-center justify-center ${o.color}`}>
                    <OIcon size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-ink-900">{o.label}</div>
                    <div className="text-sm text-ink-500">{o.sub}</div>
                  </div>
                  {whenChoice === o.id && (
                    <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
                      <Check size={14} className="text-white" stroke={3} />
                    </div>
                  )}
                </button>
                );
              })}
              {whenChoice === "custom" && (
                <Input
                  placeholder="npr. Subota u 18:00"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  icon={<Clock size={20} />}
                />
              )}
            </div>

            <div>
              <div className="text-sm font-semibold text-ink-700 mb-3">
                Procenjeno trajanje
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4].map((h) => (
                  <button
                    key={h}
                    onClick={() => {
                      setDurationMode("hours");
                      setHours(h);
                    }}
                    className={`h-14 rounded-2xl border-2 font-bold transition-all ${
                      durationMode === "hours" && hours === h
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-ink-200 bg-white text-ink-700 hover:border-brand-300"
                    }`}
                  >
                    {h}h{h === 4 ? "+" : ""}
                  </button>
                ))}
                <button
                  onClick={() => setDurationMode("minutes")}
                  className={`h-14 rounded-2xl border-2 font-bold transition-all ${
                    durationMode === "minutes"
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-ink-200 bg-white text-ink-700 hover:border-brand-300"
                  }`}
                >
                  Drugo
                </button>
              </div>
              {durationMode === "minutes" && (
                <div className="mt-4 rounded-2xl border-2 border-brand-200 bg-brand-50/40 p-4 animate-fade-in">
                  <div className="text-xs font-semibold text-ink-700 mb-3">
                    Koliko minuta?
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMinutes(m)}
                        className={`h-12 rounded-xl border-2 font-bold text-sm transition-all ${
                          minutes === m
                            ? "border-brand-500 bg-white text-brand-600"
                            : "border-ink-200 bg-white text-ink-700 hover:border-brand-300"
                        }`}
                      >
                        {m} min
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="number"
                      min={5}
                      max={59}
                      step={5}
                      value={minutes}
                      onChange={(e) => {
                        const v = Math.max(5, Math.min(59, Number(e.target.value) || 5));
                        setMinutes(v);
                      }}
                      className="flex-1 h-12 px-4 bg-white border-2 border-ink-200 rounded-xl text-[15px] font-bold text-ink-900 focus:outline-none focus:border-brand-500"
                    />
                    <span className="text-sm font-semibold text-ink-600">minuta</span>
                  </div>
                  <div className="mt-2 text-[11px] text-ink-500">
                    Min. 5 min · maks. 59 min (za duže koristi opciju u satima)
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === "price" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-ink-900 tracking-tight">
                Cena
              </h1>
              <p className="mt-2 text-ink-600">
                Transparentna cena — bez skrivenih troškova.
              </p>
            </div>

            <Card className="p-6">
              <div className="text-center">
                <div className="text-sm font-semibold text-ink-500 uppercase tracking-wider">
                  Procenjena cena
                </div>
                <div className="mt-3 text-6xl font-extrabold text-ink-900 tracking-tight">
                  {price.toLocaleString("sr-RS")}
                  <span className="text-2xl text-ink-500 font-bold ml-2">RSD</span>
                </div>
                <div className="mt-2 text-sm text-ink-500">
                  {durationLabel} · {cat.pricePerHour} RSD/h
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-ink-200 space-y-2">
                {durationMode === "hours" ? (
                  <>
                    <Row label={`Osnovna cena (1h)`} value={`${cat.basePrice} RSD`} />
                    {hours > 1 && (
                      <Row
                        label={`Dodatno (${hours - 1}h × ${cat.pricePerHour})`}
                        value={`${(hours - 1) * cat.pricePerHour} RSD`}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <Row label={`Tarifa (${cat.pricePerHour} RSD/h)`} value={`${minutes} min`} />
                    <Row label="Minimalna naplata" value={`${cat.basePrice} RSD`} muted />
                  </>
                )}
                <Row label="Provizija platforme" value="Uračunato" muted />
                <div className="pt-2 mt-2 border-t border-ink-200 flex justify-between items-center">
                  <div className="font-bold text-ink-900">Ukupno</div>
                  <div className="font-extrabold text-xl text-ink-900">
                    {price.toLocaleString("sr-RS")} RSD
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-start gap-3 p-4 bg-brand-50 rounded-2xl border border-brand-100">
              <Sparkles size={20} className="text-brand-600 shrink-0 mt-0.5" />
              <p className="text-sm text-brand-900 leading-relaxed">
                <strong>Escrow zaštita.</strong> Novac se uplaćuje na siguran račun i pušta tek nakon što potvrdiš da je posao odrađen.
              </p>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-ink-900 tracking-tight">
                Pregled zahteva
              </h1>
              <p className="mt-2 text-ink-600">Proveri detalje pre slanja.</p>
            </div>

            <Card className="p-5 space-y-4">
              <ReviewRow icon={<CatIcon size={20} />} iconColor={cat.iconColor} label="Usluga" value={cat.name} />
              <ReviewRow icon={<FileText size={20} />} iconColor="text-violet-600" label="Opis" value={description || "—"} />
              <ReviewRow icon={<MapPin size={20} />} iconColor="text-rose-500" label="Lokacija" value={`${address}, Vračar`} />
              <ReviewRow icon={<Clock size={20} />} iconColor="text-sky-600" label="Kada" value={whenLabel} />
              <ReviewRow icon={<Timer size={20} />} iconColor="text-amber-600" label="Trajanje" value={durationLabel} />
              <div className="pt-4 border-t border-ink-200 flex justify-between items-center">
                <div>
                  <div className="text-sm text-ink-500 font-medium">Ukupno za platiti</div>
                  <div className="text-xs text-ink-400">Escrow zaštita uračunata</div>
                </div>
                <div className="text-3xl font-extrabold text-ink-900">
                  {price.toLocaleString("sr-RS")} <span className="text-base text-ink-500">RSD</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-ink-200/60 p-4">
        <div className="max-w-3xl mx-auto">
          {step === "review" ? (
            <Button onClick={submit} size="lg" fullWidth>
              Nastavi na plaćanje <ArrowRight size={20} />
            </Button>
          ) : (
            <Button
              onClick={goNext}
              size="lg"
              fullWidth
              disabled={step === "details" && description.trim().length < 10}
            >
              Dalje <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className={muted ? "text-ink-400" : "text-ink-600"}>{label}</span>
      <span className={`font-semibold ${muted ? "text-ink-400" : "text-ink-800"}`}>{value}</span>
    </div>
  );
}

function ReviewRow({ icon, iconColor = "text-ink-700", label, value }: { icon: React.ReactNode; iconColor?: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl bg-ink-100 flex items-center justify-center shrink-0 ${iconColor}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
          {label}
        </div>
        <div className="font-semibold text-ink-900 break-words">{value}</div>
      </div>
    </div>
  );
}

function MiniMapWithPin() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full bg-gradient-to-br from-sky-50 to-emerald-50" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="url(#grid2)" />
      <path d="M0 100 Q 100 80 200 100 T 400 90" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      <path d="M180 0 L 200 200" stroke="rgba(15,23,42,0.15)" strokeWidth="6" fill="none" />
      <rect x="40" y="40" width="80" height="50" rx="6" fill="rgba(16,185,129,0.25)" />
      <circle cx="200" cy="100" r="30" fill="rgba(249,115,22,0.15)" />
      <circle cx="200" cy="100" r="18" fill="rgba(249,115,22,0.3)" />
      <g transform="translate(200 100)">
        <path d="M0 -22 Q -14 -22 -14 -10 Q -14 0 0 14 Q 14 0 14 -10 Q 14 -22 0 -22 Z" fill="#f97316" stroke="white" strokeWidth="3" />
        <circle cx="0" cy="-12" r="4" fill="white" />
      </g>
    </svg>
  );
}

const SUGGESTIONS: Record<CategoryId, string[]> = {
  babysitting: ["dvoje dece", "5 i 8 god", "do 22h", "iskusna dadilja", "vegetarijanska hrana"],
  moving: ["kauč", "frižider", "3. sprat bez lifta", "krhki predmeti", "trebaju 2 osobe"],
  repairs: ["curi slavina", "neispravan prekidač", "začepljen sifon", "hitno", "imam materijal"],
  cleaning: ["2 sobe + kuhinja", "dubinsko pranje", "imam sredstva", "posle renoviranja", "redovno održavanje"],
  pets: ["zlatni retriver", "miran pas", "60 minuta", "park Manjež", "ima poslastice"],
  elderly: ["lista namirnica", "lekovi iz apoteke", "Maxi market", "IT pomoć - laptop", "papirologija"],
};

function getPlaceholder(c: CategoryId): string {
  const map: Record<CategoryId, string> = {
    babysitting: "npr. Čuvanje dvoje dece (5 i 8 god) od 19h do 22h, deca su mirna…",
    moving: "npr. Prenos kauča iz kombija na 3. sprat bez lifta…",
    repairs: "npr. Curi slavina u kuhinji već 2 dana, treba zameniti dihtung…",
    cleaning: "npr. Generalno čišćenje stana 60m², 2 sobe + kuhinja + kupatilo…",
    pets: "npr. Šetnja zlatnog retrivera 1h u parku Manjež…",
    elderly: "npr. Kupovina iz Maxija — hleb, mleko, jogurt, voće…",
  };
  return map[c];
}

export default function NewRequestPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <NewRequestInner />
    </Suspense>
  );
}
