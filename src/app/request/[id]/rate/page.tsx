"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Avatar, Button, Card, Textarea } from "@/components/ui";
import { useStore } from "@/lib/store";
import { ChevronLeft, Star, Check, PartyPopper, Camera, Plus, X } from "@/components/icons";

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
  const [photos, setPhotos] = useState<string[]>([]); // gradient palettes as fake photos
  const [uploading, setUploading] = useState(false);

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
      <header className="sticky top-0 z-30 bg-white border-b border-ink-200/60">
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

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-8 pb-8">
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

            <Card className="mt-5 p-5 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-bold text-ink-900">
                    Dodaj slike (opciono)
                  </div>
                  <div className="text-xs text-ink-500">
                    Pomozi drugima da vide rezultat — do 4 slike
                  </div>
                </div>
                {photos.length > 0 && (
                  <span className="text-xs font-semibold text-brand-600">
                    {photos.length}/4
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {photos.map((gradient, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl overflow-hidden group animate-scale-in"
                    style={{ background: gradient }}
                  >
                    {/* Fake photo content - some shape */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1/2 h-1/2 rounded-full bg-white/20 blur-xl" />
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/70 rounded text-[10px] font-bold text-white">
                      IMG_{1240 + i}
                    </div>
                    <button
                      onClick={() => setPhotos((p) => p.filter((_, idx) => idx !== i))}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all"
                      aria-label="Ukloni"
                    >
                      <X size={12} stroke={3} />
                    </button>
                  </div>
                ))}

                {photos.length < 4 && (
                  <button
                    onClick={() => {
                      if (uploading) return;
                      setUploading(true);
                      setTimeout(() => {
                        const palettes = [
                          "linear-gradient(135deg, #fbbf24 0%, #f97316 60%, #c2410c 100%)",
                          "linear-gradient(135deg, #34d399 0%, #0ea5e9 100%)",
                          "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                          "linear-gradient(135deg, #fb7185 0%, #f59e0b 100%)",
                          "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                          "linear-gradient(135deg, #4ade80 0%, #14b8a6 100%)",
                        ];
                        const next = palettes[photos.length % palettes.length];
                        setPhotos((p) => [...p, next]);
                        setUploading(false);
                      }, 800);
                    }}
                    disabled={uploading}
                    className="aspect-square rounded-2xl border-2 border-dashed border-ink-300 bg-ink-50/60 hover:border-brand-400 hover:bg-brand-50/40 transition-all flex flex-col items-center justify-center gap-1 text-ink-500 hover:text-brand-600 disabled:opacity-60"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin-slow" width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span className="text-[10px] font-semibold">Učitavam…</span>
                      </>
                    ) : (
                      <>
                        {photos.length === 0 ? (
                          <Camera size={22} />
                        ) : (
                          <Plus size={22} stroke={2.5} />
                        )}
                        <span className="text-[10px] font-semibold">
                          {photos.length === 0 ? "Dodaj sliku" : "Još"}
                        </span>
                      </>
                    )}
                  </button>
                )}

                {/* Placeholder slots */}
                {Array.from({ length: Math.max(0, 4 - photos.length - 1) }).map((_, i) => (
                  <div
                    key={`ph-${i}`}
                    className="aspect-square rounded-2xl border border-dashed border-ink-200 bg-ink-50/30"
                  />
                ))}
              </div>
            </Card>
          </>
        )}
      </main>

      <footer className="sticky bottom-0 z-20 bg-white border-t border-ink-200/60 p-4">
        <div className="max-w-3xl mx-auto">
          <Button onClick={submit} size="lg" fullWidth disabled={rating === 0}>
            Pošalji ocenu
          </Button>
        </div>
      </footer>
    </div>
  );
}
