import { ArrowDown, ArrowUp, LucideIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { AskAmiLink } from "./AmiCompanion";

export function PageHeader({
  title,
  subtitle,
  actions,
  amiIntent,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  /** When set, renders a small "Ask AMI / Explain this page" pill next to actions. */
  amiIntent?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {(actions || amiIntent) && (
        <div className="flex items-center gap-2">
          {amiIntent && (
            <AskAmiLink
              intent={amiIntent}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full glass glow-border text-xs hover:text-primary"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t("assistant.companion.askAboutPage")}
            </AskAmiLink>
          )}
          {actions}
        </div>
      )}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: LucideIcon;
  accent?: "primary" | "accent" | "gold" | "success" | "destructive";
}) {
  const accentMap: Record<string, string> = {
    primary: "text-primary",
    accent: "text-accent",
    gold: "text-gold",
    success: "text-success",
    destructive: "text-destructive",
  };
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-30 blur-2xl"
        style={{ background: "var(--gradient-arcane)" }} />
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </div>
        {Icon && <Icon className={cn("h-4 w-4", accentMap[accent])} />}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      {delta && (
        <div
          className={cn(
            "mt-1 inline-flex items-center gap-1 text-xs",
            trend === "up" && "text-success",
            trend === "down" && "text-destructive",
            trend === "flat" && "text-muted-foreground",
          )}
        >
          {trend === "up" && <ArrowUp className="h-3 w-3" />}
          {trend === "down" && <ArrowDown className="h-3 w-3" />}
          {delta}
        </div>
      )}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("glass rounded-2xl p-5", className)}>
      {(title || action) && (
        <header className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
          )}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "primary" | "gold";
}) {
  const toneMap: Record<string, string> = {
    default: "bg-muted/40 text-muted-foreground border-border",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    danger: "bg-destructive/15 text-destructive border-destructive/30",
    primary: "bg-primary/15 text-primary border-primary/30",
    gold: "bg-gold/15 text-gold border-gold/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-[0.14em] border",
        toneMap[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Lightweight inline SVG line chart — no chart deps. */
export function Sparkline({
  data,
  color = "var(--primary)",
  height = 60,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const w = 100;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const id = `g-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,${h} ${points} ${w},${h}`} fill={`url(#${id})`} stroke="none" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Multi-line chart used on dashboard / analytics. */
export function MultiLineChart({
  series,
  height = 240,
}: {
  series: { name: string; color: string; data: number[] }[];
  height?: number;
}) {
  const w = 600;
  const h = height;
  const all = series.flatMap((s) => s.data);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const grid = 4;
  return (
    <div className="relative w-full" style={{ height }}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: grid + 1 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2={w}
            y1={(i / grid) * h}
            y2={(i / grid) * h}
            stroke="var(--border)"
            strokeDasharray="2 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {series.map((s, idx) => {
          const pts = s.data
            .map((v, i) => {
              const x = (i / (s.data.length - 1)) * w;
              const y = h - ((v - min) / range) * h;
              return `${x},${y}`;
            })
            .join(" ");
          return (
            <polyline
              key={idx}
              points={pts}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ filter: `drop-shadow(0 0 6px ${s.color})` }}
            />
          );
        })}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-muted-foreground px-1">
        {["00:00","04:00","08:00","12:00","16:00","20:00","24:00"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/** Horizontal bar — useful for profession / category breakdowns. */
export function BarRow({
  label, value, max, tone = "primary", suffix,
}: { label: string; value: number; max: number; tone?: "primary" | "success" | "danger" | "gold"; suffix?: string }) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100));
  const toneMap: Record<string, string> = {
    primary: "from-primary to-accent",
    success: "from-success to-success/40",
    danger: "from-destructive to-destructive/40",
    gold: "from-gold to-gold/40",
  };
  return (
    <div className="flex items-center gap-3 text-xs">
      <div className="w-28 truncate text-muted-foreground">{label}</div>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full bg-gradient-to-r", toneMap[tone])} style={{ width: `${pct}%` }} />
      </div>
      <div className="w-16 text-right font-medium">{value}{suffix ?? ""}</div>
    </div>
  );
}

/** Compact data table used across analytics & signals. */
export function DataTable<T extends Record<string, React.ReactNode>>({
  columns, rows, dense,
}: {
  columns: { key: keyof T & string; label: string; align?: "left" | "right" | "center"; className?: string }[];
  rows: T[];
  dense?: boolean;
}) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {columns.map((c) => (
              <th key={c.key} className={cn("px-2 py-2 font-normal", c.align === "right" && "text-right", c.align === "center" && "text-center", c.className)}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border/40 hover:bg-sidebar-accent/30 transition-colors">
              {columns.map((c) => (
                <td key={c.key} className={cn(dense ? "px-2 py-1.5" : "px-2 py-2.5", c.align === "right" && "text-right", c.align === "center" && "text-center", c.className)}>
                  {r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Live activity ticker — scrolling intelligence feed. */
export function LiveTicker({ items }: { items: { tone: "success" | "danger" | "primary" | "gold"; text: string; meta?: string }[] }) {
  const toneMap = {
    success: "text-success",
    danger: "text-destructive",
    primary: "text-primary",
    gold: "text-gold",
  } as const;
  return (
    <div className="relative overflow-hidden glass rounded-xl border border-border/60 py-2">
      <div className="flex gap-8 whitespace-nowrap animate-[ticker_60s_linear_infinite]">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs">
            <span className={cn("h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]", toneMap[it.tone])} style={{ background: "currentColor" }} />
            <span className="font-medium">{it.text}</span>
            {it.meta && <span className="text-muted-foreground">· {it.meta}</span>}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/** Shared region/realm/faction selector pill — used in headers across /app pages. */
export function SelectorChip({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: string[];
}) {
  return (
    <label className="glass rounded-md px-2.5 py-1.5 inline-flex items-center gap-2 cursor-pointer">
      <span className="text-muted-foreground text-[10px] uppercase tracking-wider">{label}</span>
      <select
        defaultValue={value}
        className="bg-transparent text-foreground text-xs outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-card">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Inline tab strip used across signals/forecast/analytics. */
export function TabStrip<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: T; label: string; icon?: LucideIcon }[];
  active: T;
  onChange?: (k: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            onClick={() => onChange?.(t.key)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors",
              isActive
                ? "bg-primary/20 text-primary glow-border"
                : "glass text-muted-foreground hover:text-foreground",
            )}
          >
            {t.icon && <t.icon className="h-3.5 w-3.5" />}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/** Small status pill — Live / Demo / Planned / Beta — used across pages. */
export function StatusPill({
  status,
  hint,
}: {
  status: "live" | "demo" | "planned" | "beta";
  hint?: string;
}) {
  const { t } = useTranslation();
  const map = {
    live:    { tone: "success" as const, label: t("status.live") },
    demo:    { tone: "primary" as const, label: t("status.demo") },
    planned: { tone: "default" as const, label: t("status.planned") },
    beta:    { tone: "gold"    as const, label: t("status.beta") },
  };
  const m = map[status];
  return (
    <span className="inline-flex items-center gap-2">
      <Badge tone={m.tone}>
        <span className={cn(
          "h-1.5 w-1.5 rounded-full mr-1 shadow-[0_0_6px_currentColor]",
          status === "live" && "bg-success",
          status === "demo" && "bg-primary",
          status === "planned" && "bg-muted-foreground",
          status === "beta" && "bg-gold",
        )} />
        {m.label}
      </Badge>
      {hint && <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{hint}</span>}
    </span>
  );
}
