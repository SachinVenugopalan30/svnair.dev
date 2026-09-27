// Same name, same color, everywhere. Hues and contrast live in globals.css (--tag-0..7).
function hue(name: string): number {
  let h = 0;
  for (const ch of name.toLowerCase()) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h % 8;
}

export default function TechPill({ name }: { name: string }) {
  const n = hue(name);
  return (
    <li
      className="rounded-full px-2.5 py-0.5 text-[11px] leading-5 font-medium"
      style={{ color: `var(--tag-${n}-fg)`, background: `var(--tag-${n}-bg)` }}
    >
      {name}
    </li>
  );
}

export function TechList({ items }: { items: string[] }) {
  const names = items.filter((t) => t.trim());
  if (names.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {names.map((t) => (
        <TechPill key={t} name={t} />
      ))}
    </ul>
  );
}
