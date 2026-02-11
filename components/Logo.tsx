export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dark background */}
      <rect width="64" height="64" rx="14" fill="#0A0A0B" />

      {/* Subtle aperture ring */}
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.25"
        fill="none"
      />

      {/* Code brackets in accent */}
      <path
        d="M18 22 L12 32 L18 42"
        stroke="#C4503A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M46 22 L52 32 L46 42"
        stroke="#C4503A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* S monogram */}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#E8E4E0"
        fontFamily="'IBM Plex Serif', Georgia, serif"
      >
        S
      </text>
    </svg>
  );
}
