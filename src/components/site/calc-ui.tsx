import { Check, Copy, Info, TriangleAlert } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useFilerStatus } from "@/lib/filer-status";
import { DISCLAIMER, formatPKR, type FilerStatus } from "@/lib/taxRates";
import { cn } from "@/lib/utils";

/* ---------------------------------- Toggle -------------------------------- */

export function FilerToggle({ sticky = true }: { sticky?: boolean }) {
  const { status, setStatus } = useFilerStatus();
  const options: { value: FilerStatus; label: string }[] = [
    { value: "filer", label: "Filer (on ATL)" },
    { value: "non-filer", label: "Non-Filer" },
  ];

  return (
    <div
      className={cn(
        "z-30 border-b border-border bg-background/95 backdrop-blur",
        sticky && "sticky top-[61px]",
      )}
    >
      <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 sm:flex sm:justify-between">
        <p className="min-w-0 truncate text-xs font-medium text-muted-foreground">
          Your tax status
        </p>
        <div className="flex shrink-0 rounded-lg bg-secondary p-1">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setStatus(o.value)}
              aria-pressed={status === o.value}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                status === o.value
                  ? o.value === "filer"
                    ? "bg-primary text-primary-foreground"
                    : "bg-alert text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Fields --------------------------------- */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function AmountInput({
  value,
  onChange,
  prefix = "Rs.",
  placeholder = "0",
}: {
  value: number | "";
  onChange: (v: number | "") => void;
  prefix?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-input bg-card focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/25">
      <span className="px-3 text-sm font-semibold text-muted-foreground">{prefix}</span>
      <input
        inputMode="numeric"
        type="text"
        value={value === "" ? "" : new Intl.NumberFormat("en-PK").format(value)}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^\d]/g, "");
          onChange(raw === "" ? "" : Number(raw));
        }}
        className="num w-full bg-transparent py-3.5 pr-4 text-lg font-semibold text-ink outline-none"
      />
    </div>
  );
}

export function OptionGroup<T extends string>({
  value,
  onChange,
  options,
  columns = 2,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  columns?: number;
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${Math.min(columns, 2)}, minmax(0,1fr))` }}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={cn(
            "rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
            value === o.value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-input bg-card text-ink hover:bg-secondary",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SelectInput<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full rounded-xl border border-input bg-card px-4 py-3.5 text-base font-medium text-ink outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/* --------------------------------- Results -------------------------------- */

export function CopyResult({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Filer Tax PK result", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-input bg-card px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-secondary sm:w-auto"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied" : "Copy / share result"}
    </button>
  );
}

export function ComparisonResult({
  filerAmount,
  nonFilerAmount,
  filerNote,
  nonFilerNote,
  caption,
  copyText,
}: {
  filerAmount: number;
  nonFilerAmount: number;
  filerNote?: string;
  nonFilerNote?: string;
  caption?: string;
  copyText: string;
}) {
  const { status } = useFilerStatus();
  const diff = nonFilerAmount - filerAmount;

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div
          className={cn(
            "rounded-2xl border p-5",
            status === "filer" ? "border-primary bg-accent" : "border-border bg-card",
          )}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Filer (ATL)</p>
          <p className="num mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            {formatPKR(filerAmount)}
          </p>
          {filerNote ? <p className="mt-2 text-xs text-muted-foreground">{filerNote}</p> : null}
        </div>

        <div
          className={cn(
            "rounded-2xl border p-5",
            status === "non-filer" ? "border-alert bg-alert-soft" : "border-border bg-card",
          )}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-alert">Non-Filer</p>
          <p className="num mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            {formatPKR(nonFilerAmount)}
          </p>
          {nonFilerNote ? (
            <p className="mt-2 text-xs text-muted-foreground">{nonFilerNote}</p>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl gradient-deep p-5 text-primary-foreground">
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">
          Extra tax a non-filer pays
        </p>
        <p className="num mt-1 font-display text-3xl font-bold text-gold sm:text-4xl">
          {formatPKR(diff)}
        </p>
        {caption ? <p className="mt-2 text-sm opacity-85">{caption}</p> : null}
      </div>

      <CopyResult text={copyText} />
    </div>
  );
}

export function SingleResult({
  label,
  amount,
  caption,
  copyText,
}: {
  label: string;
  amount: number;
  caption?: string;
  copyText: string;
}) {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl gradient-deep p-6 text-primary-foreground">
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">{label}</p>
        <p className="num mt-1 font-display text-3xl font-bold text-gold sm:text-4xl">
          {formatPKR(amount)}
        </p>
        {caption ? <p className="mt-2 text-sm opacity-85">{caption}</p> : null}
      </div>
      <CopyResult text={copyText} />
    </div>
  );
}

/* ------------------------------ Content blocks ---------------------------- */

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn" | "good";
  title?: string;
  children: ReactNode;
}) {
  const tones = {
    info: "border-border bg-secondary text-ink",
    warn: "border-alert/40 bg-alert-soft text-ink",
    good: "border-primary/30 bg-accent text-ink",
  } as const;

  return (
    <div className={cn("rounded-2xl border p-5", tones[tone])}>
      {title ? (
        <p className="flex items-center gap-2 text-sm font-bold">
          {tone === "warn" ? <TriangleAlert size={16} /> : <Info size={16} />}
          {title}
        </p>
      ) : null}
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function CalcCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="surface-card min-w-0 p-5 sm:p-6">
      {title ? (
        <h2 className="mb-4 font-display text-lg font-bold text-ink">{title}</h2>
      ) : null}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5">{children}</div>
    </section>
  );
}

export function ExplainerGrid({
  items,
}: {
  items: { q: string; a: ReactNode }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((i) => (
        <div key={i.q} className="surface-card p-5">
          <h3 className="font-display text-sm font-bold text-ink">{i.q}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.a}</p>
        </div>
      ))}
    </div>
  );
}

export function RateTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: (string | number)[][];
  caption?: string;
}) {
  return (
    <div className="surface-card min-w-0 overflow-hidden">
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="bg-secondary text-left">
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 font-semibold text-ink">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border">
                {r.map((cell, j) => (
                  <td
                    key={j}
                    className={cn(
                      "num px-4 py-3",
                      j === 0 ? "font-medium text-ink" : "text-muted-foreground",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <p className="border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

export function DisclaimerNote() {
  return <p className="text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow ? (
        <p className="mb-2 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{intro}</p>
    </div>
  );
}
