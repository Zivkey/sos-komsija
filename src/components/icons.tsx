type IconProps = {
  size?: number;
  className?: string;
  stroke?: number;
};

const base = (size: number, className: string, stroke: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

export function Home({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M3 12L12 4l9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}
export function Search({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
export function MessageIcon({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M21 12c0 4.4-4 8-9 8-1.2 0-2.4-.2-3.5-.6L3 21l1.7-4.8C3.6 15 3 13.5 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
    </svg>
  );
}
export function User({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}
export function Settings({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}
export function ChevronLeft({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
export function ChevronRight({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
export function MapPin({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
export function Clock({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
export function Phone({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}
export function Check({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
export function Plus({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
export function X({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
export function Shield({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
export function ShieldCheck({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M8.5 12l2.5 2.5L16 9.5" />
    </svg>
  );
}
export function CreditCard({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  );
}
export function Lock({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
export function ArrowRight({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
export function Send({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}
export function Camera({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
export function IDCard({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M14 10h4M14 13h4M5.5 17c.7-1.5 2-2.5 3.5-2.5s2.8 1 3.5 2.5" />
    </svg>
  );
}
export function Star({ size = 24, className = "", stroke = 2, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(size, className, stroke)} fill={filled ? "currentColor" : "none"}>
      <path d="M12 2l2.95 6.03L21.5 9.27l-4.75 4.63L17.9 21 12 17.77 6.1 21l1.15-7.1L2.5 9.27l6.55-1.24L12 2z" />
    </svg>
  );
}
export function Wallet({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 1 0-4h13" />
      <circle cx="17" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}
export function Bell({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}
export function Filter({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M3 4h18l-7 9v6l-4 2v-8L3 4z" />
    </svg>
  );
}
export function ChevronDown({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
export function Sparkles({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
      <path d="M19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
    </svg>
  );
}
export function HandShake({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M11 17l3-3 3 3 4-4-7-7-4 4" />
      <path d="M3 13l4 4 3-3-3-3a2 2 0 0 0-3 0z" />
    </svg>
  );
}
export function Switch({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M7 4L3 8l4 4M3 8h13a4 4 0 0 1 0 8h-3M17 20l4-4-4-4M21 16H8a4 4 0 0 1 0-8h3" />
    </svg>
  );
}
export function LogOut({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}
export function Calendar({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
export function Info({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.5" />
    </svg>
  );
}
export function RefreshCw({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />
    </svg>
  );
}

/* ------- category icons ------- */
export function Baby({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M9 12h.01M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M2.5 12.5A9.5 9.5 0 0 1 12 3a9.5 9.5 0 0 1 9.5 9.5 9.5 9.5 0 0 1-19 0z" />
      <path d="M12 3c1.5 0 3 1 3 2.5S13.5 8 12 8c-1 0-1.8-.5-1.8-1.3" />
    </svg>
  );
}
export function Box({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M21 8.5L12 3 3 8.5v7L12 21l9-5.5v-7z" />
      <path d="M3 8.5L12 14l9-5.5M12 14v7" />
    </svg>
  );
}
export function Wrench({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M14.5 3a5.5 5.5 0 0 0-4.8 8.2L3 18l3 3 6.8-6.8A5.5 5.5 0 1 0 14.5 3z" />
      <circle cx="14.5" cy="8.5" r="2" />
    </svg>
  );
}
export function PawPrint({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)} fill="currentColor" stroke="none">
      <ellipse cx="7" cy="8" rx="2" ry="2.5" />
      <ellipse cx="17" cy="8" rx="2" ry="2.5" />
      <ellipse cx="4" cy="14" rx="1.8" ry="2.3" />
      <ellipse cx="20" cy="14" rx="1.8" ry="2.3" />
      <path d="M12 11c-2.5 0-5 2-5 4.5 0 1.5 1.2 2.5 2.5 2.5h5c1.3 0 2.5-1 2.5-2.5C17 13 14.5 11 12 11z" />
    </svg>
  );
}
export function HeartHand({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M12 20s-7-4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6-7 10-7 10z" />
      <path d="M9.5 17.5L7 20l-4-4 2-2" />
    </svg>
  );
}

/* ------- additional emoji replacements ------- */
export function Walking({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="13" cy="4" r="2" />
      <path d="M9 21l2-7-2-3 3-5 3 4 3 2" />
      <path d="M9 14l-2 7" />
    </svg>
  );
}
export function PartyPopper({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M5.8 11.3L2 22l10.7-3.8" />
      <path d="M4 3l.01.01M22 8l.01.01M15 2l.01.01M22 20l.01.01" />
      <path d="M22 13a10 10 0 0 0-13-13M11 6h.01M14 11h.01M17 14h.01" />
      <path d="M11 6L9 11l5-5 1 4 4-4-5-1z" />
    </svg>
  );
}
export function FileText({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  );
}
export function Timer({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2M9 2h6M12 5v0" />
    </svg>
  );
}
export function Zap({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
export function Sun({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
export function Sunrise({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M17 18a5 5 0 0 0-10 0M12 2v6M4.93 10.93l1.41 1.41M17.66 12.34l1.41-1.41M2 18h20M8 6l4-4 4 4" />
    </svg>
  );
}
export function Hand({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M18 11V6a2 2 0 1 0-4 0v5M14 10V4a2 2 0 1 0-4 0v6M10 10.5V6a2 2 0 1 0-4 0v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8 2 2 0 1 1 4 0" />
    </svg>
  );
}
export function Bolt({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
export function Plug({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M12 22v-5M9 7V2M15 7V2M5 7h14v5a7 7 0 1 1-14 0z" />
    </svg>
  );
}
export function Truck({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <rect x="1" y="5" width="14" height="11" rx="1" />
      <path d="M15 9h4l3 4v3h-7" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}
export function ShoppingBag({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
export function Briefcase({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
export function Map({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}
export function Trash({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14M10 11v6M14 11v6" />
    </svg>
  );
}
export function Users({ size = 24, className = "", stroke = 2 }: IconProps) {
  return (
    <svg {...base(size, className, stroke)}>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      <circle cx="17" cy="8" r="3" />
      <path d="M22 21c0-3.3-2.4-6-5.5-6" />
    </svg>
  );
}
