export const Logo = ({ className = "w-9 h-9" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Shape - Modern Hexagon/Circle Hybrid */}
      <rect
        width="100"
        height="100"
        rx="24"
        fill="currentColor"
        className="text-primary/10"
      />

      {/* The "N" Path - Representing connectivity and flow */}
      <path
        d="M30 70V30L50 55L70 30V70"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />

      {/* Accent Dot - Representing digital currency/security */}
      <circle
        cx="70"
        cy="70"
        r="6"
        fill="currentColor"
        className="text-primary"
      />

      {/* Subtle Speed Lines */}
      <path
        d="M30 45H20M30 55H25"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-primary/40"
      />
    </svg>
  );
};
