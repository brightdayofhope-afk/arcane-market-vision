import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Bot, PanelRightOpen, PanelRightClose, Eye, EyeOff, RotateCcw, MessageSquare, Sparkles } from "lucide-react";
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

function AskRail() {
  const { t } = useTranslation();
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-9 rounded-lg bg-input/40 border border-border px-3 text-xs text-muted-foreground inline-flex items-center truncate">
          {t("assistant.companion.askPlaceholder")}
        </div>
        <Link
          to="/app/assistant"
          className="h-9 px-3 rounded-lg glow bg-primary/90 hover:bg-primary text-primary-foreground text-xs inline-flex items-center gap-1.5"
        >
          <MessageSquare className="h-3.5 w-3.5" /> {t("assistant.companion.ask")}
        </Link>
      </div>
      <div className="mt-2 text-[10px] text-muted-foreground">
        {t("assistant.companion.respectsLayout")}
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
        {t("assistant.companion.summary")}
      </div>
      <AskRail />
    </div>
  );
}

/** Docked rail — right side on lg+. AppShell adds matching padding so it never covers content. */
function DockedCompanion({ mode, setMode }: { mode: AmiMode; setMode: (m: AmiMode) => void }) {
  const { t } = useTranslation();
  return (
    <aside
      className="hidden lg:flex fixed right-0 top-16 bottom-0 z-20 w-80 flex-col gap-3 p-4 glass-strong border-l border-border animate-slide-in-right"
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
        {t("assistant.companion.summary")}
      </div>
      <div className="mt-auto">
        <AskRail />
        <Link
          to="/app/assistant"
          className="mt-2 block text-center text-[11px] text-primary hover:underline"
        >
          {t("assistant.companion.openAssistant")} →
        </Link>
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