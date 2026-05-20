"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Logo } from "@/components/Logo";

export default function RootPage() {
  const { state, ready } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!state.onboarded) {
      router.replace("/onboarding");
    } else if (!state.authenticated) {
      router.replace("/auth/phone");
    } else {
      router.replace("/home");
    }
  }, [ready, state.onboarded, state.authenticated, router]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100">
      <div className="animate-fade-in">
        <Logo size={140} />
      </div>
    </div>
  );
}
