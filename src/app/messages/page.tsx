"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Avatar, Badge, Card } from "@/components/ui";
import { useStore } from "@/lib/store";
import { getCategory } from "@/lib/categories";
import { MessageIcon, Shield } from "@/components/icons";

export default function MessagesPage() {
  const { state } = useStore();
  const isUser = state.role === "user";
  const myReqs = state.requests.filter((r) =>
    isUser ? r.userId === "me" : r.providerId === "ana"
  );
  const withChat = myReqs.filter(
    (r) => r.status !== "pending" && r.status !== "rated"
  );
  const other = isUser ? state.provider : state.user;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-5 py-6 sm:py-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            Poruke
          </h1>
          <p className="mt-1 text-ink-500">Razgovori sa komšijama</p>
        </div>

        <div className="mt-6 space-y-3">
          {withChat.length === 0 && (
            <Card className="p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center mx-auto text-ink-400">
                <MessageIcon size={32} />
              </div>
              <h3 className="mt-3 font-bold text-ink-900">Još nema razgovora</h3>
              <p className="mt-1 text-sm text-ink-500">
                {isUser
                  ? "Kreiraj zahtev pa razgovaraj sa pružaocem."
                  : "Prihvati zahtev iz liste pa razgovaraj sa korisnikom."}
              </p>
              <Link
                href={isUser ? "/request/new" : "/explore"}
                className="inline-block mt-5 font-bold text-brand-600"
              >
                {isUser ? "Kreiraj zahtev →" : "Vidi zahteve →"}
              </Link>
            </Card>
          )}

          {withChat.map((r) => {
            const cat = getCategory(r.category);
            const last = r.messages[r.messages.length - 1];
            const unread = !last || (last.from !== (isUser ? "user" : "provider") && Date.now() - last.ts < 1000 * 60);
            return (
              <Link key={r.id} href={`/request/${r.id}/chat`}>
                <Card className="p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar initials={other.initials} color={other.avatarColor} size={56} />
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-ink-900 truncate">{other.name}</div>
                        <Shield size={12} className="text-emerald-500" />
                        <span className="ml-auto text-xs text-ink-500 shrink-0">
                          {last
                            ? new Date(last.ts).toLocaleTimeString("sr-RS", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "sada"}
                        </span>
                      </div>
                      <div className="text-sm text-ink-600 truncate">
                        {last ? last.text : cat.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={r.status === "completed" ? "success" : "brand"}>
                          {cat.short}
                        </Badge>
                        {unread && <span className="w-2 h-2 rounded-full bg-brand-500" />}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
