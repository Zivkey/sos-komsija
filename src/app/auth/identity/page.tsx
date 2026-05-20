"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button, Card } from "@/components/ui";
import {
  Check,
  ChevronLeft,
  Camera,
  IDCard,
  MapPin,
  PartyPopper,
  Shield,
  User,
  ArrowRight,
} from "@/components/icons";
import { useStore } from "@/lib/store";

type Step = "neighborhood" | "selfie" | "id" | "verifying" | "done";

const NEIGHBORHOODS = [
  "Vračar",
  "Stari Grad",
  "Savski Venac",
  "Voždovac",
  "Zvezdara",
  "Palilula",
  "Zemun",
  "Novi Beograd",
];

export default function Identity() {
  const router = useRouter();
  const { login } = useStore();
  const [step, setStep] = useState<Step>("neighborhood");
  const [neighborhood, setNeighborhood] = useState("Vračar");
  const [selfieDone, setSelfieDone] = useState(false);
  const [idDone, setIdDone] = useState(false);

  const startCamera = (which: "selfie" | "id") => {
    setTimeout(() => {
      if (which === "selfie") {
        setSelfieDone(true);
        setStep("id");
      } else {
        setIdDone(true);
        setStep("verifying");
        setTimeout(() => setStep("done"), 2400);
      }
    }, 1400);
  };

  const enter = () => {
    login();
    router.push("/home");
  };

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="p-6 sm:p-8 flex items-center gap-4">
        {step !== "verifying" && step !== "done" && (
          <button
            onClick={() => {
              if (step === "neighborhood") router.back();
              else if (step === "selfie") setStep("neighborhood");
              else if (step === "id") setStep("selfie");
            }}
            className="w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
            aria-label="Nazad"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <Logo size={36} showText={false} />
        {step !== "verifying" && step !== "done" && (
          <div className="ml-auto flex items-center gap-1.5">
            {(["neighborhood", "selfie", "id"] as const).map((s, i) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step
                    ? "w-8 bg-brand-500"
                    : (["neighborhood", "selfie", "id"].indexOf(step) > i)
                    ? "w-2 bg-brand-300"
                    : "w-2 bg-ink-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-6 sm:px-12 max-w-xl mx-auto w-full">
        {step === "neighborhood" && (
          <div className="animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 mt-4">
              <MapPin size={28} />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
              Tvoja opština
            </h1>
            <p className="mt-3 text-ink-600 text-lg">
              Izaberi opštinu u kojoj živiš — povezaćemo te sa komšijama iz tvog komšiluka.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {NEIGHBORHOODS.map((n) => (
                <button
                  key={n}
                  onClick={() => setNeighborhood(n)}
                  className={`relative h-16 rounded-2xl border-2 font-semibold transition-all ${
                    neighborhood === n
                      ? "bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/25"
                      : "bg-white border-ink-200 text-ink-700 hover:border-brand-300"
                  }`}
                >
                  {n}
                  {neighborhood === n && (
                    <span className="absolute top-2 right-2">
                      <Check size={16} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-auto py-8">
              <Button onClick={() => setStep("selfie")} size="lg" fullWidth>
                Nastavi <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        )}

        {step === "selfie" && (
          <div className="animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 mt-4">
              <Camera size={28} />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
              Selfi za verifikaciju
            </h1>
            <p className="mt-3 text-ink-600 text-lg">
              Slikaj se kako bismo potvrdili da si stvarna osoba. Sigurnost komšija je naš prioritet.
            </p>

            <div className="mt-8">
              <FakeCamera kind="selfie" onCapture={() => startCamera("selfie")} />
            </div>
          </div>
        )}

        {step === "id" && (
          <div className="animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mt-4">
              <IDCard size={28} />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
              Lična karta
            </h1>
            <p className="mt-3 text-ink-600 text-lg">
              Slikaj prednju stranu lične karte. Tvoji podaci su zaštićeni i kriptovani.
            </p>

            <div className="mt-8">
              <FakeCamera kind="id" onCapture={() => startCamera("id")} />
            </div>
          </div>
        )}

        {step === "verifying" && (
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
              <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield size={42} className="text-brand-500" />
              </div>
            </div>
            <h2 className="mt-8 text-2xl font-extrabold text-ink-900">
              Proveravamo tvoj identitet…
            </h2>
            <p className="mt-3 text-ink-600 text-center max-w-sm">
              Ovo obično traje par sekundi. Hvala na strpljenju.
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="flex-1 flex flex-col items-center justify-center animate-scale-in">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-emerald-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check size={42} className="text-white" stroke={3} />
                </div>
              </div>
            </div>
            <h2 className="mt-8 text-3xl font-extrabold text-ink-900 text-center flex items-center justify-center gap-2">
              Verifikovan si! <PartyPopper size={28} className="text-amber-500" />
            </h2>
            <p className="mt-3 text-ink-600 text-center max-w-sm text-lg">
              Dobrodošao u SOS Komšija zajednicu. Hajde da pronađemo pomoć.
            </p>

            <div className="mt-10 w-full max-w-sm">
              <Card className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="text-xs text-ink-500 font-medium">Lokacija</div>
                  <div className="font-bold text-ink-900">{neighborhood}, Beograd</div>
                </div>
              </Card>
            </div>

            <div className="mt-10 w-full max-w-sm">
              <Button onClick={enter} size="lg" fullWidth>
                Uđi u aplikaciju <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FakeCamera({
  kind,
  onCapture,
}: {
  kind: "selfie" | "id";
  onCapture: () => void;
}) {
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);

  const snap = () => {
    setCapturing(true);
    setTimeout(() => {
      setCapturing(false);
      setCaptured(true);
      setTimeout(onCapture, 700);
    }, 1000);
  };

  return (
    <div>
      <div
        className={`relative w-full ${
          kind === "selfie" ? "aspect-[3/4]" : "aspect-[16/10]"
        } rounded-3xl overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900 border border-ink-200 shadow-xl`}
      >
        {/* Fake camera viewfinder */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-800 to-black" />

        {/* Frame overlay */}
        {kind === "selfie" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/5 aspect-[3/4] rounded-[40%] border-[3px] border-white/60 border-dashed" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full aspect-[16/10] rounded-2xl border-[3px] border-white/60 border-dashed" />
          </div>
        )}

        {/* Fake content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 text-white">
          {kind === "selfie" ? <User size={96} /> : <IDCard size={96} />}
        </div>

        {/* Captured overlay */}
        {captured && (
          <div className="absolute inset-0 bg-emerald-500/30 backdrop-blur-sm flex items-center justify-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              <Check size={40} className="text-emerald-500" stroke={3} />
            </div>
          </div>
        )}

        {/* Flash effect */}
        {capturing && (
          <div className="absolute inset-0 bg-white animate-fade-in" />
        )}

        {/* Corner markers */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/80 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/80 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/80 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/80 rounded-br-lg" />

        {/* Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-medium">
          {kind === "selfie"
            ? "Postavi lice unutar okvira"
            : "Postavi ličnu kartu unutar okvira"}
        </div>
      </div>

      <button
        onClick={snap}
        disabled={capturing || captured}
        className="mt-6 w-full h-16 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-brand-500/25"
      >
        {capturing ? (
          <>
            <svg className="animate-spin-slow" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Obrađujem…
          </>
        ) : captured ? (
          <>
            <Check size={20} stroke={3} /> Uspešno
          </>
        ) : (
          <>
            <Camera size={22} /> Slikaj
          </>
        )}
      </button>
    </div>
  );
}
