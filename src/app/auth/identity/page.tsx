"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button, Card, Input } from "@/components/ui";
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
  Home2,
  Mail,
  MailSent,
} from "@/components/icons";
import { useStore } from "@/lib/store";

type Step =
  | "neighborhood"
  | "documents"
  | "address"
  | "letter_sent"
  | "letter_code"
  | "verifying"
  | "done";

const STEP_ORDER: Step[] = [
  "neighborhood",
  "documents",
  "address",
  "letter_code",
];

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
  const [street, setStreet] = useState("Krunska");
  const [streetNo, setStreetNo] = useState("35");
  const [postal, setPostal] = useState("11000");
  const [city, setCity] = useState("Beograd");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-advance from letter_sent → letter_code
  useEffect(() => {
    if (step === "letter_sent") {
      const t = setTimeout(() => setStep("letter_code"), 2400);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    if (step === "letter_code") {
      setTimeout(() => refs.current[0]?.focus(), 200);
    }
  }, [step]);

  const documentsBothDone = selfieDone && idDone;
  const addressValid =
    street.trim().length >= 2 && streetNo.trim().length >= 1 && postal.trim().length >= 4;

  const goBack = () => {
    if (step === "neighborhood") router.back();
    else if (step === "documents") setStep("neighborhood");
    else if (step === "address") setStep("documents");
    else if (step === "letter_code") setStep("address");
  };

  const submitAddress = () => {
    setStep("letter_sent");
  };

  const updateCode = (i: number, v: string) => {
    const cleaned = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = cleaned;
    setCode(next);
    if (cleaned && i < 5) refs.current[i + 1]?.focus();
    if (next.every((d) => d)) {
      // All filled — verify
      setStep("verifying");
      setTimeout(() => setStep("done"), 2400);
    }
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const enter = () => {
    login();
    router.push("/home");
  };

  const currentStepIndex = STEP_ORDER.indexOf(step);
  const showProgressBar =
    step !== "verifying" && step !== "done" && step !== "letter_sent";

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="p-6 sm:p-8 flex items-center gap-4">
        {showProgressBar && (
          <button
            onClick={goBack}
            className="w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
            aria-label="Nazad"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <Logo size={36} showText={false} />
        {showProgressBar && (
          <div className="ml-auto flex items-center gap-1.5">
            {STEP_ORDER.map((s, i) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStepIndex
                    ? "w-8 bg-brand-500"
                    : i < currentStepIndex
                    ? "w-2 bg-brand-300"
                    : "w-2 bg-ink-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-6 sm:px-12 max-w-xl mx-auto w-full pb-8">
        {step === "neighborhood" && (
          <div className="animate-fade-in flex-1 flex flex-col">
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

            <div className="mt-auto pt-8">
              <Button onClick={() => setStep("documents")} size="lg" fullWidth>
                Nastavi <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        )}

        {step === "documents" && (
          <div className="animate-fade-in flex-1 flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 mt-4">
              <Shield size={28} />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
              Verifikacija identiteta
            </h1>
            <p className="mt-3 text-ink-600 text-lg">
              Da bi komšije bile sigurne — potreban je selfi i slika lične karte. Podaci su zaštićeni.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DocumentSlot
                title="Selfi"
                subtitle="Tvoja fotografija"
                Icon={User}
                done={selfieDone}
                kind="selfie"
                onCapture={() => setSelfieDone(true)}
              />
              <DocumentSlot
                title="Lična karta"
                subtitle="Prednja strana"
                Icon={IDCard}
                done={idDone}
                kind="id"
                onCapture={() => setIdDone(true)}
              />
            </div>

            <Card className="mt-5 p-4 bg-emerald-50/50 border-emerald-200/60">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Tvoji podaci se kriptuju i koriste isključivo za potvrdu identiteta.
                  Niko od komšija ih ne vidi.
                </p>
              </div>
            </Card>

            <div className="mt-auto pt-8">
              <Button
                onClick={() => setStep("address")}
                size="lg"
                fullWidth
                disabled={!documentsBothDone}
              >
                Nastavi <ArrowRight size={20} />
              </Button>
              {!documentsBothDone && (
                <p className="mt-3 text-center text-xs text-ink-500">
                  Slikaj obe stavke da nastaviš
                </p>
              )}
            </div>
          </div>
        )}

        {step === "address" && (
          <div className="animate-fade-in flex-1 flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mt-4">
              <Mail size={28} />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
              Tačna adresa
            </h1>
            <p className="mt-3 text-ink-600 text-lg">
              Da bismo ti poslali bezbednosni kod u vidu pisma, napiši tačnu adresu na kojoj stanuješ.
            </p>

            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-[1fr_120px] gap-3">
                <Input
                  label="Ulica"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="npr. Krunska"
                  icon={<Home2 size={20} />}
                  autoFocus
                />
                <Input
                  label="Broj"
                  value={streetNo}
                  onChange={(e) => setStreetNo(e.target.value)}
                  placeholder="35"
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-3">
                <Input
                  label="Poštanski"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="11000"
                  inputMode="numeric"
                />
                <Input
                  label="Grad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Beograd"
                />
              </div>
            </div>

            <Card className="mt-5 p-4 bg-amber-50/60 border-amber-200/60">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Zašto pismo?</strong> Slanje koda poštom potvrđuje da stvarno
                  živiš na ovoj adresi. Pismo obično stiže za 2-5 radnih dana.
                </p>
              </div>
            </Card>

            <div className="mt-auto pt-8">
              <Button
                onClick={submitAddress}
                size="lg"
                fullWidth
                disabled={!addressValid}
              >
                <Mail size={18} /> Pošalji mi kod
              </Button>
            </div>
          </div>
        )}

        {step === "letter_sent" && (
          <div className="flex-1 flex flex-col items-center justify-center animate-scale-in py-12">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full bg-amber-100 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-amber-200/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-amber-500 flex items-center justify-center text-white">
                  <MailSent size={48} />
                </div>
              </div>
            </div>
            <h2 className="mt-8 text-2xl sm:text-3xl font-extrabold text-ink-900 text-center">
              Pismo je poslato!
            </h2>
            <p className="mt-3 text-ink-600 text-center max-w-sm text-lg">
              Bezbednosni kod stiže na adresu{" "}
              <span className="font-bold text-ink-800">
                {street} {streetNo}, {city}
              </span>
            </p>
            <Card className="mt-8 p-4 max-w-sm w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="text-sm text-ink-700">
                  Demo: kod se "isporučuje" odmah za potrebe prezentacije
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === "letter_code" && (
          <div className="animate-fade-in flex-1 flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mt-4">
              <Mail size={28} />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
              Unesi kod iz pisma
            </h1>
            <p className="mt-3 text-ink-600 text-lg">
              Pismo sa 6-cifrenim kodom je stiglo na{" "}
              <span className="font-semibold text-ink-900">
                {street} {streetNo}, {city}
              </span>
            </p>

            <div className="mt-10 flex justify-center gap-2 sm:gap-3">
              {code.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  value={d}
                  onChange={(e) => updateCode(i, e.target.value)}
                  onKeyDown={(e) => onKey(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-16 sm:w-14 sm:h-20 text-center text-2xl sm:text-3xl font-bold bg-white border-2 border-ink-200 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
                />
              ))}
            </div>

            <button
              onClick={() => {
                setCode(["", "", "", "", "", ""]);
                setStep("letter_sent");
              }}
              className="mt-6 text-center text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Pošalji novo pismo
            </button>

            <p className="mt-auto pt-8 text-center text-xs text-ink-400">
              Demo: bilo koji 6-cifreni kod prolazi
            </p>
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
              Spajamo selfi, ličnu kartu i potvrđenu adresu.
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

            <div className="mt-10 w-full max-w-sm space-y-3">
              <Card className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-ink-500 font-medium">Opština</div>
                  <div className="font-bold text-ink-900">{neighborhood}, Beograd</div>
                </div>
              </Card>
              <Card className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="text-xs text-ink-500 font-medium">Adresa potvrđena</div>
                  <div className="font-bold text-ink-900">
                    {street} {streetNo}
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8 w-full max-w-sm">
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

function DocumentSlot({
  title,
  subtitle,
  Icon,
  done,
  kind,
  onCapture,
}: {
  title: string;
  subtitle: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  done: boolean;
  kind: "selfie" | "id";
  onCapture: () => void;
}) {
  const [capturing, setCapturing] = useState(false);

  const snap = () => {
    if (done || capturing) return;
    setCapturing(true);
    setTimeout(() => {
      setCapturing(false);
      onCapture();
    }, 1200);
  };

  return (
    <button
      onClick={snap}
      disabled={capturing || done}
      className={`relative w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 transition-all active:scale-[0.98] ${
        done
          ? "border-emerald-400 bg-emerald-50"
          : "border-ink-200 bg-gradient-to-br from-ink-800 to-black hover:border-brand-300"
      }`}
    >
      {!done ? (
        <>
          {/* viewfinder frame */}
          <div className="absolute inset-3 rounded-2xl border-2 border-white/40 border-dashed" />
          {/* corner markers */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/80 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/80 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/80 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/80 rounded-br-lg" />

          {/* placeholder icon */}
          <div className="absolute inset-0 flex items-center justify-center text-white/30">
            <Icon size={64} />
          </div>

          {/* title + cta */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="text-white font-bold text-sm">{title}</div>
            <div className="text-white/70 text-xs">{subtitle}</div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 h-8 bg-white text-ink-900 rounded-full text-xs font-bold">
              <Camera size={14} /> Slikaj
            </div>
          </div>

          {/* flash */}
          {capturing && (
            <div className="absolute inset-0 bg-white animate-fade-in" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center animate-scale-in p-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <Check size={28} stroke={3} />
          </div>
          <div className="mt-3 font-bold text-emerald-900">{title}</div>
          <div className="text-xs text-emerald-700">Slikano ✓</div>
        </div>
      )}
    </button>
  );
}
