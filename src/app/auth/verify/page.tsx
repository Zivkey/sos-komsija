"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui";
import { ChevronLeft, MessageIcon } from "@/components/icons";

function VerifyInner() {
  const router = useRouter();
  const params = useSearchParams();
  const phone = params.get("phone") ?? "+381 60 123 4567";
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const update = (i: number, v: string) => {
    const cleaned = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = cleaned;
    setDigits(next);
    if (cleaned && i < 3) refs.current[i + 1]?.focus();
    if (next.every((d) => d)) {
      verify(next.join(""));
    }
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const verify = (code: string) => {
    if (code.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      router.push("/auth/identity");
    }, 1000);
  };

  const allFilled = digits.every((d) => d);

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

      <div className="flex-1 flex flex-col px-6 sm:px-12 max-w-xl mx-auto w-full">
        <div className="mt-4 sm:mt-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600">
            <MessageIcon size={28} />
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            Unesi kod
          </h1>
          <p className="mt-3 text-ink-600 text-lg">
            Poslali smo 4-cifreni kod na{" "}
            <span className="font-semibold text-ink-900">{phone}</span>
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-3 sm:gap-4">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => update(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              maxLength={1}
              disabled={loading}
              className="w-16 h-20 sm:w-20 sm:h-24 text-center text-3xl sm:text-4xl font-bold bg-white border-2 border-ink-200 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          {resendIn > 0 ? (
            <p className="text-sm text-ink-500">
              Pošalji novi kod za <span className="font-semibold text-ink-700">{resendIn}s</span>
            </p>
          ) : (
            <button
              onClick={() => setResendIn(30)}
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Pošalji novi kod
            </button>
          )}
        </div>

        <div className="mt-auto py-8">
          <Button
            onClick={() => verify(digits.join(""))}
            size="lg"
            fullWidth
            loading={loading}
            disabled={!allFilled}
          >
            Potvrdi
          </Button>
          <p className="mt-4 text-center text-xs text-ink-400">
            Demo: bilo koji 4-cifreni kod prolazi
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <VerifyInner />
    </Suspense>
  );
}
