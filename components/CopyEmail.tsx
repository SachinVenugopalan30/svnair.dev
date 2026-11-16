"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Copy } from "@phosphor-icons/react";

type Status = "idle" | "copied" | "failed";

// Receives the spelled-out form ("name [at] host (dot) me") so the real
// address never appears in the HTML. It is rebuilt only after hydration.
const toAddress = (spelled: string) =>
  spelled.replace(/ \[at\] /g, "@").replace(/ \(dot\) /g, ".");

export default function CopyEmail({ spelled }: { spelled: string }) {
  // false on the server and during hydration, true after: the address only
  // ever exists in the browser.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const address = hydrated ? toAddress(spelled) : null;
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(t);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(toAddress(spelled));
      setStatus("copied");
    } catch {
      // Clipboard API needs a secure context and permission; the address stays visible to copy by hand.
      setStatus("failed");
    }
  }

  const shown = address ?? spelled;
  const at = shown.indexOf("@");

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      <a
        href={address ? `mailto:${address}` : undefined}
        className="font-serif text-[clamp(1.4rem,1rem+2.2vw,2.75rem)] break-words text-accent-ink"
      >
        {at > 0 ? (
          <>
            {shown.slice(0, at + 1)}
            <wbr />
            {shown.slice(at + 1)}
          </>
        ) : (
          shown
        )}
      </a>
      <span className="relative inline-flex">
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 font-semibold transition-colors hover:border-accent hover:text-accent-ink"
        >
          {status === "copied" ? (
            <Check size={18} weight="bold" aria-hidden className="text-accent-ink" />
          ) : (
            <Copy size={18} aria-hidden />
          )}
          <span aria-hidden>Copy</span>
        </button>
        <span
          role="status"
          className="absolute top-full left-1/2 mt-1.5 -translate-x-1/2 text-sm whitespace-nowrap text-text-muted"
        >
          {status === "copied" && "Copied"}
          {status === "failed" && "Couldn't copy. Select the address instead."}
        </span>
      </span>
    </div>
  );
}
