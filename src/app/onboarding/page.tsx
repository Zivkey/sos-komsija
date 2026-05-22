"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  HandShake,
  Shield,
  ShieldCheck,
  MapPin,
  Home as HomeIcon,
  Users,
} from "@/components/icons";

type Slide = {
  IconArt: React.FC;
  title: string;
  description: string;
};

const ArtNeighbors = () => (
  <div className="relative w-64 h-64">
    <div className="absolute inset-0 bg-brand-100 rounded-[60px] rotate-12" />
    <div className="absolute inset-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-[56px] -rotate-6 flex items-center justify-center text-white">
      <HomeIcon size={120} stroke={2.2} />
    </div>
    <div className="absolute -bottom-2 -right-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-ink-100 flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-emerald-500" />
      <span className="text-xs font-semibold text-ink-700">128 online</span>
    </div>
    <div className="absolute -top-2 -left-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-ink-100 flex items-center gap-1.5 text-brand-600">
      <Users size={14} />
      <span className="text-xs font-semibold text-ink-700">Komšiluk</span>
    </div>
  </div>
);

const ArtShield = () => (
  <div className="relative w-64 h-64">
    <div className="absolute inset-0 bg-emerald-100 rounded-[60px] -rotate-12" />
    <div className="absolute inset-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[56px] rotate-6 flex items-center justify-center text-white">
      <ShieldCheck size={120} stroke={2.2} />
    </div>
    <div className="absolute -top-2 -right-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-ink-100 flex items-center gap-1.5">
      <Shield size={14} className="text-emerald-500" />
      <span className="text-xs font-semibold text-ink-700">Verifikovano</span>
    </div>
  </div>
);

const ArtMap = () => (
  <div className="relative w-64 h-64">
    <div className="absolute inset-0 bg-sky-100 rounded-[60px] rotate-6" />
    <div className="absolute inset-2 bg-gradient-to-br from-sky-400 to-blue-600 rounded-[56px] -rotate-3 flex items-center justify-center text-white">
      <MapPin size={120} stroke={2.2} />
    </div>
    <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl px-3 py-2 shadow-lg border border-ink-100">
      <div className="text-[10px] text-ink-500 font-medium uppercase tracking-wider">
        Lokacija
      </div>
      <div className="text-sm font-bold text-ink-800">Vračar</div>
    </div>
  </div>
);

const slides: Slide[] = [
  {
    IconArt: ArtNeighbors,
    title: "Komšijska pomoć\nu par klikova",
    description:
      "Povezujemo te sa proverenim komšijama iz tvoje opštine. Pomoć kada ti je najpotrebnija.",
  },
  {
    IconArt: ArtShield,
    title: "Sigurno i\nprovereno",
    description:
      "Svi pružaoci usluga prolaze verifikaciju identiteta. Plaćanje je zaštićeno escrow sistemom.",
  },
  {
    IconArt: ArtMap,
    title: "Tvoja opština,\ntvoji komšije",
    description:
      "Pronađi pomoć tačno tamo gde živiš. Ljudi iz kraja, koji znaju tvoj komšiluk.",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { setOnboarded } = useStore();

  const next = () => {
    if (step < slides.length - 1) setStep((s) => s + 1);
    else {
      setOnboarded();
      router.push("/auth/phone");
    }
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const skip = () => {
    setOnboarded();
    router.push("/auth/phone");
  };

  const slide = slides[step];
  const Art = slide.IconArt;

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-br from-brand-50/40 via-white to-white">
      <div className="flex items-center justify-between p-6 sm:p-8">
        <button
          onClick={back}
          disabled={step === 0}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
            step === 0
              ? "border-transparent text-transparent pointer-events-none"
              : "bg-white border-ink-200 text-ink-700 hover:bg-ink-50"
          }`}
          aria-label="Nazad"
        >
          <ChevronLeft size={20} />
        </button>
        <Logo size={44} showText={false} />
        <button
          onClick={skip}
          className="text-sm font-medium text-ink-500 hover:text-ink-800 transition-colors"
        >
          Preskoči
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-center mb-12 animate-scale-in" key={step}>
          <Art />
        </div>

        <h1
          key={`title-${step}`}
          className="text-4xl sm:text-5xl font-extrabold text-ink-900 text-center leading-tight tracking-tight whitespace-pre-line animate-fade-in"
        >
          {slide.title}
        </h1>

        <p
          key={`desc-${step}`}
          className="mt-6 text-lg text-ink-600 text-center max-w-md leading-relaxed animate-fade-in"
        >
          {slide.description}
        </p>
      </div>

      <div className="p-8 sm:p-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-brand-500" : "w-2 bg-ink-200"
              }`}
            />
          ))}
        </div>
        <Button onClick={next} size="lg" fullWidth>
          {step < slides.length - 1 ? (
            <>
              Dalje <ChevronRight size={20} />
            </>
          ) : (
            <>
              Započni <ArrowRight size={20} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
