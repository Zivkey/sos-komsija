"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Avatar, Button, Card, Textarea } from "@/components/ui";
import { useStore } from "@/lib/store";
import { ChevronLeft, Star, Check, PartyPopper } from "@/components/icons";

const TAGS = [
  "Tačan",
  "Ljubazan",
  "Profesionalan",
  "Brz",
  "Pažljiv",
  "Komunikativan",
  "Pouzdan",
  "Prijateljski",
];

export default function RatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getRequest, state, submitReview } = useStore();
  const request = getRequest(id);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!request) router.replace("/home");
  }, [request, router]);

  if (!request) return null;
  const isUser = state.role === "user";
  const other = isUser ? state.provider : state.user;

  const submit = () => {
    if (rating === 0) return;
    submitReview(request.id, {
      rating,
      text: text + (tags.length ? "\n" + tags.join(" · ") : ""),
      by: isUser ? "user" : "provider",
    });
    setDone(true);
    setTimeout(() => router.replace("/home"), 2000);
  };

  if (done) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-gradient-to-br from-brand-50 via-white to-emerald-50 p-6 animate-fade-in">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-emerald-100" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center animate-scale-in">
              <Check size={42} className="text-white" stroke={3} />
            </div>
          </div>
        </div>
        <h2 className="mt-8 text-3xl font-extrabold text-ink-900 text-center flex items-center justify-center gap-2">
          Hvala na oceni! <PartyPopper size={28} className="text-amber-500" />
        </h2>
        <p className="mt-3 text-ink-600 text-center max-w-sm text-lg">
          Tvoje mišljenje pomaže celoj zajednici.
        </p>
        <Logo size={60} className="mt-10 opacity-60" />
      </div>
    );
  }

  const stars = hover || rating;
  const labels = ["", "Loše", "Slabo", "OK", "Dobro", "Odlično!"];

  return (
    <div className="min-h-dvh flex flex-col bg-ink-50/60">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-ink-200/60">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="text-xs text-ink-500 font-medium">Oceni</div>
            <div className="font-extrabold text-ink-900">{isUser ? "Pružaoca" : "Korisnika"}</div>
          </div>
          <Logo size={36} showText={false} />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-8 pb-40">
        <Card className="p-6 flex flex-col items-center text-center">
          <Avatar initials={other.initials} color={other.avatarColor} size={88} />
          <h2 className="mt-4 text-2xl font-extrabold text-ink-900">{other.name}</h2>
          <p className="text-sm text-ink-500">{isUser ? "Pružalac usluge" : "Korisnik"}</p>

          <div className="mt-8">
            <div className="text-sm font-medium text-ink-600 mb-2">
              {stars > 0 ? labels[stars] : "Kakvo je iskustvo?"}
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(i)}
                  className="p-1 transition-transform active:scale-90"
                >
                  <Star
                    size={48}
                    filled={i <= stars}
                    className={i <= stars ? "text-amber-400" : "text-ink-200"}
                  />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {rating > 0 && (
          <>
            <Card className="mt-5 p-5 animate-fade-in">
              <div className="text-sm font-bold text-ink-900 mb-3">
                Šta je bilo dobro?
              </div>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <button
                    key={t}
                    onClick={() =>
                      setTags((ts) =>
                        ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]
                      )
                    }
                    className={`h-10 px-4 rounded-full font-semibold text-sm transition-all ${
                      tags.includes(t)
                        ? "bg-brand-500 text-white shadow"
                        : "bg-white border border-ink-200 text-ink-700 hover:border-brand-300"
                    }`}
                  >
                    {tags.includes(t) && <Check size={14} className="inline mr-1" stroke={3} />}
                    {t}
                  </button>
                ))}
              </div>
            </Card>

            <div className="mt-5 animate-fade-in">
              <Textarea
                label="Komentar (opciono)"
                placeholder="Reci nešto više o iskustvu…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={300}
              />
            </div>
          </>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-ink-200/60 p-4">
        <div className="max-w-3xl mx-auto">
          <Button onClick={submit} size="lg" fullWidth disabled={rating === 0}>
            Pošalji ocenu
          </Button>
        </div>
      </footer>
    </div>
  );
}
