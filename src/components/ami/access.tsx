import { Lock, Sparkles, ShieldCheck, Crown, Database, MessageSquare, Bot, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./widgets";
import type { ReactNode } from "react";

/** Plan badge — Guest / Beta / Founder / Premium / Admin. */
export type Plan = "guest" | "beta" | "founder" | "premium" | "admin";

export function PlanBadge({ plan, className }: { plan: Plan; className?: string }) {
  const map: Record<Plan, { label: string; tone: "default" | "primary" | "gold" | "success" | "danger"; icon: typeof Crown }> = {
    guest:    { label: "Guest",    tone: "default", icon: ShieldCheck },
    beta:     { label: "Free Beta", tone: "primary", icon: Sparkles },
    founder:  { label: "Founder",  tone: "gold",    icon: Crown },
    premium:  { label: "Premium",  tone: "gold",    icon: Crown },
    admin:    { label: "Admin",    tone: "danger",  icon: ShieldCheck },
  };
  const m = map[plan];
  return (
    <span className={cn("inline-flex", className)}>
      <Badge tone={m.tone}>
        <m.icon className="h-3 w-3 mr-1" />
        {m.label}
      </Badge>
    </span>
  );
}

/** Wraps premium content with a tasteful locked overlay. */
export function AccessLock({
  level = "founder",
  reason = "Founder access planned",
  cta = "Join early access",
  to = "/app/pricing",
  blur = "md",
  children,
}: {
  level?: "founder" | "premium" | "admin" | "backend" | "soon";
  reason?: string;
  cta?: string;
  to?: string;
  blur?: "sm" | "md" | "lg";
  children: ReactNode;
}) {
  const labelMap = {
    founder: "Founder access",
    premium: "Premium later",
    admin:   "Admin only",
    backend: "Backend required",
    soon:    "Coming soon",
  };
  const blurMap = { sm: "blur-sm", md: "blur-md", lg: "blur-lg" } as const;
  return (
    <div className="relative">
      <div className={cn(blurMap[blur], "pointer-events-none select-none opacity-60")} aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="glass-strong rounded-2xl px-5 py-4 text-center max-w-sm glow-border">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            <Lock className="h-3 w-3" /> {labelMap[level]}
          </div>
          <div className="text-sm font-medium leading-snug">{reason}</div>
          <a
            href={to}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:text-foreground"
          >
            {cta} →
          </a>
        </div>
      </div>
    </div>
  );
}

/** Single small data-source row. */
export type SourceStatus = "live" | "stale" | "demo" | "planned" | "error";

export function DataSourceStatus({
  rows,
  className,
}: {
  rows: { name: string; kind: "auctionator" | "tsm" | "addon" | "discord" | "ami"; status: SourceStatus; hint?: string }[];
  className?: string;
}) {
  const iconMap = {
    auctionator: Database,
    tsm:         Database,
    addon:       Database,
    discord:     MessageSquare,
    ami:         Bot,
  };
  const statusMap: Record<SourceStatus, { tone: "success" | "warning" | "primary" | "default" | "danger"; label: string; icon: typeof CheckCircle2 }> = {
    live:    { tone: "success", label: "Live",         icon: CheckCircle2 },
    stale:   { tone: "warning", label: "Stale",        icon: RefreshCw },
    demo:    { tone: "primary", label: "Demo",         icon: Sparkles },
    planned: { tone: "default", label: "Planned",      icon: ShieldCheck },
    error:   { tone: "danger",  label: "Error",        icon: AlertTriangle },
  };
  return (
    <ul className={cn("space-y-1.5", className)}>
      {rows.map((r) => {
        const Icon = iconMap[r.kind];
        const s = statusMap[r.status];
        const SIcon = s.icon;
        return (
          <li key={r.name} className="flex items-center gap-2.5 glass rounded-lg px-2.5 py-1.5 text-xs">
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{r.name}</span>
            {r.hint && <span className="text-muted-foreground truncate">· {r.hint}</span>}
            <span className="ml-auto">
              <Badge tone={s.tone}>
                <SIcon className="h-3 w-3 mr-1" />
                {s.label}
              </Badge>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Risk meter — 0–100. */
export function RiskMeter({ value, label = "Risk" }: { value: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const tone = v < 33 ? "success" : v < 66 ? "warning" : "danger";
  const toneClass = {
    success:  "from-success/80 to-success/30",
    warning:  "from-warning/80 to-warning/30",
    danger:   "from-destructive/80 to-destructive/30",
  }[tone];
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className={cn(
          tone === "success" && "text-success",
          tone === "warning" && "text-warning",
          tone === "danger"  && "text-destructive",
        )}>{v}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full bg-gradient-to-r", toneClass)} style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}

/** Confidence bar — 0–100 with semantic color. */
export function ConfidenceBar({ value, label = "Confidence" }: { value: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className="text-primary">{v}%</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}