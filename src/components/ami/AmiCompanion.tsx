import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Bot, PanelRightOpen, PanelRightClose, EyeOff, RotateCcw, MessageSquare, Sparkles, ChevronRight, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AmiCompanion — UI scaffold for the future 3D AMI assistant.
 *
 * This component intentionally does NOT load a real 3D model. It defines the
 * layout, controls, states and UX rules so the real GLB asset
 * (ami_assistant_web_ready_current_best.glb) can be plugged into <ModelStage />
 * later without touching the rest of the product UI.
 *
 * Modes:
 *  - "hidden"   → only a small launcher button bottom-right.
 *  - "floating" → non-blocking card bottom-right with the 3D stage on top
 *                 and a compact "Ask AMI" rail underneath. Never overlaps
 *                 the sidebar; sits on top of empty whitespace only.
 *  - "docked"   → right-side rail (lg+) that the AppShell offsets for, so it
 *                 never covers tables, charts, filters or modals.
 *
 * Mobile: collapses to the launcher button only (no floating card),
 * tap → routes to /app/assistant.
 */

export type AmiMode = "hidden" | "floating" | "docked";
const STORAGE_KEY = "ami.companion.mode";

export function useAmiCompanion() {
  const [mode, setMode] = useState<AmiMode>("floating");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as AmiMode | null;
      if (saved === "hidden" || saved === "floating" || saved === "docked") setMode(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, mode); } catch {}
  }, [mode]);
  return { mode, setMode };
}

/* ------------------------------------------------------------------
 * 3D MODEL INTEGRATION NOTES (FOR CODEX — internal only)
 * ------------------------------------------------------------------
 * Asset:        ami_assistant_web_ready_current_best.glb
 * Mount target: <div data-ami-3d-mount="..."> inside <ModelStage />
 *
 * Acceptable runtime implementations:
 *   1) <model-viewer> web component (lightest, no React tree changes)
 *   2) React Three Fiber canvas (more control, heavier)
 *
 * Rules:
 *   - Reuse the existing wrapper sizing (sm/md/lg) and the rounded-xl frame.
 *   - Keep z-index rules: companion stays z-20..30, modals z-50 must win.
 *   - Only ONE heavy canvas alive at a time. If both floating and docked
 *     stages mount briefly (transition), reuse a single offscreen renderer.
 *   - No skeletal walking until the rig + animation clips ship.
 *     First integration must support IDLE / soft HOVER breathing only.
 *   - Stream the GLB lazily (dynamic import / suspense), never block route.
 * ------------------------------------------------------------------ */

/** Placeholder stage where the real <model-viewer> / R3F canvas will mount. */
function ModelStage({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { t } = useTranslation();
  const h = size === "lg" ? "h-56" : size === "md" ? "h-40" : "h-28";
  return (
    <div
      className={cn(
        "relative w-full rounded-xl overflow-hidden glass glow-border",
        h,
      )}
      data-ami-3d-mount="ami_assistant_web_ready_current_best.glb"
      aria-label="AMI 3D model stage"
    >
      {/* Holographic backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/20" />
      <div className="absolute -inset-12 opacity-60 blur-3xl bg-[radial-gradient(circle_at_50%_60%,oklch(0.78_0.20_295/0.35),transparent_60%)]" />
      {/* Idle silhouette — replaced by GLB later */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative animate-[pulse_3.6s_ease-in-out_infinite]">
          <div className="h-20 w-20 rounded-full bg-gradient-to-b from-primary/40 to-accent/30 grid place-items-center glow-border">
            <Bot className="h-9 w-9 text-primary drop-shadow-[0_0_12px_currentColor]" />
          </div>
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_currentColor]" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-primary/40 blur-[2px]" />
        </div>
      </div>
      {/* Pending model badge */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full glass">
          <Sparkles className="h-3 w-3 text-primary" /> {t("assistant.companion.modelPending")}
        </span>
        <span className="truncate ml-2 hidden sm:inline">{t("assistant.companion.modelPendingHint")}</span>
      </div>
    </div>
  );
}

function CompanionControls({ mode, setMode }: { mode: AmiMode; setMode: (m: AmiMode) => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-1 text-[11px]">
      <button
        onClick={() => setMode(mode === "docked" ? "floating" : "docked")}
        className="h-7 px-2 rounded-md glass hover:bg-sidebar-accent/60 inline-flex items-center gap-1.5"
        title={mode === "docked" ? t("assistant.companion.float") : t("assistant.companion.dock")}
      >
        {mode === "docked"
          ? <><PanelRightClose className="h-3.5 w-3.5 text-primary" /> {t("assistant.companion.float")}</>
          : <><PanelRightOpen className="h-3.5 w-3.5 text-primary" /> {t("assistant.companion.dock")}</>}
      </button>
      <button
        onClick={() => setMode("floating")}
        className="h-7 w-7 rounded-md glass hover:bg-sidebar-accent/60 grid place-items-center"
        title={t("assistant.companion.returnHome")}
        aria-label={t("assistant.companion.returnHome")}
      >
        <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      <button
        onClick={() => setMode("hidden")}
        className="h-7 w-7 rounded-md glass hover:bg-sidebar-accent/60 grid place-items-center"
        title={t("assistant.companion.hide")}
        aria-label={t("assistant.companion.hide")}
      >
        <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Route-aware content
 * ------------------------------------------------------------------ */

type RouteAmi = {
  summaryKey: string;
  actions: { labelKey: string; to: string; intent?: string }[];
};

const ROUTE_AMI: { match: (p: string) => boolean; data: RouteAmi }[] = [
  { match: (p) => p === "/app",                data: { summaryKey: "assistant.companion.route.overview",  actions: [
      { labelKey: "assistant.companion.action.openSignals",  to: "/app/signals" },
      { labelKey: "assistant.companion.action.askToday",     to: "/app/assistant", intent: "explain_page" },
      { labelKey: "assistant.companion.action.openSources",  to: "/app/settings" },
    ] } },
  { match: (p) => p.startsWith("/app/signals"),    data: { summaryKey: "assistant.companion.route.signals", actions: [
      { labelKey: "assistant.companion.askAboutSignal", to: "/app/assistant", intent: "explain_signal" },
      { labelKey: "assistant.companion.action.openWatchlist", to: "/app/watchlist" },
    ] } },
  { match: (p) => p.startsWith("/app/watchlist"),  data: { summaryKey: "assistant.companion.route.watchlist", actions: [
      { labelKey: "assistant.companion.action.openSignals", to: "/app/signals" },
      { labelKey: "assistant.companion.action.openAnalytics", to: "/app/analytics" },
    ] } },
  { match: (p) => p.startsWith("/app/analytics"),  data: { summaryKey: "assistant.companion.route.analytics", actions: [
      { labelKey: "assistant.companion.askAboutItem", to: "/app/assistant", intent: "explain_item" },
      { labelKey: "assistant.companion.action.openWatchlist", to: "/app/watchlist" },
    ] } },
  { match: (p) => p.startsWith("/app/compare"),    data: { summaryKey: "assistant.companion.route.compare", actions: [
      { labelKey: "assistant.companion.askAboutItem", to: "/app/assistant", intent: "explain_item" },
      { labelKey: "assistant.companion.action.openAnalytics", to: "/app/analytics" },
    ] } },
  { match: (p) => p.startsWith("/app/realms"),     data: { summaryKey: "assistant.companion.route.realms", actions: [
      { labelKey: "assistant.companion.action.openSignals", to: "/app/signals" },
      { labelKey: "assistant.companion.action.openProfessions", to: "/app/professions" },
    ] } },
  { match: (p) => p.startsWith("/app/professions"),data: { summaryKey: "assistant.companion.route.professions", actions: [
      { labelKey: "assistant.companion.askAboutSignal", to: "/app/assistant", intent: "explain_profession" },
      { labelKey: "assistant.companion.action.openSignals", to: "/app/signals" },
    ] } },
  { match: (p) => p.startsWith("/app/forecast"),   data: { summaryKey: "assistant.companion.route.forecast", actions: [
      { labelKey: "assistant.companion.askAboutSignal", to: "/app/assistant", intent: "explain_forecast" },
      { labelKey: "assistant.companion.action.openSignals", to: "/app/signals" },
    ] } },
  { match: (p) => p.startsWith("/app/assistant"),  data: { summaryKey: "assistant.companion.route.assistant", actions: [
      { labelKey: "assistant.companion.action.askToday", to: "/app/assistant", intent: "explain_page" },
      { labelKey: "assistant.companion.action.openSignals", to: "/app/signals" },
    ] } },
  { match: (p) => p.startsWith("/app/loot"),       data: { summaryKey: "assistant.companion.route.loot", actions: [
      { labelKey: "assistant.companion.action.openAnalytics", to: "/app/analytics" },
      { labelKey: "assistant.companion.askAboutItem", to: "/app/assistant", intent: "explain_loot" },
    ] } },
  { match: (p) => p.startsWith("/app/discord"),    data: { summaryKey: "assistant.companion.route.discord", actions: [
      { labelKey: "assistant.companion.askAboutSignal", to: "/app/assistant", intent: "explain_discord" },
      { labelKey: "assistant.companion.action.openSignals", to: "/app/signals" },
    ] } },
  { match: (p) => p.startsWith("/app/news"),       data: { summaryKey: "assistant.companion.route.news", actions: [
      { labelKey: "assistant.companion.action.openForecast", to: "/app/forecast" },
    ] } },
  { match: (p) => p.startsWith("/app/streams"),    data: { summaryKey: "assistant.companion.route.streams", actions: [] } },
  { match: (p) => p.startsWith("/app/partners"),   data: { summaryKey: "assistant.companion.route.partners", actions: [
      { labelKey: "assistant.companion.action.openPricing", to: "/app/pricing" },
    ] } },
  { match: (p) => p.startsWith("/app/pricing"),    data: { summaryKey: "assistant.companion.route.pricing", actions: [
      { labelKey: "assistant.companion.action.openPricing", to: "/app/pricing" },
    ] } },
  { match: (p) => p.startsWith("/app/settings"),   data: { summaryKey: "assistant.companion.route.settings", actions: [
      { labelKey: "assistant.companion.action.checkSources", to: "/app/settings" },
    ] } },
  { match: (p) => p.startsWith("/app/admin"),      data: { summaryKey: "assistant.companion.route.admin", actions: [
      { labelKey: "assistant.companion.action.viewAdmin", to: "/app/admin" },
    ] } },
];

function useRouteAmi(): RouteAmi {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const hit = ROUTE_AMI.find((r) => r.match(path));
  return hit?.data ?? { summaryKey: "assistant.companion.route.default", actions: [] };
}

/**
 * Type-safe wrapper to navigate to /app/assistant with an "intent" + "topic"
 * search context. The assistant route declares matching validateSearch, so
 * Codex can later read this in a real handler and route to a structured
 * answer card. Here it is purely UI-state and decoration.
 */
export function AskAmiLink({
  intent,
  topic,
  className,
  children,
}: {
  intent: string;
  topic?: string;
  className?: string;
  children: React.ReactNode;
}) {
  // Cast search because TanStack Router's typed search differs per project setup.
  const search = { intent, ...(topic ? { topic } : {}) } as never;
  return (
    <Link to="/app/assistant" search={search} className={className}>
      {children}
    </Link>
  );
}

function AskRail() {
  const { t } = useTranslation();
  const route = useRouteAmi();
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-9 rounded-lg bg-input/40 border border-border px-3 text-xs text-muted-foreground inline-flex items-center truncate">
          {t("assistant.companion.askPlaceholder")}
        </div>
        <AskAmiLink
          intent="explain_page"
          className="h-9 px-3 rounded-lg glow bg-primary/90 hover:bg-primary text-primary-foreground text-xs inline-flex items-center gap-1.5"
        >
          <MessageSquare className="h-3.5 w-3.5" /> {t("assistant.companion.ask")}
        </AskAmiLink>
      </div>
      <div className="mt-2 text-[10px] text-muted-foreground">
        {t("assistant.companion.respectsLayout")}
      </div>
      {route.actions.length > 0 && (
        <ul className="mt-2 space-y-1">
          {route.actions.map((a) =>
            a.intent ? (
              <li key={a.labelKey}>
                <AskAmiLink
                  intent={a.intent}
                  className="flex items-center justify-between gap-2 text-[11px] glass rounded-md px-2 py-1.5 hover:text-primary"
                >
                  <span className="truncate">{t(a.labelKey)}</span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </AskAmiLink>
              </li>
            ) : (
              <li key={a.labelKey}>
                <Link
                  to={a.to}
                  className="flex items-center justify-between gap-2 text-[11px] glass rounded-md px-2 py-1.5 hover:text-primary"
                >
                  <span className="truncate">{t(a.labelKey)}</span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </Link>
              </li>
            )
          )}
        </ul>
      )}
      <div className="mt-2 text-[10px] text-muted-foreground inline-flex items-start gap-1.5">
        <ShieldAlert className="h-3 w-3 mt-0.5 text-warning shrink-0" />
        <span>{t("assistant.companion.manualReviewNote")}</span>
      </div>
    </div>
  );
}

/** Bottom-right launcher used in hidden mode and on mobile. */
export function AmiLauncher({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-30 h-12 w-12 rounded-full glass-strong glow-border grid place-items-center hover:scale-105 transition-transform"
      title={t("assistant.companion.show")}
      aria-label={t("assistant.companion.show")}
    >
      <Bot className="h-5 w-5 text-primary" />
      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success shadow-[0_0_8px_currentColor]" />
    </button>
  );
}

/** Floating card — bottom-right, never covers the sidebar or main content. */
function FloatingCompanion({ mode, setMode }: { mode: AmiMode; setMode: (m: AmiMode) => void }) {
  const { t } = useTranslation();
  const route = useRouteAmi();
  return (
    <div
      className="hidden lg:block fixed bottom-4 right-4 z-30 w-[300px] glass-strong rounded-2xl border border-border p-3 shadow-2xl animate-fade-in"
      role="complementary"
      aria-label={t("assistant.companion.presence")}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="min-w-0">
          <div className="text-xs font-medium truncate">{t("assistant.companion.presence")}</div>
          <div className="text-[10px] text-muted-foreground truncate">{t("assistant.companion.presenceHint")}</div>
        </div>
        <CompanionControls mode={mode} setMode={setMode} />
      </div>
      <ModelStage size="md" />
      <div className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
        {t(route.summaryKey)}
      </div>
      <AskRail />
    </div>
  );
}

/** Docked rail — right side on lg+. AppShell adds matching padding so it never covers content. */
function DockedCompanion({ mode, setMode }: { mode: AmiMode; setMode: (m: AmiMode) => void }) {
  const { t } = useTranslation();
  const route = useRouteAmi();
  return (
    <aside
      className="hidden lg:flex fixed right-0 top-16 bottom-0 z-20 w-80 flex-col gap-3 p-4 glass-strong border-l border-border animate-slide-in-right overflow-y-auto"
      aria-label={t("assistant.companion.presence")}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{t("assistant.companion.presence")}</div>
          <div className="text-[10px] text-muted-foreground">{t("assistant.companion.presenceHint")}</div>
        </div>
        <CompanionControls mode={mode} setMode={setMode} />
      </div>
      <ModelStage size="lg" />
      <div className="text-xs text-muted-foreground leading-relaxed">
        {t(route.summaryKey)}
      </div>
      <div className="mt-auto">
        <AskRail />
        <AskAmiLink
          intent="explain_page"
          className="mt-2 block text-center text-[11px] text-primary hover:underline"
        >
          {t("assistant.companion.openAssistant")} →
        </AskAmiLink>
      </div>
    </aside>
  );
}

/** Mobile-only floating button. */
function MobileCompanion() {
  const { t } = useTranslation();
  return (
    <Link
      to="/app/assistant"
      className="lg:hidden fixed bottom-4 right-4 z-30 h-12 w-12 rounded-full glass-strong glow-border grid place-items-center"
      title={t("assistant.companion.mobileTip")}
      aria-label={t("assistant.companion.mobileTip")}
    >
      <Bot className="h-5 w-5 text-primary" />
    </Link>
  );
}

export function AmiCompanion({ mode, setMode }: { mode: AmiMode; setMode: (m: AmiMode) => void }) {
  return (
    <>
      <MobileCompanion />
      {mode === "hidden" && <AmiLauncher onClick={() => setMode("floating")} />}
      {mode === "floating" && <FloatingCompanion mode={mode} setMode={setMode} />}
      {mode === "docked" && <DockedCompanion mode={mode} setMode={setMode} />}
    </>
  );
}