"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button, Input } from "@/components/ui";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Lock,
  Mail,
  Phone,
  User as UserIcon,
} from "@/components/icons";

export default function PhoneAuth() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("Marko");
  const [lastName, setLastName] = useState("Marković");
  const [email, setEmail] = useState("marko@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [phone, setPhone] = useState("60 123 4567");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(email) &&
    password.length >= 6 &&
    phone.replace(/\D/g, "").length >= 6 &&
    acceptTerms;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/auth/verify?phone=${encodeURIComponent("+381 " + phone)}`);
    }, 900);
  };

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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            Kreiraj nalog
          </h1>
          <p className="mt-3 text-ink-600 text-lg">
            Pridruži se komšijama u Beogradu — popuni nekoliko podataka.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Ime"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Marko"
              icon={<UserIcon size={20} />}
              autoFocus
            />
            <Input
              label="Prezime"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Marković"
            />
          </div>

          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="marko@gmail.com"
            type="email"
            icon={<Mail size={20} />}
            autoComplete="email"
          />

          <Input
            label="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Najmanje 6 karaktera"
            type="password"
            icon={<Lock size={20} />}
            autoComplete="new-password"
          />

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
                className="flex-1"
              />
            </div>
          </div>

          {/* Consent checkboxes */}
          <div className="pt-2 space-y-2.5">
            <ConsentCheckbox
              checked={acceptTerms}
              onChange={setAcceptTerms}
              required
            >
              Slažem se sa{" "}
              <span className="font-semibold text-ink-800 underline">
                Uslovima korišćenja
              </span>{" "}
              i obradom ličnih podataka u skladu sa{" "}
              <span className="font-semibold text-ink-800 underline">
                Politikom privatnosti
              </span>
              .
            </ConsentCheckbox>
            <ConsentCheckbox
              checked={acceptMarketing}
              onChange={setAcceptMarketing}
            >
              Šaljite mi novosti, popuste i obaveštenja o uslugama u mom
              komšiluku.
            </ConsentCheckbox>
          </div>

          <div className="pt-3">
            <Button type="submit" size="lg" fullWidth loading={loading} disabled={!isValid}>
              Pošalji kod <ArrowRight size={20} />
            </Button>
          </div>
        </form>

        <p className="mt-6 text-xs text-ink-400 text-center">
          Već imaš nalog?{" "}
          <span className="font-semibold text-ink-600 underline">Prijavi se</span>
        </p>
      </div>
    </div>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  required,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full text-left flex items-start gap-2.5 group"
    >
      <div
        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all border-2 ${
          checked
            ? "bg-brand-500 border-brand-500 text-white"
            : "bg-white border-ink-300 group-hover:border-brand-400"
        }`}
      >
        {checked && <Check size={12} stroke={3} />}
      </div>
      <div className="text-xs text-ink-600 leading-relaxed">
        {children}
        {required && (
          <span className="ml-1 text-brand-600 font-bold">*</span>
        )}
      </div>
    </button>
  );
}
