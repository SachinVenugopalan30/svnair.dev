export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" className="fill-surface" />
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.25"
      />
      <path
        d="M18 22 L12 32 L18 42 M46 22 L52 32 L46 42"
        className="stroke-accent"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        className="fill-text font-mono"
      >
        S
      </text>
    </svg>
  );
}
