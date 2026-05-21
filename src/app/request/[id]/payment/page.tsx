"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button, Card, Input } from "@/components/ui";
import { useStore } from "@/lib/store";
import { getCategory } from "@/lib/categories";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  CreditCard,
  Lock,
  PartyPopper,
  Shield,
  Sparkles,
} from "@/components/icons";

type Stage = "card" | "processing" | "success";

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getRequest } = useStore();
  const request = getRequest(id);
  const [stage, setStage] = useState<Stage>("card");
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [name, setName] = useState("MARKO MARKOVIC");
  const [exp, setExp] = useState("12/27");
  const [cvc, setCvc] = useState("123");

  useEffect(() => {
    if (!request) {
      router.replace("/home");
    }
  }, [request, router]);

  if (!request) return null;
  const cat = getCategory(request.category);
  const CatIcon = cat.Icon;

  const pay = () => {
    setStage("processing");
    setTimeout(() => {
      setStage("success");
      setTimeout(() => {
        router.replace(`/request/${id}`);
      }, 1800);
    }, 2200);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-ink-50/60">
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-ink-200/60">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
          {stage === "card" && (
            <button
              onClick={() => router.back()}
              className="w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div className="flex-1">
            <div className="text-xs text-ink-500 font-medium flex items-center gap-1">
              <Lock size={11} /> Zaštićeno plaćanje
            </div>
            <div className="font-extrabold text-ink-900">Escrow uplata</div>
          </div>
          <Logo size={36} showText={false} />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-6 sm:py-8 pb-8">
        {stage === "card" && (
          <div className="animate-fade-in space-y-6">
            {/* Order summary */}
            <Card className="p-5 bg-gradient-to-br from-brand-50 to-white border-brand-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center ${cat.iconColor}`}>
                  <CatIcon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                    Zahtev
                  </div>
                  <div className="font-bold text-ink-900 truncate">
                    {cat.name} · {request.when}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-ink-900">
                    {request.price.toLocaleString("sr-RS")}
                  </div>
                  <div className="text-xs text-ink-500">RSD</div>
                </div>
              </div>
            </Card>

            {/* Credit card visual */}
            <div className="relative h-52 rounded-3xl bg-gradient-to-br from-ink-800 via-ink-900 to-black text-white p-6 shadow-2xl overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-500/30 rounded-full blur-3xl" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl" />
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-white/60 font-medium">SOS Komšija</div>
                    <div className="text-sm font-bold mt-1">Escrow račun</div>
                  </div>
                  <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
                    <div className="w-9 h-6 rounded-sm border border-amber-700/30 grid grid-cols-3 grid-rows-3 gap-px p-0.5">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-amber-700/40 rounded-[1px]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xl tracking-widest font-bold">
                    {card.padEnd(19, "•")}
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">Vlasnik</div>
                      <div className="font-semibold text-sm">{name || "—"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">Vazi do</div>
                      <div className="font-semibold text-sm">{exp || "—"}</div>
                    </div>
                    <div className="text-xl font-extrabold italic text-white/90">VISA</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Broj kartice"
                icon={<CreditCard size={20} />}
                value={card}
                onChange={(e) => setCard(formatCard(e.target.value))}
                inputMode="numeric"
                maxLength={19}
              />
              <Input
                label="Ime i prezime"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Datum isteka"
                  value={exp}
                  onChange={(e) => setExp(formatExp(e.target.value))}
                  placeholder="MM/GG"
                  maxLength={5}
                />
                <Input
                  label="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <Shield size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-900 leading-relaxed">
                <strong>Escrow zaštita.</strong> Tvojih {request.price.toLocaleString("sr-RS")} RSD se rezerviše na sigurnom računu. Novac se pušta pružaocu tek kad potvrdiš da je posao gotov. Ako nešto pođe loše — vraćamo ti novac.
              </div>
            </div>
          </div>
        )}

        {stage === "processing" && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
              <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock size={42} className="text-brand-500" />
              </div>
            </div>
            <h2 className="mt-8 text-2xl font-extrabold text-ink-900">
              Bezbedno procesiramo uplatu…
            </h2>
            <p className="mt-3 text-ink-600 text-center max-w-sm">
              Tvoja kartica se obrađuje preko 3D Secure protokola. Ne zatvaraj prozor.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-ink-500">
              <Lock size={12} /> 256-bit SSL enkripcija
            </div>
          </div>
        )}

        {stage === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 animate-scale-in">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-emerald-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check size={42} className="text-white" stroke={3} />
                </div>
              </div>
            </div>
            <h2 className="mt-8 text-3xl font-extrabold text-ink-900 text-center flex items-center justify-center gap-2">
              Uplata uspešna! <PartyPopper size={28} className="text-amber-500" />
            </h2>
            <p className="mt-3 text-ink-600 text-center max-w-sm text-lg">
              {request.price.toLocaleString("sr-RS")} RSD je sigurno rezervisano. Tražimo komšiju za tebe…
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-full">
              <Sparkles size={16} className="text-brand-500" />
              <span className="text-sm font-semibold text-brand-700">
                Pružalac stiže za ~5 min
              </span>
            </div>
          </div>
        )}
      </main>

      {stage === "card" && (
        <footer className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-xl border-t border-ink-200/60 p-4">
          <div className="max-w-3xl mx-auto">
            <Button onClick={pay} size="lg" fullWidth>
              <Lock size={18} /> Plati {request.price.toLocaleString("sr-RS")} RSD <ArrowRight size={20} />
            </Button>
            <p className="mt-2 text-center text-[10px] text-ink-400">
              Demo: bez stvarnog zaduženja kartice
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

function formatCard(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 16);
  return digits.match(/.{1,4}/g)?.join(" ") ?? digits;
}

function formatExp(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}
