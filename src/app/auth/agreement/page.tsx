"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button, Card } from "@/components/ui";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  FileSignature,
  Shield,
} from "@/components/icons";

const POLICY_ITEMS = [
  {
    id: "data",
    title: "Obrada ličnih podataka",
    body: "Slažem se da SOS Komšija prikuplja i obrađuje moje lične podatke (ime, adresa, broj telefona, slike za verifikaciju identiteta) u cilju funkcionisanja servisa.",
    required: true,
  },
  {
    id: "id_verify",
    title: "Verifikacija identiteta",
    body: "Razumem da je za korišćenje servisa neophodna verifikacija identiteta i potvrda adrese stanovanja.",
    required: true,
  },
  {
    id: "terms",
    title: "Uslovi korišćenja",
    body: "Pročitao/la sam i prihvatam Uslove korišćenja i Politiku privatnosti.",
    required: true,
  },
  {
    id: "marketing",
    title: "Obaveštenja (opciono)",
    body: "Šalji mi novosti, popuste i obaveštenja o uslugama u mom komšiluku.",
    required: false,
  },
] as const;

export default function AgreementPage() {
  const router = useRouter();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [acceptAll, setAcceptAll] = useState(false);

  const toggle = (id: string) =>
    setChecked((c) => ({ ...c, [id]: !c[id] }));

  const toggleAll = () => {
    if (acceptAll) {
      setChecked({});
      setAcceptAll(false);
    } else {
      const all: Record<string, boolean> = {};
      POLICY_ITEMS.forEach((p) => (all[p.id] = true));
      setChecked(all);
      setAcceptAll(true);
    }
  };

  const allRequiredAccepted = POLICY_ITEMS.filter((p) => p.required).every(
    (p) => checked[p.id]
  );

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="p-6 sm:p-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
          aria-label="Nazad"
        >
          <ChevronLeft size={20} />
        </button>
        <Logo size={36} showText={false} />
      </div>

      <div className="flex-1 flex flex-col px-6 sm:px-12 max-w-xl mx-auto w-full pb-8">
        <div className="mt-2 sm:mt-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600">
            <FileSignature size={30} />
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            Privatnost i saglasnost
          </h1>
          <p className="mt-3 text-ink-600 text-lg">
            Pre nego što počneš, potrebne su nam neke saglasnosti. Tvoji podaci ostaju zaštićeni.
          </p>
        </div>

        {/* Accept-all toggle */}
        <button
          onClick={toggleAll}
          className={`mt-6 w-full text-left rounded-2xl p-4 border-2 transition-all flex items-center gap-3 ${
            acceptAll
              ? "border-brand-500 bg-brand-50"
              : "border-ink-200 bg-white hover:border-brand-300"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all ${
              acceptAll
                ? "bg-brand-500 text-white"
                : "bg-white border-2 border-ink-300"
            }`}
          >
            {acceptAll && <Check size={14} stroke={3} />}
          </div>
          <div className="flex-1">
            <div className="font-bold text-ink-900">Prihvati sve</div>
            <div className="text-xs text-ink-500">Označi sve stavke ispod odjednom</div>
          </div>
        </button>

        {/* Items */}
        <div className="mt-4 space-y-3">
          {POLICY_ITEMS.map((p) => {
            const isChecked = !!checked[p.id];
            return (
              <button
                key={p.id}
                onClick={() => {
                  toggle(p.id);
                  setAcceptAll(false);
                }}
                className={`w-full text-left rounded-2xl p-4 border-2 transition-all flex items-start gap-3 ${
                  isChecked
                    ? "border-emerald-300 bg-emerald-50/40"
                    : "border-ink-200 bg-white hover:border-brand-300"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isChecked
                      ? "bg-emerald-500 text-white"
                      : "bg-white border-2 border-ink-300"
                  }`}
                >
                  {isChecked && <Check size={14} stroke={3} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-ink-900">{p.title}</div>
                    {p.required && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-100 px-1.5 py-0.5 rounded">
                        Obavezno
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-ink-600 mt-1 leading-relaxed">
                    {p.body}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Card className="mt-6 p-4 bg-ink-50/60 border-ink-200/60">
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-ink-500 shrink-0 mt-0.5" />
            <div className="text-xs text-ink-600 leading-relaxed">
              Tvoji podaci se čuvaju kriptovano i koriste isključivo u svrhu funkcionisanja
              servisa SOS Komšija. U bilo kom trenutku možeš da povučeš saglasnost i obrišeš
              nalog u sekciji Podešavanja.
            </div>
          </div>
        </Card>

        <div className="mt-auto pt-8">
          <Button
            onClick={() => router.push("/auth/phone")}
            size="lg"
            fullWidth
            disabled={!allRequiredAccepted}
          >
            Prihvati i nastavi <ArrowRight size={20} />
          </Button>
          {!allRequiredAccepted && (
            <p className="mt-3 text-center text-xs text-ink-500">
              Potrebno je da prihvatiš sve obavezne stavke
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
