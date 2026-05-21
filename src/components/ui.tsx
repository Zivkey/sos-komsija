"use client";

import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth,
    loading,
    className = "",
    children,
    disabled,
    ...props
  },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 focus-ring select-none";
  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-[15px]",
    lg: "h-14 px-6 text-base",
  };
  const variants = {
    primary:
      "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25",
    secondary:
      "bg-white hover:bg-ink-50 text-ink-900 border border-ink-200 shadow-sm",
    ghost: "bg-transparent hover:bg-ink-100 text-ink-700",
    outline:
      "bg-transparent hover:bg-brand-50 text-brand-600 border-2 border-brand-500",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  return (
    <button
      ref={ref}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin-slow" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : null}
      {children}
    </button>
  );
});

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  icon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, icon, className = "", ...props },
  ref
) {
  return (
    <label className="block">
      {label && (
        <div className="text-sm font-medium text-ink-700 mb-2 ml-1">{label}</div>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full h-14 ${icon ? "pl-12" : "pl-4"} pr-4 bg-white border border-ink-200 rounded-2xl text-[15px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all ${className}`}
          {...props}
        />
      </div>
      {hint && <div className="text-xs text-ink-500 mt-1.5 ml-1">{hint}</div>}
    </label>
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export function Textarea({ label, hint, className = "", ...props }: TextareaProps) {
  return (
    <label className="block">
      {label && (
        <div className="text-sm font-medium text-ink-700 mb-2 ml-1">{label}</div>
      )}
      <textarea
        className={`w-full min-h-[120px] p-4 bg-white border border-ink-200 rounded-2xl text-[15px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all resize-none ${className}`}
        {...props}
      />
      {hint && <div className="text-xs text-ink-500 mt-1.5 ml-1">{hint}</div>}
    </label>
  );
}

export function Card({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white rounded-3xl border border-ink-200 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "brand" | "success" | "warning" | "info";
  className?: string;
}) {
  const variants = {
    default: "bg-ink-100 text-ink-700",
    brand: "bg-brand-100 text-brand-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-sky-100 text-sky-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Avatar({
  initials,
  color = "#f97316",
  size = 40,
}: {
  initials: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shrink-0"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}, ${shade(color, -20)})`,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}

function shade(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00ff) + percent;
  let b = (num & 0x0000ff) + percent;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

export function StatusDot({ color }: { color: string }) {
  return (
    <span className="relative inline-flex w-2.5 h-2.5">
      <span
        className="absolute inset-0 rounded-full opacity-60 animate-pulse-ring"
        style={{ background: color }}
      />
      <span
        className="relative rounded-full w-2.5 h-2.5"
        style={{ background: color }}
      />
    </span>
  );
}

export function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.round(rating);
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "#f59e0b" : "#e2e8f0"}
            aria-hidden="true"
          >
            <path d="M12 2l2.95 6.03L21.5 9.27l-4.75 4.63L17.9 21 12 17.77 6.1 21l1.15-7.1L2.5 9.27l6.55-1.24L12 2z" />
          </svg>
        );
      })}
    </span>
  );
}
