import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Badge } from "@/components/ami/widgets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plug, Database, Bot, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings · AMI" }] }),
  component: SettingsPage,
});

const sel = "w-full h-10 px-3 rounded-lg bg-input/40 border border-border text-sm";

function SettingsPage() {
  const { t } = useTranslation();
  const notifs: Array<{ key: string; on: boolean }> = [
    { key: "bestDeals", on: true },
    { key: "fastFlips", on: true },
    { key: "risky", on: false },
    { key: "watchlist", on: true },
    { key: "summaries", on: false },
  ];
  const sources: Array<{ key: "auctionator" | "tsm" | "addon"; statusKey: string; tone: "success" | "warning"; Icon: typeof Database }> = [
    { key: "auctionator", statusKey: "auctionatorStatus", tone: "success", Icon: Database },
    { key: "tsm",         statusKey: "tsmStatus",         tone: "success", Icon: Database },
    { key: "addon",       statusKey: "addonStatus",       tone: "warning", Icon: Bot },
  ];
  return (
    <div>
      <PageHeader
        title={t("settings.title")}
        subtitle={t("settings.subtitle")}
      />

      <div className="grid lg:grid-cols-2 gap-3">
        <Panel title={t("settings.profile")}>
          <div className="grid gap-3">
            <Field label={t("settings.displayName")}><Input defaultValue="Alex Morgan" className="bg-input/40 border-border h-10" /></Field>
            <Field label={t("settings.email")}><Input defaultValue="alex@ami.gg" className="bg-input/40 border-border h-10" /></Field>
            <Field label={t("settings.language")}>
              <select className={sel} defaultValue="en">
                <option value="en">{t("common.english")}</option>
                <option value="ru">{t("common.russian")}</option>
              </select>
            </Field>
          </div>
        </Panel>

        <Panel title={t("settings.realmFaction")}>
          <div className="grid gap-3">
            <Field label={t("settings.region")}>
              <select className={sel} defaultValue="EU"><option>EU</option><option>NA</option><option>KR</option><option>TW</option></select>
            </Field>
            <Field label={t("settings.realm")}>
              <select className={sel} defaultValue="Spineshatter"><option>Spineshatter</option><option>Kazzak</option><option>Ravencrest</option><option>Sylvanas</option></select>
            </Field>
            <Field label={t("settings.faction")}>
              <select className={sel} defaultValue="Horde">
                <option>{t("common.auto")}</option>
                <option>{t("realmFaction.horde", { defaultValue: "Horde" })}</option>
                <option>{t("realmFaction.alliance", { defaultValue: "Alliance" })}</option>
              </select>
            </Field>
          </div>
        </Panel>

        <Panel title={t("settings.notifications")}>
          <ul className="space-y-3 text-sm">
            {notifs.map((n) => (
              <li key={n.key} className="flex items-center justify-between glass rounded-lg px-3 py-2.5">
                <span>{t(`settings.notif.${n.key}`)}</span>
                <Toggle on={n.on} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t("settings.discordConnection")}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg grid place-items-center glass glow-border"><Plug className="h-4 w-4 text-primary" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{t("settings.botName")}</div>
              <div className="text-xs text-muted-foreground">{t("settings.botStatus")}</div>
            </div>
            <Badge tone="success">{t("status.live")}</Badge>
          </div>
          <div className="rune-divider my-4" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="border-border">{t("common.reconnect")}</Button>
            <Button variant="outline" size="sm" className="border-border">{t("common.disconnect")}</Button>
            <Link to="/app/discord" className="ml-auto"><Button variant="ghost" size="sm" className="text-primary">{t("common.manageChannels")} <ExternalLink className="ml-1.5 h-3 w-3" /></Button></Link>
          </div>
        </Panel>

        <Panel title={t("settings.dataSources")}>
          <ul className="space-y-2 text-sm">
            {sources.map((s) => (
              <li key={s.key} className="flex items-center gap-3 glass rounded-lg px-3 py-2.5">
                <s.Icon className="h-4 w-4 text-primary" />
                <div className="min-w-0">
                  <div className="font-medium truncate">{t(`settings.src.${s.key}`)}</div>
                  <div className="text-xs text-muted-foreground truncate">{t(`settings.src.${s.statusKey}`)}</div>
                </div>
                <span className="ml-auto"><Badge tone={s.tone}>{s.tone === "warning" ? t("status.beta") : t("common.ok")}</Badge></span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span className={`relative inline-flex h-5 w-9 rounded-full ${on ? "bg-primary/70" : "bg-muted"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground ${on ? "left-4" : "left-0.5"}`} />
    </span>
  );
}
