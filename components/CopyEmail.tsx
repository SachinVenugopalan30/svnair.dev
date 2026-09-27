"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

type Status = "idle" | "copied" | "failed";

// Receives the spelled-out form ("name [at] host (dot) me") so the real
// address never appears in the HTML. It is rebuilt only on click.
export default function CopyEmail({ spelled }: { spelled: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(t);
  }, [status]);

  async function copy() {
    const address = spelled
      .replace(/ \[at\] /g, "@")
      .replace(/ \(dot\) /g, ".");
    try {
      await navigator.clipboard.writeText(address);
      setStatus("copied");
    } catch {
      // Clipboard API needs a secure context and permission; the text stays visible to copy by hand.
      setStatus("failed");
    }
  }

  return (
    <div className="mt-8">
      <p className="flex flex-wrap items-baseline gap-x-2 text-sm sm:text-base">
        <span className="text-text-muted">email:</span>
        <button
          type="button"
          onClick={copy}
          title="Copy email address"
          aria-label={`${spelled}. Copy email address`}
          className="group inline-flex items-baseline gap-2 rounded-md text-left font-bold break-words text-accent-ink decoration-dotted underline-offset-4 hover:underline"
        >
          {spelled}
          {status === "copied" ? (
            <Check
              size={14}
              weight="bold"
              aria-hidden
              className="shrink-0 self-center"
            />
          ) : (
            <Copy
              size={14}
              weight="bold"
              aria-hidden
              className="shrink-0 self-center opacity-50 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          )}
        </button>
      </p>
      <p role="status" className="mt-2 min-h-4 text-xs text-text-muted">
        {status === "copied" && "Copied to your clipboard."}
        {status === "failed" && "Couldn't copy. Select the address instead."}
      </p>
    </div>
  );
}
