import { Bot, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import amiAvatar from "@/assets/ami-logo-round.png";
import { cn } from "@/lib/utils";

export type AmiInsightProps = {
  title: string;
  body: string;
  tag?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  className?: string;
};

/**
 * Holographic AMI helper card — reused on the dashboard, empty states,
 * loot/analytics pages. AMI supports the UI, not dominates it.
 */
export function AmiInsight({
  title,
  body,
  tag,
  primaryCta,
  secondaryCta,
  className,
}: AmiInsightProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl glass-strong glow-border p-4 md:p-5",
        className,
      )}
    >
      <div
        className="absolute -top-20 -right-16 h-48 w-48 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-arcane)" }}
        aria-hidden
      />
      <div className="relative flex gap-4">
        <div className="shrink-0">
          <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-xl overflow-hidden glow-border">
            <img
              src={amiAvatar}
              alt="AMI"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-1 left-1 right-1 flex items-center gap-1 text-[9px] uppercase tracking-wider text-foreground/90">
              <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_6px_currentColor]" />
              AMI
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.18em] text-primary inline-flex items-center gap-1.5">
              <Bot className="h-3 w-3" /> {title}
            </span>
            {tag && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold/90 glass rounded-full px-2 py-0.5">
                <ShieldCheck className="h-3 w-3" /> {tag}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{body}</p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {primaryCta && (
                <Link
                  to={primaryCta.to}
                  className="inline-flex items-center gap-1 text-xs font-medium glass-strong glow-border rounded-full px-3 py-1.5 hover:text-foreground"
                >
                  {primaryCta.label} <ArrowRight className="h-3 w-3" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  to={secondaryCta.to}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground glass rounded-full px-3 py-1.5"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Small floating holographic chip — used to decorate hero areas
 * with AMI's market signals without dominating the layout.
 */
export function HoloChip({
  label,
  hint,
  icon: Icon,
  className,
}: {
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-strong glow-border rounded-xl px-3 py-2 backdrop-blur-md flex items-center gap-2.5 min-w-[180px]",
        className,
      )}
    >
      <div className="h-7 w-7 rounded-md glass grid place-items-center shrink-0">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-medium leading-tight">{label}</div>
        <div className="text-[10px] text-muted-foreground truncate">{hint}</div>
      </div>
    </div>
  );
}