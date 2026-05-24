import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatusPill } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hash, RefreshCcw, Radar, LineChart, Bot, Send, ShieldAlert, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AccessLock } from "@/components/ami/access";

export const Route = createFileRoute("/app/discord")({
  head: () => ({ meta: [{ title: "Discord Integration · AMI" }] }),
  component: DiscordPage,
});

function DiscordPage() {
  const { t } = useTranslation();
  const channels = [
    { key: "best-deals",     desc: t("discordPage.channels.bestDealsDesc"),  count: 1284, status: t("common.healthy"),         tone: "success" as const },
    { key: "fast-flips",     desc: t("discordPage.channels.fastFlipsDesc"),  count: 612,  status: t("common.healthy"),         tone: "success" as const },
    { key: "risky-deals",    desc: t("discordPage.channels.riskyDesc"),      count: 92,   status: t("common.rateLimitWarn"),   tone: "warning" as const },
    { key: "market-stats",   desc: t("discordPage.channels.marketStatsDesc"),count: 24,   status: t("common.healthy"),         tone: "success" as const },
    { key: "prof-herbalism", desc: t("discordPage.channels.herbalismDesc"),  count: 144,  status: t("common.healthy"),         tone: "success" as const },
    { key: "prof-tailoring", desc: t("discordPage.channels.tailoringDesc"),  count: 88,   status: t("common.paused"),          tone: "default" as const },
  ];
  const logs = [
    { at: "12:42:01", c: "#best-deals",   msg: t("discordPage.log.arc"),    ok: true },
    { at: "12:41:55", c: "#fast-flips",   msg: t("discordPage.log.leaf"),   ok: true },
    { at: "12:41:12", c: "#risky-deals",  msg: t("discordPage.log.mount"),  ok: false },
    { at: "12:40:38", c: "#market-stats", msg: t("discordPage.log.digest"), ok: true },
  ];
  return (
    <div>
      <PageHeader amiIntent="explain_discord"
        title={t("discordPage.title")}
        subtitle={t("discordPage.subtitle")}
        actions={
          <div className="flex items-center gap-2">
            <StatusPill status="beta" />
            <Button variant="outline" className="border-border"><RefreshCcw className="h-4 w-4 mr-2" /> {t("discordPage.testWebhooks")}</Button>
          </div>
        }
      />

      {/* Flow + Message preview */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-3 mb-4">
        <Panel title={t("discordPage.flowTitle")}>
          <ol className="grid sm:grid-cols-4 gap-2 text-xs">
            {[
              { icon: Radar,         title: t("discordPage.flowStep1"), hint: t("discordPage.flowStep1Hint") },
              { icon: LineChart,     title: t("discordPage.flowStep2"), hint: t("discordPage.flowStep2Hint") },
              { icon: Bot,           title: t("discordPage.flowStep3"), hint: t("discordPage.flowStep3Hint") },
              { icon: Send,          title: t("discordPage.flowStep4"), hint: t("discordPage.flowStep4Hint") },
            ].map((s, i) => (
              <li key={i} className="glass rounded-xl p-3 relative">
                <div className="flex items-center gap-2"><s.icon className="h-4 w-4 text-primary" /><span className="text-[10px] uppercase tracking-wider text-muted-foreground">{i+1}</span></div>
                <div className="text-sm font-medium mt-1">{s.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.hint}</div>
                {i < 3 && <ArrowRight className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />}
              </li>
            ))}
          </ol>
          <div className="mt-3 inline-flex items-start gap-2 text-[11px] text-warning">
            <ShieldAlert className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>{t("discordPage.manualReviewBanner")}</span>
          </div>
        </Panel>
        <Panel title={t("discordPage.messagePreviewTitle")}>
          <div className="glass rounded-lg p-3 font-mono text-[11px] leading-relaxed">
            <div className="text-primary">#best-deals</div>
            <div className="text-foreground">{t("discordPage.messageItem")}</div>
            <div className="text-success">{t("discordPage.messageBuy")}</div>
            <div className="text-muted-foreground">{t("discordPage.messageRisk")}</div>
            <div className="text-[10px] text-warning mt-1">{t("discordPage.messageFooter")}</div>
          </div>
        </Panel>
      </div>

      <Panel className="mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium">{t("discordPage.webhookTitle")}</div>
            <div className="text-xs text-muted-foreground">{t("discordPage.webhookHint")}</div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input placeholder={t("discordPage.webhookPlaceholder")} className="bg-input/40 border-border h-10 w-full md:min-w-[320px]" />
            <Button>{t("common.connect")}</Button>
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-3">
        <Panel title={t("discordPage.channelMapping")}>
          <ul className="space-y-2">
            {channels.map((c) => (
              <li key={c.key} className="glass rounded-xl p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/15 grid place-items-center"><Hash className="h-4 w-4 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">#{c.key}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.desc}</div>
                </div>
                <div className="text-right">
                  <Badge tone={c.tone}>{c.status}</Badge>
                  <div className="text-[10px] text-muted-foreground mt-1">{c.count} {t("discordPage.perDay")}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t("discordPage.deliveryLogs")}>
          <ul className="font-mono text-xs space-y-1.5">
            {logs.map((l, i) => (
              <li key={i} className="flex items-center gap-3 glass rounded-lg px-3 py-2">
                <span className="text-muted-foreground">{l.at}</span>
                <span className="text-primary">{l.c}</span>
                <span className="flex-1 truncate">{l.msg}</span>
                <Badge tone={l.ok ? "success" : "danger"}>{l.ok ? t("common.ok") : t("common.fail")}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-3">
        <AccessLock level="premium" reason={t("discordPage.premiumRoutingReason")} cta={t("access.seePlans")} to="/app/pricing">
          <Panel title={t("discordPage.premiumRoutingTitle")}>
            <ul className="text-xs space-y-2">
              <li className="glass rounded-lg px-3 py-2">EU · Spineshatter · Alchemy → #alchemy-pro</li>
              <li className="glass rounded-lg px-3 py-2">EU · Kazzak · Tailoring → #tailoring-pro</li>
              <li className="glass rounded-lg px-3 py-2">EU · * · Enchanting → #enchanting-pro</li>
            </ul>
          </Panel>
        </AccessLock>
      </div>
    </div>
  );
}
