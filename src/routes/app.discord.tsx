import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Badge, StatusPill } from "@/components/ami/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hash, RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

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
    </div>
  );
}
