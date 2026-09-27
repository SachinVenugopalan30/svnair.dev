"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

type Status = "idle" | "copied" | "failed";

// Receives the spelled-out form ("name at host dot me") so the real address
// never appears in the HTML. It is rebuilt only when the button is clicked.
export default function CopyEmail({ spelled }: { spelled: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(t);
  }, [status]);

  async function copy() {
    const address = spelled.replace(/ at /g, "@").replace(/ dot /g, ".");
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
      <p className="text-sm break-words text-text sm:text-base">{spelled}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
        >
          {status === "copied" ? (
            <Check size={16} weight="bold" aria-hidden />
          ) : (
            <Copy size={16} weight="bold" aria-hidden />
          )}
          {status === "copied" ? "Copied" : "Copy email"}
        </button>
        <span role="status" className="text-xs text-text-muted">
          {status === "copied" && "Email address copied to your clipboard."}
          {status === "failed" &&
            "Couldn't copy. Select the address above instead."}
        </span>
      </div>
    </div>
  );
}
