// Summit rings: three contour lines closing on a summit, the hero map in one
// mark. Same drawing as public/favicon.svg; here it follows the theme
// (teal tile with pale rings in light, pale teal tile with dark rings in dark).
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="var(--accent)" />
      <g
        fill="none"
        stroke="var(--on-accent)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M10 40c-1-11 6-24 19-27 12-3 25 3 26 15 1 11-8 21-21 23-12 2-23-1-24-11Z" />
        <path d="M20 37c-1-7 4-14 12-16 8-2 15 2 15 9 1 7-5 12-13 13-7 1-13-1-14-6Z" />
        <path d="M30 33c0-3 2-6 6-6 3 0 5 2 5 4 0 3-3 5-6 5-3 0-5-1-5-3Z" />
      </g>
    </svg>
  );
}
