import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatusPill } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, BookOpen, Coins, Brain, Hammer, ShieldAlert } from "lucide-react";
import amiAvatar from "@/assets/ami-avatar.jpg";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/assistant")({
  head: () => ({ meta: [{ title: "AMI Assistant · AMI" }] }),
  component: AssistantPage,
});

const messages = [
  { from: "ami", text: "Hello! I'm AMI, your arcane market assistant. Ask about an item, profession or signal." },
  { from: "user", text: "Why is Arcane Crystal spiking on Spineshatter?" },
  { from: "ami", text: "Volume on Arcane Crystal is up 38% over the last 24h, driven by Enchanting demand pre-patch. Avg price moved from 122g to 142g with low seller pressure (0.23). I'd watch the 160g threshold." },
];

function AssistantPage() {
  const { t } = useTranslation();
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

      <div className="grid lg:grid-cols-[1fr_320px] gap-3">
        <Panel className="!p-0 overflow-hidden">
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
