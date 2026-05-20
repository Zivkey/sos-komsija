"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button, Input } from "@/components/ui";
import { Phone, Shield, ArrowRight } from "@/components/icons";

export default function PhoneAuth() {
  const router = useRouter();
  const [phone, setPhone] = useState("60 123 4567");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 6) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/auth/verify?phone=${encodeURIComponent("+381 " + phone)}`);
    }, 900);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="p-6 sm:p-8">
        <Logo size={44} showText={false} />
      </div>

      <div className="flex-1 flex flex-col px-6 sm:px-12 max-w-xl mx-auto w-full">
        <div className="mt-4 sm:mt-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            Tvoj broj telefona
          </h1>
          <p className="mt-3 text-ink-600 text-lg">
            Poslaćemo ti SMS sa kodom za verifikaciju. Tvoj broj služi i kao kontakt komšijama.
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <div>
            <div className="text-sm font-medium text-ink-700 mb-2 ml-1">
              Telefon
            </div>
            <div className="flex gap-2">
              <div className="h-14 w-24 bg-white border border-ink-200 rounded-2xl flex items-center justify-center gap-1.5 px-3">
                <span className="text-xl">🇷🇸</span>
                <span className="font-semibold text-ink-700">+381</span>
              </div>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="60 123 4567"
                icon={<Phone size={20} />}
                inputMode="tel"
                autoFocus
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-brand-50 rounded-2xl border border-brand-100">
            <Shield size={20} className="text-brand-600 shrink-0 mt-0.5" />
            <p className="text-sm text-brand-900 leading-relaxed">
              Tvoj broj koristimo isključivo za verifikaciju i kontakt sa komšijama. Nikada ga ne delimo trećim stranama.
            </p>
          </div>

          <Button type="submit" size="lg" fullWidth loading={loading}>
            Pošalji kod <ArrowRight size={20} />
          </Button>
        </form>

        <p className="mt-auto py-8 text-xs text-ink-500 text-center">
          Klikom na "Pošalji kod" prihvataš{" "}
          <span className="font-semibold text-ink-700">Uslove korišćenja</span> i{" "}
          <span className="font-semibold text-ink-700">Politiku privatnosti</span>.
        </p>
      </div>
    </div>
  );
}
