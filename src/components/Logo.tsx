type Props = {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: "default" | "white";
};

export function Logo({ size = 80, showText = true, className = "", variant = "default" }: Props) {
  const stroke = variant === "white" ? "#ffffff" : "#f97316";
  const text = variant === "white" ? "#ffffff" : "#f97316";
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* House outline */}
        <path
          d="M15 50 L50 18 L85 50 L85 88 L15 88 Z"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Left person body */}
        <circle cx="33" cy="58" r="5" fill={stroke} />
        <path
          d="M33 64 L33 78 M33 70 L26 80 M33 70 L40 70"
          stroke={stroke}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Right person body */}
        <circle cx="67" cy="58" r="5" fill={stroke} />
        <path
          d="M67 64 L67 78 M67 70 L74 80 M67 70 L60 70"
          stroke={stroke}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* High-five spark */}
        <path
          d="M50 56 L50 50 M44 58 L40 54 M56 58 L60 54 M46 64 L42 64 M54 64 L58 64"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <div className="mt-1 text-center leading-none">
          <div
            className="font-extrabold tracking-tight"
            style={{
              color: text,
              fontSize: size * 0.3,
              letterSpacing: "-0.02em",
            }}
          >
            SOS
          </div>
          <div
            className="font-medium tracking-wide"
            style={{
              color: text,
              fontSize: size * 0.14,
              marginTop: size * 0.02,
            }}
          >
            komšija
          </div>
        </div>
      )}
    </div>
  );
}
