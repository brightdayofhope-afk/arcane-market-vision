import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatusPill } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, BookOpen, Coins, Brain, Hammer, ShieldAlert, X, CheckCircle2, Radar, LineChart, Star, MessageSquare, ChevronRight } from "lucide-react";
import amiAvatar from "@/assets/ami-logo-round.png";
import amiAnalyticsPoster from "@/assets/ami-analytics-poster.png";
import { useTranslation } from "react-i18next";

const KNOWN_INTENTS = [
  "explain_page",
  "explain_signal",
  "explain_item",
  "explain_risk",
  "explain_discord",
  "explain_profession",
  "explain_forecast",
  "explain_loot",
] as const;
type AssistantIntent = (typeof KNOWN_INTENTS)[number];

export const Route = createFileRoute("/app/assistant")({
  head: () => ({ meta: [{ title: "AMI Assistant · AMI" }] }),
  validateSearch: (search: Record<string, unknown>) => {
    const intent = typeof search.intent === "string" && (KNOWN_INTENTS as readonly string[]).includes(search.intent)
      ? (search.intent as AssistantIntent)
      : undefined;
    const topic = typeof search.topic === "string" ? search.topic : undefined;
    return { intent, topic };
  },
  component: AssistantPage,
});

const messages = [
  { from: "ami", text: "Hello! I'm AMI, your arcane market assistant. Ask about an item, profession or signal." },
  { from: "user", text: "Why is Arcane Crystal spiking on Spineshatter?" },
  { from: "ami", text: "Volume on Arcane Crystal is up 38% over the last 24h, driven by Enchanting demand pre-patch. Avg price moved from 122g to 142g with low seller pressure (0.23). I'd watch the 160g threshold." },
];

function AssistantPage() {
  const { t } = useTranslation();
  const { intent, topic } = Route.useSearch();
  const messages = [
    { from: "ami",  text: t("assistant.greeting") },
    { from: "user", text: t("assistant.userQ") },
    { from: "ami",  text: t("assistant.amiReply") },
  ];
  const quick = [
    t("assistant.quick.explainRisky"),
    t("assistant.quick.findReagents"),
    t("assistant.quick.checkToday"),
    t("assistant.quick.compareLotus"),
    t("assistant.quick.alchemyFlips"),
  ];
  return (
    <div>
      <PageHeader
        title={t("assistant.title")}
        subtitle={t("assistant.subtitle")}
        actions={<StatusPill status="beta" hint={t("assistant.statusHint")} />}
      />

      {intent && (
        <Panel className="!p-3 mb-3 flex items-center gap-3 glow-border">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <div className="text-xs min-w-0">
            <div className="font-medium truncate">
              {t("assistant.companion.intentBanner", { label: t(`assistant.companion.intent.${intent}`) })}
            </div>
            {topic && (
              <div className="text-muted-foreground truncate">{topic}</div>
            )}
          </div>
          <Link
            to="/app/assistant"
            className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" /> {t("assistant.companion.intentClear")}
          </Link>
        </Panel>
      )}

      <div className="grid lg:grid-cols-[1fr_320px] gap-3">
        <Panel className="!p-0 overflow-hidden">
          <div className="relative h-32 sm:h-40 overflow-hidden border-b border-border">
            <img
              src={amiAnalyticsPoster}
              alt="AMI · Azeroth Market Intelligence"
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="relative h-9 w-9 rounded-full overflow-hidden glow-border">
              <img src={amiAvatar} alt="AMI" className="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
            <div>
              <div className="font-medium text-sm">AMI</div>
              <div className="text-[10px] text-success flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_6px_currentColor]" /> {t("assistant.online")}
              </div>
            </div>
            <span className="ml-auto"><Badge tone="primary">{t("header.contextBadge")}</Badge></span>
          </div>

          <div className="p-4 space-y-4 min-h-[420px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-primary/20 text-foreground glow-border" : "glass"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {quick.map((p) => (
              <button key={p} className="glass px-3 py-1.5 rounded-lg text-xs hover:text-primary">{p}</button>
            ))}
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <Input placeholder={t("assistant.inputPlaceholder")} className="bg-input/40 border-border h-10" />
            <Button className="glow"><Send className="h-4 w-4" /></Button>
          </div>
        </Panel>

        <div className="space-y-3">
          {intent && <StructuredAnswerCard intent={intent} topic={topic} />}
          <Panel title={t("assistant.itemContext")}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-bold">AC</div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{t("item.arcaneCrystal")}</div>
                <div className="text-[10px] text-muted-foreground">{t("assistant.itemSubtitle")}</div>
              </div>
            </div>
            <ul className="text-xs space-y-1.5 mt-3">
              <li className="flex justify-between"><span className="text-muted-foreground">{t("assistant.avgPrice")}</span><span>142g 80s</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">{t("assistant.risk")}</span><span className="text-success">{t("assistant.riskLow")}</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">{t("assistant.demand7d")}</span><span className="text-success">+24%</span></li>
            </ul>
          </Panel>
          <Panel title={t("assistant.status")}>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between"><span className="text-muted-foreground">{t("assistant.model")}</span><span>AMI-Core · v3</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">{t("assistant.latency")}</span><span>320 ms</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">{t("assistant.grounding")}</span><span className="text-success">{t("assistant.groundingLive")}</span></li>
            </ul>
          </Panel>
          <Panel title={t("assistant.marketContext")}>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> {t("assistant.ctx1")}</li>
              <li className="flex items-center gap-2"><Coins className="h-3.5 w-3.5 text-gold" /> {t("assistant.ctx2")}</li>
              <li className="flex items-center gap-2"><Brain className="h-3.5 w-3.5 text-accent" /> {t("assistant.ctx3")}</li>
              <li className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> {t("assistant.ctx4")}</li>
              <li className="flex items-center gap-2"><Hammer className="h-3.5 w-3.5 text-primary" /> {t("assistant.ctx5")}</li>
              <li className="flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5 text-warning" /> {t("assistant.ctx6")}</li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/**
 * Structured answer card scaffold. Codex should later replace the static
 * placeholders with real grounded outputs from AMI-Core (summary, evidence,
 * risk, confidence, suggested next step, manual verification flag).
 * For now, all values are demo placeholders driven by the URL intent.
 */
function StructuredAnswerCard({ intent, topic }: { intent: string; topic?: string }) {
  const { t } = useTranslation();
  const nextActions = [
    { icon: Radar,         labelKey: "assistant.nextActionSignal",    to: "/app/signals" as const },
    { icon: LineChart,     labelKey: "assistant.nextActionAnalytics", to: "/app/analytics" as const },
    { icon: Star,          labelKey: "assistant.nextActionWatch",     to: "/app/watchlist" as const },
    { icon: MessageSquare, labelKey: "assistant.nextActionDiscord",   to: "/app/discord" as const },
  ];
  return (
    <Panel title={t(`assistant.companion.intent.${intent}`)} action={<Badge tone="primary">demo</Badge>}>
      <ul className="text-xs space-y-2.5">
        <li>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">{t("assistant.itemContext")}</div>
          <div className="text-muted-foreground">{topic ?? t("assistant.contextValue")}</div>
        </li>
        <li>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">{t("assistant.risk")}</div>
          <div className="text-success">{t("assistant.riskLow")}</div>
        </li>
        <li>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">{t("assistant.demand7d")}</div>
          <div className="text-success">+24%</div>
        </li>
        <li className="flex items-start gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-warning mt-0.5" />
          <span className="text-muted-foreground">{t("assistant.tips.verify")}</span>
        </li>
        <li className="flex items-start gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5" />
          <span className="text-muted-foreground">{t("assistant.tips.decisionSupport")}</span>
        </li>
      </ul>
      <div className="mt-3 pt-3 border-t border-border/60">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">{t("assistant.nextActionsTitle")}</div>
        <ul className="space-y-1">
          {nextActions.map((a) => (
            <li key={a.labelKey}>
              <Link to={a.to} className="flex items-center justify-between gap-2 text-[11px] glass rounded-md px-2 py-1.5 hover:text-primary">
                <span className="inline-flex items-center gap-1.5"><a.icon className="h-3 w-3 text-primary" />{t(a.labelKey)}</span>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-[10px] text-muted-foreground">{t("assistant.demoLabel")}</div>
      </div>
    </Panel>
  );
}
