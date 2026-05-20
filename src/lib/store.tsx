"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AppState,
  CategoryId,
  ChatMessage,
  RequestStatus,
  Review,
  Role,
  ServiceRequest,
} from "./types";
import { getCategory } from "./categories";

const STORAGE_KEY = "sos-komsija-state-v1";

const defaultState: AppState = {
  authenticated: false,
  onboarded: false,
  role: "user",
  user: {
    name: "Marko Marković",
    phone: "+381 60 123 4567",
    neighborhood: "Vračar",
    city: "Beograd",
    verified: true,
    avatarColor: "#f97316",
    initials: "MM",
    ratingAvg: 4.9,
    ratingCount: 12,
  },
  provider: {
    name: "Marko Marković",
    phone: "+381 60 123 4567",
    neighborhood: "Vračar",
    city: "Beograd",
    verified: true,
    avatarColor: "#f97316",
    initials: "MM",
    ratingAvg: 4.95,
    ratingCount: 47,
  },
  requests: [],
};

// Seed sample requests so provider has things to see right away
function seedRequests(): ServiceRequest[] {
  const now = Date.now();
  return [
    {
      id: "seed-1",
      category: "repairs",
      title: "Curi slavina u kuhinji",
      description:
        "Slavina kaplje već 2 dana, treba mi neko da pogleda i zameni dihtung ako treba.",
      address: "Krunska 42, Vračar",
      neighborhood: "Vračar",
      when: "Danas, što pre",
      price: 2000,
      status: "pending",
      createdAt: now - 1000 * 60 * 18,
      userId: "other-1",
      distanceKm: 0.4,
      messages: [],
    },
    {
      id: "seed-2",
      category: "pets",
      title: "Šetnja psa - 1h",
      description:
        "Bracko, zlatni retriver, vrlo miran. Treba ga prošetati u parku Manjež.",
      address: "Njegoševa 18, Vračar",
      neighborhood: "Vračar",
      when: "Danas u 18:00",
      price: 700,
      status: "pending",
      createdAt: now - 1000 * 60 * 35,
      userId: "other-2",
      distanceKm: 0.8,
      messages: [],
    },
    {
      id: "seed-3",
      category: "elderly",
      title: "Kupovina iz Maxija",
      description:
        "Manja lista namirnica - hleb, mleko, jogurt, voće. Stara dama, treba joj društvo i pomoć.",
      address: "Makenzijeva 67, Vračar",
      neighborhood: "Vračar",
      when: "Sutra ujutru",
      price: 500,
      status: "pending",
      createdAt: now - 1000 * 60 * 60 * 2,
      userId: "other-3",
      distanceKm: 1.2,
      messages: [],
    },
    {
      id: "seed-4",
      category: "moving",
      title: "Prenos kauča na 3. sprat",
      description:
        "Trebaju mi 2 osobe da pomognu da prenesemo kauč iz kombija na 3. sprat (bez lifta).",
      address: "Bulevar oslobođenja 22, Vračar",
      neighborhood: "Vračar",
      when: "Subota, 10:00",
      price: 3000,
      status: "pending",
      createdAt: now - 1000 * 60 * 90,
      userId: "other-4",
      distanceKm: 1.6,
      messages: [],
    },
    {
      id: "seed-5",
      category: "babysitting",
      title: "Čuvanje dvoje dece (5 i 8g)",
      description:
        "Potrebna mi je dadilja od 19h do 22h, deca su mirna i većinom gledaju crtaće.",
      address: "Kalenićeva 11, Vračar",
      neighborhood: "Vračar",
      when: "Petak, 19:00-22:00",
      price: 1800,
      status: "pending",
      createdAt: now - 1000 * 60 * 25,
      userId: "other-5",
      distanceKm: 0.6,
      messages: [],
    },
  ];
}

type Store = {
  state: AppState;
  ready: boolean;
  setRole: (role: Role) => void;
  setOnboarded: () => void;
  login: () => void;
  logout: () => void;
  resetDemo: () => void;
  createRequest: (input: {
    category: CategoryId;
    description: string;
    address: string;
    when: string;
    price: number;
  }) => ServiceRequest;
  acceptRequest: (id: string) => void;
  setRequestStatus: (id: string, status: RequestStatus) => void;
  sendMessage: (id: string, from: "user" | "provider", text: string) => void;
  submitReview: (id: string, review: Review) => void;
  getRequest: (id: string) => ServiceRequest | undefined;
};

const Ctx = createContext<Store | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppState;
        setState(parsed);
      } else {
        setState({ ...defaultState, requests: seedRequests() });
      }
    } catch {
      setState({ ...defaultState, requests: seedRequests() });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const setRole = useCallback(
    (role: Role) => setState((s) => ({ ...s, role })),
    []
  );
  const setOnboarded = useCallback(
    () => setState((s) => ({ ...s, onboarded: true })),
    []
  );
  const login = useCallback(
    () => setState((s) => ({ ...s, authenticated: true, onboarded: true })),
    []
  );
  const logout = useCallback(
    () =>
      setState(() => ({
        ...defaultState,
        requests: seedRequests(),
      })),
    []
  );
  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ ...defaultState, requests: seedRequests() });
  }, []);

  const createRequest = useCallback<Store["createRequest"]>((input) => {
    const cat = getCategory(input.category);
    const req: ServiceRequest = {
      id: `req-${Date.now()}`,
      category: input.category,
      title: cat.short,
      description: input.description,
      address: input.address,
      neighborhood: "Vračar",
      when: input.when,
      price: input.price,
      status: "pending",
      createdAt: Date.now(),
      userId: "me",
      distanceKm: 0,
      messages: [],
    };
    setState((s) => ({ ...s, requests: [req, ...s.requests] }));
    return req;
  }, []);

  const acceptRequest = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      requests: s.requests.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "accepted",
              acceptedAt: Date.now(),
              providerId: "ana",
            }
          : r
      ),
    }));
  }, []);

  const setRequestStatus = useCallback(
    (id: string, status: RequestStatus) => {
      setState((s) => ({
        ...s,
        requests: s.requests.map((r) =>
          r.id === id
            ? {
                ...r,
                status,
                ...(status === "completed" ? { completedAt: Date.now() } : {}),
              }
            : r
        ),
      }));
    },
    []
  );

  const sendMessage = useCallback(
    (id: string, from: "user" | "provider", text: string) => {
      const msg: ChatMessage = {
        id: `msg-${Date.now()}`,
        from,
        text,
        ts: Date.now(),
      };
      setState((s) => ({
        ...s,
        requests: s.requests.map((r) =>
          r.id === id ? { ...r, messages: [...r.messages, msg] } : r
        ),
      }));

      // Auto-reply from the other party after a short delay
      const replies = {
        user: [
          "Hvala, vidim! 🙏",
          "Super, dolazim odmah.",
          "OK, javim kad budem blizu.",
          "Razumem, nema problema!",
        ],
        provider: [
          "Stižem za 15 minuta!",
          "Hvala na poruci, krećem.",
          "U redu, javim kad krenem.",
          "Sve jasno, vidimo se uskoro.",
        ],
      };
      const replyFrom = from === "user" ? "provider" : "user";
      const pool = replies[replyFrom];
      const replyText = pool[Math.floor(Math.random() * pool.length)];
      setTimeout(() => {
        setState((s) => ({
          ...s,
          requests: s.requests.map((r) =>
            r.id === id
              ? {
                  ...r,
                  messages: [
                    ...r.messages,
                    {
                      id: `msg-${Date.now()}-r`,
                      from: replyFrom,
                      text: replyText,
                      ts: Date.now(),
                    },
                  ],
                }
              : r
          ),
        }));
      }, 1600 + Math.random() * 1200);
    },
    []
  );

  const submitReview = useCallback((id: string, review: Review) => {
    setState((s) => ({
      ...s,
      requests: s.requests.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "rated",
              ...(review.by === "user"
                ? { reviewFromUser: review }
                : { reviewFromProvider: review }),
            }
          : r
      ),
    }));
  }, []);

  const getRequest = useCallback(
    (id: string) => state.requests.find((r) => r.id === id),
    [state.requests]
  );

  const value = useMemo<Store>(
    () => ({
      state,
      ready,
      setRole,
      setOnboarded,
      login,
      logout,
      resetDemo,
      createRequest,
      acceptRequest,
      setRequestStatus,
      sendMessage,
      submitReview,
      getRequest,
    }),
    [
      state,
      ready,
      setRole,
      setOnboarded,
      login,
      logout,
      resetDemo,
      createRequest,
      acceptRequest,
      setRequestStatus,
      sendMessage,
      submitReview,
      getRequest,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within AppProvider");
  return ctx;
}

export function useActiveRequest() {
  const { state } = useStore();
  // Most recent non-rated request that belongs to me as user or accepted by provider
  if (state.role === "user") {
    return state.requests.find(
      (r) =>
        r.userId === "me" &&
        r.status !== "rated"
    );
  }
  return state.requests.find(
    (r) => r.providerId === "ana" && r.status !== "rated"
  );
}
