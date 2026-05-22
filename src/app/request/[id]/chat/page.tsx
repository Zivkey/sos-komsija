"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Avatar, Badge } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  ChevronLeft,
  Phone,
  Send,
  Shield,
  Info,
} from "@/components/icons";

const QUICK_REPLIES = [
  "Hvala! 🙏",
  "Ok, jasno",
  "Stižem!",
  "Možeš li malo kasnije?",
  "Već sam blizu",
];

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getRequest, state, sendMessage } = useStore();
  const request = getRequest(id);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [request?.messages.length]);

  useEffect(() => {
    if (!request) router.replace("/home");
  }, [request, router]);

  if (!request) return null;
  const isUser = state.role === "user";
  const me = isUser ? "user" : "provider";
  const other = isUser ? state.provider : state.user;

  const send = (msg?: string) => {
    const t = (msg ?? text).trim();
    if (!t) return;
    sendMessage(request.id, me, t);
    setText("");
  };

  return (
    <div className="min-h-dvh flex flex-col bg-ink-50/60">
      <header className="sticky top-0 z-30 bg-white border-b border-ink-200/60">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-white border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <Avatar initials={other.initials} color={other.avatarColor} size={44} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <div className="font-bold text-ink-900 truncate">{other.name}</div>
              <Shield size={14} className="text-emerald-500" />
            </div>
            <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Online
            </div>
          </div>
          <button className="w-11 h-11 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 hover:bg-brand-100 transition-colors">
            <Phone size={18} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-3">
          {/* System message */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink-100 rounded-full text-xs font-medium text-ink-600">
              <Info size={12} /> Zahtev prihvaćen · {new Date(request.acceptedAt ?? request.createdAt).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>

          {/* Safety notice */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex items-start gap-2">
            <Shield size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-relaxed">
              Sva komunikacija je <strong>kriptovana</strong>. Nikada ne deli platne podatke ili lozinke u chatu.
            </div>
          </div>

          {/* Welcome msg from other party */}
          {request.messages.length === 0 && (
            <Message
              from={isUser ? "provider" : "user"}
              me={me}
              text={
                isUser
                  ? "Zdravo! Stižem za par minuta. Da pripremim nešto specifično?"
                  : "Zdravo! Hvala što si prihvatio zahtev. Stan je na 2. spratu."
              }
              avatar={other}
            />
          )}

          {request.messages.map((m) => (
            <Message
              key={m.id}
              from={m.from}
              me={me}
              text={m.text}
              ts={m.ts}
              avatar={m.from === me ? null : other}
            />
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-ink-200/60">
        <div className="max-w-3xl mx-auto px-4 py-3">
          {/* Quick replies */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4">
            {QUICK_REPLIES.map((r) => (
              <button
                key={r}
                onClick={() => send(r)}
                className="shrink-0 h-10 px-4 rounded-full bg-ink-100 hover:bg-ink-200 text-ink-700 text-sm font-semibold transition-colors whitespace-nowrap"
              >
                {r}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Poruka…"
              className="flex-1 h-12 px-4 bg-ink-100 rounded-full text-[15px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Message({
  from,
  me,
  text,
  ts,
  avatar,
}: {
  from: "user" | "provider";
  me: "user" | "provider";
  text: string;
  ts?: number;
  avatar?: { initials: string; avatarColor: string } | null;
}) {
  const mine = from === me;
  return (
    <div className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"} animate-fade-in`}>
      {!mine && avatar && (
        <Avatar initials={avatar.initials} color={avatar.avatarColor} size={32} />
      )}
      <div className={`max-w-[80%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed ${
            mine
              ? "bg-brand-500 text-white rounded-br-md"
              : "bg-white border border-ink-200 text-ink-900 rounded-bl-md"
          }`}
        >
          {text}
        </div>
        {ts && (
          <div className="text-[10px] text-ink-400 mt-1 px-1">
            {new Date(ts).toLocaleTimeString("sr-RS", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </div>
  );
}
